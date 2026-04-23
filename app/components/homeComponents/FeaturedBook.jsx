"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FiBook, 
  FiStar, 
  FiEye, 
  FiHeart, 
  FiShoppingCart,
  FiTrendingUp,
  FiChevronRight
} from "react-icons/fi";
import { FaRegHeart, FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";

const FeaturedBook = () => {
  const [likedBooks, setLikedBooks] = useState({});

  const handleLike = (bookId) => {
    setLikedBooks((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const books = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 14.99,
      originalPrice: 24.99,
      rating: 4.8,
      reviewCount: 1243,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop",
      category: "Fiction",
      badge: "Bestseller",
      badgeColor: "from-amber-500 to-orange-500",
      description: "Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right.",
      pages: 288,
      language: "English",
      year: 2020
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 16.99,
      originalPrice: 29.99,
      rating: 4.9,
      reviewCount: 2856,
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
      category: "Self-Help",
      badge: "Trending",
      badgeColor: "from-emerald-500 to-teal-500",
      description: "No matter your goals, Atomic Habits offers a proven framework for improving - every day. James Clear, one of the world's leading experts on habit formation.",
      pages: 320,
      language: "English",
      year: 2018
    },
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      price: 18.99,
      originalPrice: 34.99,
      rating: 4.7,
      reviewCount: 1892,
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop",
      category: "Sci-Fi",
      badge: "Award Winner",
      badgeColor: "from-purple-500 to-pink-500",
      description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who would become the mysterious man known as Maud'dib.",
      pages: 896,
      language: "English",
      year: 1965
    },
    {
      id: 4,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: 12.99,
      originalPrice: 27.99,
      rating: 4.6,
      reviewCount: 2154,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      category: "Thriller",
      badge: "New Release",
      badgeColor: "from-red-500 to-rose-500",
      description: "The Silent Patient is a shocking psychological thriller of a woman who shoots her husband and then refuses to speak another word.",
      pages: 336,
      language: "English",
      year: 2019
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />);
    }
    return stars;
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-linear-to-b from-[#0F0D0A] to-[#1C1712]">

      <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center sm:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
              <FiTrendingUp className="w-4 h-4 text-amber-400" />
              <span className="text-xs sm:text-sm text-amber-400 font-medium">Featured Books</span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-white">Editor&apos;s </span>
              <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Picks
              </span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-md">
              Discover our hand-picked selection of must-read books
            </p>
          </div>
          
          {/* View All Button */}
          <Link
            href="/browse"
            className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-gray-300 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 hover:scale-105"
          >
            <span className="font-medium">View All Books</span>
            <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {books.map((book, index) => (
            <div
              key={book.id}
              className="group relative bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Badge */}
              <div className={`absolute top-3 left-3 z-10 bg-linear-to-r ${book.badgeColor} text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full shadow-lg`}>
                {book.badge}
              </div>
              
              {/* Like Button */}
              <button
                onClick={() => handleLike(book.id)}
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-500 transition-all duration-300 group/like"
              >
                {likedBooks[book.id] ? (
                  <FaHeart className="w-4 h-4 text-red-500" />
                ) : (
                  <FaRegHeart className="w-4 h-4 text-white group-hover/like:text-red-500 transition-colors" />
                )}
              </button>

              {/* Book Image */}
              <div className="relative overflow-hidden h-64 sm:h-72 lg:h-80">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Quick View Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="px-4 py-2 bg-amber-500 text-white rounded-xl font-medium text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <FiEye className="w-4 h-4" />
                    Quick View
                  </button>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-4 sm:p-5">
                {/* Category */}
                <p className="text-amber-400 text-xs sm:text-sm font-medium mb-1">
                  {book.category}
                </p>
                
                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-amber-400 transition-colors">
                  {book.title}
                </h3>
                
                {/* Author */}
                <p className="text-gray-400 text-xs sm:text-sm mb-2">
                  by {book.author}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {renderStars(book.rating)}
                  </div>
                  <span className="text-gray-400 text-xs">({book.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl sm:text-2xl font-bold text-white">${book.price}</span>
                  <span className="text-gray-500 text-sm line-through">${book.originalPrice}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-linear-to-r from-amber-500 to-orange-600 text-white text-sm font-medium rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                    <FiShoppingCart className="w-4 h-4" />
                    Buy Now
                  </button>
                  <button className="px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-gray-300 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300">
                    <FiBook className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for Mobile */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-amber-500 to-orange-600 text-white font-medium rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
          >
            <span>View All Books</span>
            <FiChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
            {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
        <svg
          className="relative block w-full h-8 sm:h-12"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="#1C1712"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default FeaturedBook;