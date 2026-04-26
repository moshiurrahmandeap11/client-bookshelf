"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMessageCircle,
  FiBookOpen,
  FiHeart,
} from "react-icons/fi";
import {
  FaQuoteLeft,
  FaQuoteRight,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Avid Reader",
      location: "New York, USA",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      date: "March 15, 2024",
      review:
        "BookShelf has completely transformed my reading experience! The interface is beautiful and intuitive. I love how I can organize my personal library and discover new books based on my taste. The recommendations are always spot-on!",
      readCount: 127,
      likes: 89,
      bookTitle: "The Midnight Library",
      bookAuthor: "Matt Haig",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Book Reviewer",
      location: "Toronto, Canada",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      date: "March 10, 2024",
      review:
        "As someone who reads over 50 books a year, I need a reliable platform to track my reading. BookShelf exceeds all expectations! The community features are amazing, and the rating system helps me find quality books. Highly recommended!",
      readCount: 234,
      likes: 156,
      bookTitle: "Atomic Habits",
      bookAuthor: "James Clear",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Librarian",
      location: "London, UK",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 4.8,
      date: "March 5, 2024",
      review:
        "I've recommended BookShelf to all my library members. The search filters are powerful, and the curated collections are excellent. It's become an essential tool for book lovers everywhere. The team keeps adding valuable features!",
      readCount: 189,
      likes: 112,
      bookTitle: "Dune",
      bookAuthor: "Frank Herbert",
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`star-${i}`}
          className="w-4 h-4 fill-amber-400 text-amber-400"
        />,
      );
    }
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key="half-star"
          className="w-4 h-4 fill-amber-400 text-amber-400"
        />,
      );
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar key={`empty-${i}`} className="w-4 h-4 text-gray-600" />,
      );
    }
    return stars;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, currentIndex]);

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-linear-to-b from-[#0F0D0A] to-[#1C1712]">
      <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-1.5 mb-4 sm:mb-6">
            <FiMessageCircle className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm text-amber-400 font-medium">
              Reader Stories
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-white">What Our </span>
            <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Readers Say
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Thousands of book lovers trust BookShelf every day. Here&apos;s what
            they have to say about their experience.
          </p>
        </div>

        {/* Main Testimonial Slider */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-500 transition-all duration-300 group"
          >
            <FiChevronLeft className="w-5 h-5 text-white group-hover:text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-500 transition-all duration-300 group"
          >
            <FiChevronRight className="w-5 h-5 text-white group-hover:text-white" />
          </button>

          {/* Testimonial Card */}
          <div className="relative overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-500 ease-in-out ${
                  index === currentIndex ? "block" : "hidden"
                }`}
              >
                <div className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-10">
                  {/* Quote Icons */}
                  <FaQuoteLeft className="text-amber-500/20 w-8 h-8 sm:w-12 sm:h-12 mb-4 sm:mb-6" />

                  {/* Review Content */}
                  <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-6 sm:mb-8 italic">
                    &quot;{testimonial.review}&quot;
                  </p>

                  <FaQuoteRight className="text-amber-500/20 w-8 h-8 sm:w-12 sm:h-12 ml-auto mb-6 sm:mb-8" />

                  {/* User Info */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-500">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-400 text-xs sm:text-sm">
                          {testimonial.role} • {testimonial.location}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {renderStars(testimonial.rating)}
                          <span className="text-gray-500 text-xs ml-2">
                            ({testimonial.rating})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-amber-400 text-xs sm:text-sm font-medium">
                        {testimonial.bookTitle}
                      </p>
                      <p className="text-gray-500 text-xs">
                        by {testimonial.bookAuthor}
                      </p>
                    </div>
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                      <FiBookOpen className="w-4 h-4" />
                      <span>{testimonial.readCount} read</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                      <FiHeart className="w-4 h-4" />
                      <span>{testimonial.likes} likes</span>
                    </div>
                    <div className="text-gray-500 text-xs sm:text-sm">
                      {testimonial.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setAutoplay(false);
                }}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 h-2 bg-amber-500 rounded-full"
                    : "w-2 h-2 bg-gray-600 rounded-full hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
