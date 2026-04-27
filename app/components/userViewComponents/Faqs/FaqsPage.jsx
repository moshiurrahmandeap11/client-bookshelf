"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiMail
} from "react-icons/fi";

const FaqsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaqs, setOpenFaqs] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleFaq = (id) => {
    setOpenFaqs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: "all", name: "All FAQs" },
    { id: "account", name: "Account" },
    { id: "books", name: "Books" },
    { id: "orders", name: "Orders & Payments" },
    { id: "reviews", name: "Reviews" }
  ];

  const faqs = [
    // Account FAQs
    { id: 1, category: "account", question: "How do I create an account?", answer: "Click the 'Get Started' or 'Register' button in the top right corner. Fill in your name, email, and password. Verify your email address to activate your account." },
    { id: 2, category: "account", question: "How do I reset my password?", answer: "On the login page, click 'Forgot Password'. Enter your registered email. Follow the link sent to your email to create a new password." },
    { id: 3, category: "account", question: "How do I delete my account?", answer: "Go to Profile → Settings. Scroll to bottom and click 'Delete Account'. Confirm your decision. This action is permanent and cannot be undone." },
    { id: 4, category: "account", question: "Can I change my email address?", answer: "Email addresses cannot be changed directly. Please contact support for assistance with email changes." },
    // Books FAQs
    { id: 5, category: "books", question: "How do I search for books?", answer: "Use the search bar at the top or go to 'Browse' page. Filter by category, price, author, or use keywords." },
    { id: 6, category: "books", question: "How do I add books to my wishlist?", answer: "Click the heart icon on any book card while browsing. Access your wishlist from your profile dropdown." },
    { id: 7, category: "books", question: "How do I upload my own books?", answer: "Go to 'Add Book' from the menu. Fill in title, author, category, price, description, and upload thumbnail. Submit for review." },
    { id: 8, category: "books", question: "Can I edit or delete my uploaded books?", answer: "Yes. Go to 'Manage Books' from your profile. Click edit or delete on any book you've uploaded." },
    // Orders & Payments FAQs
    { id: 9, category: "orders", question: "What payment methods do you accept?", answer: "We accept credit/debit cards (Visa, MasterCard, American Express), PayPal, and various digital wallets." },
    { id: 10, category: "orders", question: "How do I get a refund?", answer: "Request a refund within 7 days of purchase from 'My Orders' in your profile. Refunds are issued to original payment method." },
    { id: 11, category: "orders", question: "How do I track my order?", answer: "Go to 'My Orders' in your profile. View order status and download links for purchased books." },
    { id: 12, category: "orders", question: "Is my payment information secure?", answer: "Yes. All payments are processed through encrypted SSL/TLS connections. We never store your full payment details." },
    // Reviews FAQs
    { id: 13, category: "reviews", question: "How do I leave a review?", answer: "Go to any book detail page. Scroll to reviews section. Click 'Write a Review', rate 1-5 stars, and submit your comments." },
    { id: 14, category: "reviews", question: "Can I edit or delete my review?", answer: "Yes. Go to 'My Reviews' from your profile. Click edit or delete on any review you've written." },
    { id: 15, category: "reviews", question: "Do reviews affect book rankings?", answer: "Yes. Books with higher ratings and more reviews appear higher in search results." }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-8 sm:py-12">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
            <FiHelpCircle className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-400 font-medium">FAQ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-white">Frequently Asked </span>
            <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-gray-400">Find quick answers to common questions</p>
          
          {/* Search */}
          <div className="relative max-w-xl mt-6">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="Search FAQs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-start gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-1.5 rounded-full text-sm transition-all ${activeCategory === cat.id ? "bg-amber-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}>{cat.name}</button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12"><FiHelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" /><h3 className="text-xl text-white mb-2">No results found</h3><p className="text-gray-400">Try different keywords</p></div>
          ) : (
            filteredFaqs.map(faq => (
              <div key={faq.id} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-amber-500/30 transition">
                <button onClick={() => toggleFaq(faq.id)} className="w-full flex justify-between items-center p-5 text-left">
                  <span className="text-white font-medium">{faq.question}</span>
                  {openFaqs[faq.id] ? <FiChevronUp className="text-amber-400" /> : <FiChevronDown className="text-amber-400" />}
                </button>
                {openFaqs[faq.id] && <div className="p-5 pt-0 border-t border-white/10"><p className="text-gray-400">{faq.answer}</p></div>}
              </div>
            ))
          )}
        </div>

        {/* Still Need Help */}
        <div className="mt-10 p-6 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-gray-400 mb-4">Contact our support team for personalized assistance</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition">Contact Support <FiMail className="w-4 h-4" /></Link>
        </div>
      </div>
    </div>
  );
};

export default FaqsPage;