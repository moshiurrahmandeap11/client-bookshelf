"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiBookOpen,
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiMail,
  FiMessageCircle,
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiShield,
  FiCreditCard,
  FiDownload,
  FiUpload,
  FiTrash2,
  FiEdit2,
  FiEye
} from "react-icons/fi";
import { FaQuestionCircle, FaRegQuestionCircle } from "react-icons/fa";

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaqs, setOpenFaqs] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleFaq = (id) => {
    setOpenFaqs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: "all", name: "All Topics", icon: <FiHelpCircle className="w-4 h-4" /> },
    { id: "account", name: "Account", icon: <FiUser className="w-4 h-4" /> },
    { id: "books", name: "Books", icon: <FiBookOpen className="w-4 h-4" /> },
    { id: "orders", name: "Orders & Payments", icon: <FiShoppingCart className="w-4 h-4" /> },
    { id: "reviews", name: "Reviews & Ratings", icon: <FiStar className="w-4 h-4" /> },
  ];

  const faqs = [
    {
      id: 1,
      category: "account",
      question: "How do I create an account?",
      answer: "Click on the 'Get Started' or 'Register' button on the top right corner. Fill in your full name, email address, and create a password. Confirm your password and click 'Create Account'. You'll receive a confirmation email to verify your account."
    },
    {
      id: 2,
      category: "account",
      question: "How do I reset my password?",
      answer: "Go to the login page and click on 'Forgot Password?'. Enter your registered email address and we'll send you a password reset link. Follow the instructions in the email to create a new password."
    },
    {
      id: 3,
      category: "account",
      question: "How do I update my profile information?",
      answer: "Log in to your account, go to 'Profile' from the dropdown menu. Click on 'Edit Profile' where you can update your name, profile picture, and other personal information. Don't forget to save your changes."
    },
    {
      id: 4,
      category: "books",
      question: "How do I search for books?",
      answer: "Use the search bar at the top of the page or go to the 'Browse' page. You can filter by category, price range, author name, or use keywords to find specific books. You can also sort results by newest, price, or rating."
    },
    {
      id: 5,
      category: "books",
      question: "How do I add books to my wishlist?",
      answer: "While browsing books, click on the heart icon on any book card. The book will be added to your wishlist. You can access your wishlist from your profile dropdown or directly from the 'Wishlist' link in the menu."
    },
    {
      id: 6,
      category: "books",
      question: "How do I upload my own books?",
      answer: "Log in to your account and click on 'Add Book' from the navigation menu. Fill in all the required details including title, author, category, price, description, and upload the book thumbnail and images. Submit the form and your book will be available for others to discover."
    },
    {
      id: 7,
      category: "orders",
      question: "How do I purchase a book?",
      answer: "Find the book you want, click on 'Buy Now' or add it to your cart. Review your cart, proceed to checkout, and complete the payment process. You'll receive an order confirmation email with download instructions."
    },
    {
      id: 8,
      category: "orders",
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards (Visa, MasterCard, American Express), PayPal, and various digital wallets. All payments are processed securely through our encrypted payment gateway."
    },
    {
      id: 9,
      category: "orders",
      question: "How do I track my order?",
      answer: "After placing an order, you'll receive a confirmation email. You can also track your orders from your 'Dashboard' under 'My Orders' section. You'll see real-time updates on your order status."
    },
    {
      id: 10,
      category: "reviews",
      question: "How do I leave a review for a book?",
      answer: "Go to the book's detail page, scroll down to the reviews section. Click on 'Write a Review', select your rating (1-5 stars), write your review, and submit. Your review will help other readers make informed decisions."
    },
    {
      id: 11,
      category: "reviews",
      question: "Can I edit or delete my review?",
      answer: "Yes, you can edit or delete your reviews. Go to 'My Reviews' from your profile dropdown. Find the review you want to modify, click on 'Edit' or 'Delete' button. Changes will be reflected immediately."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const quickGuides = [
    { title: "Getting Started", icon: <FiUser className="w-5 h-5" />, link: "login", description: "Learn how to create an account and set up your profile" },
    { title: "Finding Books", icon: <FiSearch className="w-5 h-5" />, link: "/browse", description: "Discover how to search and filter books effectively" },
    { title: "Managing Library", icon: <FiBookOpen className="w-5 h-5" />, link: "/manage-books", description: "How to organize and manage your book collection" }
  ];

  const contactMethods = [
    { icon: <FiMail className="w-5 h-5" />, title: "Email Support", description: "Get response within 24 hours", action: "Send Email", link: "/contact" },
    // { icon: <FiMessageCircle className="w-5 h-5" />, title: "Live Chat", description: "Chat with our support team", action: "Start Chat", link: "#" },
    { icon: <FiHelpCircle className="w-5 h-5" />, title: "Help Center", description: "Browse documentation", action: "Visit Help Center", link: "#" }
  ];

  return (
    <div className="min-h-screen mt-4 bg-linear-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-8 sm:py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-12">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto mt-8">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </section>

      {/* Quick Guides Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">Quick Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickGuides.map((guide, index) => (
              <Link
                key={index}
                href={guide.link}
                className="group bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:transform hover:-translate-y-2 text-center"
              >
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-amber-400">{guide.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{guide.title}</h3>
                <p className="text-gray-400 text-sm">{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-amber-500 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <FaRegQuestionCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">No results found</h3>
                <p className="text-gray-400">Try searching with different keywords</p>
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-amber-500/30 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-white font-medium pr-4">{faq.question}</span>
                    {openFaqs[faq.id] ? (
                      <FiChevronUp className="w-5 h-5 text-amber-400 shrink-0" />
                    ) : (
                      <FiChevronDown className="w-5 h-5 text-amber-400 shrink-0" />
                    )}
                  </button>
                  {openFaqs[faq.id] && (
                    <div className="p-5 pt-0 border-t border-white/10">
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 sm:p-12 text-center border border-white/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Still Need Help?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Our support team is ready to assist you with any questions or concerns
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {contactMethods.map((method, index) => (
                <Link
                  key={index}
                  href={method.link}
                  className="group text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-amber-400 group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-1">{method.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                  <span className="text-amber-400 text-sm font-medium inline-flex items-center gap-1">
                    {method.action} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <FiShield className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Security & Privacy</h3>
              <p className="text-gray-400 text-sm">Learn how we protect your data</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <FiCreditCard className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Payment & Billing</h3>
              <p className="text-gray-400 text-sm">Understanding our payment system</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <FiDownload className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Download & Access</h3>
              <p className="text-gray-400 text-sm">How to access your purchased books</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <FiUpload className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Publishing Books</h3>
              <p className="text-gray-400 text-sm">Guide for authors and publishers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;