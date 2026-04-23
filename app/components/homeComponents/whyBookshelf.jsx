"use client";

import React from "react";
import { 
  FiSearch, 
  FiBook, 
  FiStar, 
  FiLock, 
  FiPhone, 
  FiEdit,
  FiTrendingUp,
  FiHeart
} from "react-icons/fi";
import { FaSearch, FaBook, FaStar, FaLock, FaMobileAlt, FaPen, FaRocket, FaUsers } from "react-icons/fa";
import {  MdOutlineLibraryBooks, MdOutlineRateReview, MdOutlineSecurity, MdOutlineDevices, MdOutlineEdit } from "react-icons/md";
import { Search } from "lucide-react";
import Link from "next/link";

const WhyBookshelf = () => {
  const features = [
    {
      id: 1,
      icon: <Search className="w-8 h-8 sm:w-10 sm:h-10" />,
      iconBg: "from-blue-500 to-cyan-500",
      title: "Smart Discovery",
      description: "Filter by genre, price, rating, and more. Find exactly the book you're in the mood for in seconds.",
      delay: "delay-0"
    },
    {
      id: 2,
      icon: <MdOutlineLibraryBooks className="w-8 h-8 sm:w-10 sm:h-10" />,
      iconBg: "from-emerald-500 to-teal-500",
      title: "Personal Library",
      description: "Add your own books, manage your collection, and keep everything organized in one beautiful place.",
      delay: "delay-100"
    },
    {
      id: 3,
      icon: <MdOutlineRateReview className="w-8 h-8 sm:w-10 sm:h-10" />,
      iconBg: "from-amber-500 to-orange-500",
      title: "Curated Reviews",
      description: "Real ratings from real readers. Make informed decisions with community-driven insights.",
      delay: "delay-200"
    },
    {
      id: 4,
      icon: <MdOutlineSecurity className="w-8 h-8 sm:w-10 sm:h-10" />,
      iconBg: "from-purple-500 to-pink-500",
      title: "Secure & Private",
      description: "Your reading habits are yours alone. Login with email or Google with industry-grade security.",
      delay: "delay-0"
    },
    {
      id: 5,
      icon: <MdOutlineDevices className="w-8 h-8 sm:w-10 sm:h-10" />,
      iconBg: "from-red-500 to-rose-500",
      title: "Works Everywhere",
      description: "Fully responsive on desktop, tablet, and phone. Your library goes wherever you go.",
      delay: "delay-100"
    },
    {
      id: 6,
      icon: <MdOutlineEdit className="w-8 h-8 sm:w-10 sm:h-10" />,
      iconBg: "from-indigo-500 to-violet-500",
      title: "Easy Management",
      description: "Add, edit, and remove books from your collection with a clean and intuitive management panel.",
      delay: "delay-200"
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-linear-to-b from-[#1C1712] to-[#0F0D0A]">


      <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Why </span>
            <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              BookShelf
            </span>
            <span className="text-white">?</span>
          </h2>
          
          {/* Description */}
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Discover why thousands of readers trust BookShelf for their daily reading journey
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`group relative bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:transform hover:-translate-y-2 ${feature.delay} animate-fade-in-up`}
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-linear-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 rounded-2xl transition-all duration-500 group-hover:from-amber-500/5 group-hover:via-amber-500/5 group-hover:to-amber-500/5"></div>
              
              {/* Icon Container */}
              <div className={`relative mb-5 sm:mb-6 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-linear-to-br ${feature.iconBg} rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                <div className="text-white">
                  {feature.icon}
                </div>
                {/* Decorative Ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-amber-400 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Learn More Link */}
              <div className="mt-4 sm:mt-6 flex items-center gap-2 text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2.5 group-hover:translate-x-0">
                <span className="text-sm font-medium">Learn More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-linear-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <FiHeart className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Join 10,000+ Readers</p>
                <p className="text-gray-400 text-sm">Start your journey today</p>
              </div>
            </div>
            <Link href={"/register"}>
            
            <button className="px-6 cursor-pointer py-2.5 bg-linear-to-r from-amber-500 to-orange-600 text-white font-medium rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/25">
              Get Started Free
            </button>
            </Link>
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
        
        .delay-0 { animation-delay: 0s; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </section>
  );
};

export default WhyBookshelf;