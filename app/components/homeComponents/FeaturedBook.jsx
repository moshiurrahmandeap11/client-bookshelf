"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FiBook, 
  FiEye, 
  FiShoppingCart,
  FiTrendingUp,
  FiChevronRight,
  FiLoader
} from "react-icons/fi";
import { FaRegHeart, FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import axiosInstance from "../sharedComponents/axiosInstance/axiosInstance";


const FeaturedBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedBooks, setLikedBooks] = useState({});

  const handleLike = (bookId) => {
    setLikedBooks((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };


  const fetchFeaturedBooks = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/books?page=1&limit=4&sort=rating");
      
      if (response.data.success) {
        setBooks(response.data.data);
      }
    } catch (error) {
      console.error("Fetch featured books error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;
    
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


  const getBadgeColor = (rating) => {
    if (rating >= 4.8) return "from-amber-500 to-orange-500";
    if (rating >= 4.5) return "from-emerald-500 to-teal-500";
    if (rating >= 4.0) return "from-blue-500 to-cyan-500";
    return "from-purple-500 to-pink-500";
  };


  const getBadgeText = (rating, stock) => {
    if (rating >= 4.8) return "Bestseller";
    if (rating >= 4.5) return "Trending";
    if (stock && stock < 10) return "Limited Stock";
    return "Featured";
  };

  if (loading) {
    return (
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#0F0D0A] to-[#1C1712]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <FiLoader className="w-8 h-8 text-amber-400 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (books.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#0F0D0A] to-[#1C1712]">
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
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
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
          {books.map((book, index) => {
            const badgeColor = getBadgeColor(book.rating?.average || 0);
            const badgeText = getBadgeText(book.rating?.average || 0, book.stock);
            
            return (
              <div
                key={book._id}
                className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Badge */}
                <div className={`absolute top-3 left-3 z-10 bg-gradient-to-r ${badgeColor} text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full shadow-lg`}>
                  {badgeText}
                </div>
                
                {/* Like Button */}
                <button
                  onClick={() => handleLike(book._id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-500 transition-all duration-300 group/like"
                >
                  {likedBooks[book._id] ? (
                    <FaHeart className="w-4 h-4 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-4 h-4 text-white group-hover/like:text-red-500 transition-colors" />
                  )}
                </button>

                {/* Book Image */}
                <div className="relative overflow-hidden h-64 sm:h-72 lg:h-80">
                  {book.thumbnail ? (
                    <Image
                      src={book.thumbnail}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center">
                      <FiBook className="w-12 h-12 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Link
                      href={`/books/${book._id}`}
                      className="px-4 py-2 bg-amber-500 text-white rounded-xl font-medium text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                    >
                      <FiEye className="w-4 h-4" />
                      Quick View
                    </Link>
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-4 sm:p-5">
                  {/* Category */}
                  <p className="text-amber-400 text-xs sm:text-sm font-medium mb-1">
                    {book.category?.name || "General"}
                  </p>
                  
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-amber-400 transition-colors">
                    {book.title}
                  </h3>
                  
                  {/* Author */}
                  <p className="text-gray-400 text-xs sm:text-sm mb-2">
                    by {book.authorName}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {renderStars(book.rating?.average)}
                    </div>
                    <span className="text-gray-400 text-xs">({book.rating?.count || 0})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-white">${book.discountPrice}</span>
                    {book.price > book.discountPrice && (
                      <span className="text-gray-500 text-sm line-through">${book.price}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-medium rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                      <FiShoppingCart className="w-4 h-4" />
                      Buy Now
                    </button>
                    <Link
                      href={`/books/${book._id}`}
                      className="px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-gray-300 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300"
                    >
                      <FiBook className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA for Mobile */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
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