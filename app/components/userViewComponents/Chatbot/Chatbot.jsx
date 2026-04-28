'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../../sharedComponents/axiosInstance/axiosInstance';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Chatbot = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [isInitialScrollDone, setIsInitialScrollDone] = useState(false);

  // Parse user ID from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.id || payload.userId);
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }, []);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = sessionStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          id: 1,
          role: 'assistant',
          content: '👋 Hello! I am your BookShelf AI Assistant. I can help you find books, recommend great reads, answer questions about our collection, and provide reading insights. How can I help you today?',
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  // Save messages to session storage
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom function - multiple triggers for reliability
  const scrollToBottom = () => {
    // Use multiple methods to ensure scrolling works
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    
    // Also try scrolling the container directly
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Scroll when messages change (new message added)
  useEffect(() => {
    if (messages.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages]);

  // Scroll when chat window opens
  useEffect(() => {
    if (isOpen) {
      // Multiple delays to ensure scroll works after animation
      setTimeout(() => {
        scrollToBottom();
      }, 200);
      
      setTimeout(() => {
        scrollToBottom();
      }, 500);
      
      // Focus input after opening
      if (inputRef.current) {
        setTimeout(() => inputRef.current.focus(), 300);
      }
    }
  }, [isOpen]);

  // Handle book click navigation
  const handleBookClick = (bookId) => {
    console.log('Book ID clicked:', bookId);
    if (bookId && bookId !== 'undefined' && bookId !== 'null' && bookId.length > 5) {
      router.push(`/books/${bookId}`);
      setIsOpen(false);
    } else {
      console.error('Invalid book ID:', bookId);
    }
  };

  // Render message content with markdown links and book suggestions
  const renderMessageContent = (content, suggestions = []) => {
    if (!content) return null;
    
    // First, render markdown links in the text content
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    let processedContent = content;
    
    // Process markdown links
    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(processedContent.substring(lastIndex, match.index));
      }
      parts.push(
        <Link
          key={match.index}
          href={match[2]}
          className="text-amber-400 hover:text-amber-300 underline font-medium"
        >
          {match[1]}
        </Link>
      );
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < processedContent.length) {
      parts.push(processedContent.substring(lastIndex));
    }

    // If there are book suggestions, render them as buttons
    if (suggestions && suggestions.length > 0) {
      return (
        <div>
          <div className="whitespace-pre-wrap">{parts.length > 0 ? parts : processedContent}</div>
          <div className="mt-3 pt-2 border-t border-amber-500/20">
            <p className="text-xs text-amber-400 mb-2">📚 Suggested Books:</p>
            <div className="space-y-2">
              {suggestions.map((book, idx) => {
                const bookId = book.id || book._id || book.bookId;
                return (
                  <button
                    key={idx}
                    onClick={() => handleBookClick(bookId)}
                    className="w-full text-left p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                  >
                    <p className="text-sm text-white font-medium group-hover:text-amber-400 transition-colors">
                      {book.title}
                    </p>
                    <p className="text-xs text-gray-400">by {book.author || book.authorName}</p>
                    {book.price && (
                      <p className="text-xs text-amber-400 mt-1">${book.price}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return <div className="whitespace-pre-wrap">{parts.length > 0 ? parts : processedContent}</div>;
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || !userId) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/ai/chat', {
        message: inputMessage.trim(),
        userId: userId,
      });

      const suggestions = (response.data.suggestions || []).map(book => ({
        id: book.id || book._id,
        _id: book._id || book.id,
        title: book.title,
        author: book.author || book.authorName,
        price: book.price || book.discountPrice,
        category: book.category?.name
      })).filter(book => {
        const isValid = book.id && book.id !== 'undefined' && book.id !== 'null' && book.id.length > 5;
        return isValid;
      });

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.response || 'Sorry, I could not generate a response. Please try again.',
        suggestions: suggestions,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '🔌 Connection error. Please check your internet connection and try again. If the problem persists, please contact support.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: '👋 Hello! I am your BookShelf AI Assistant. I can help you find books, recommend great reads, answer questions about our collection, and provide reading insights. How can I help you today?',
        timestamp: new Date().toISOString(),
      },
    ]);
    sessionStorage.removeItem('chatMessages');
    
    // Scroll to bottom after clearing
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isOpen 
            ? '0 0 0 0 rgba(245, 158, 11, 0)' 
            : '0 0 0 0 rgba(245, 158, 11, 0.7)',
        }}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        <span className="absolute -top-1 -right-1 bg-linear-to-r from-amber-500 to-orange-600 text-white text-xs rounded-full px-1.5 py-0.5 animate-pulse">
          AI
        </span>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-96 h-125 sm:h-137.5 bg-linear-to-br from-[#2A2219] to-[#1C1712] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-amber-500/20"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-amber-500 to-orange-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">BookShelf AI</h3>
                  <p className="text-xs text-amber-100">Online • 24/7</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearChat}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Area with ref for manual scrolling */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-linear-to-b from-[#1C1712] to-[#2A2219]"
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-br-none'
                        : 'bg-white/10 text-gray-200 rounded-bl-none border border-amber-500/20'
                    }`}
                  >
                    <div className="text-sm">
                      {renderMessageContent(msg.content, msg.suggestions)}
                    </div>
                    <span className="text-xs opacity-60 mt-1 block">
                      {new Date(msg.timestamp).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 rounded-2xl rounded-bl-none px-4 py-2 border border-amber-500/20">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Invisible element for scrolling reference */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} className="p-4 border-t border-amber-500/20 bg-[#1C1712]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about books, get recommendations, or search for something..."
                  className="flex-1 px-4 py-2 bg-white/10 border border-amber-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400 text-sm"
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim() || !userId}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-full p-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                💡 Try: &quot;Find me fiction books&quot; or &quot;Recommend books like Atomic Habits&quot;
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;