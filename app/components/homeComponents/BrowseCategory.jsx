"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FiBook, 
  FiTrendingUp, 
  FiChevronRight, 
  FiGrid,
  FiCompass,
  FiHeart
} from "react-icons/fi";
import { 
  FaMicrophone, 
  FaRocket, 
  FaBrain, 
  FaHeartbeat,
  FaMagic,
  FaRobot,
  FaDragon,
  FaLeaf
} from "react-icons/fa";

const BrowseCategory = () => {
  const categories = [
    {
      id: 1,
      name: "Fiction",
      icon: <FaMagic className="w-6 h-6 sm:w-7 sm:h-7" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      hoverColor: "hover:border-purple-500/60",
      bookCount: 2843,
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
      description: "Immerse yourself in captivating stories and imaginative worlds"
    },
    {
      id: 2,
      name: "Self-Help",
      icon: <FaBrain className="w-6 h-6 sm:w-7 sm:h-7" />,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      hoverColor: "hover:border-emerald-500/60",
      bookCount: 1856,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
      description: "Transform your life with practical wisdom and guidance"
    },
    {
      id: 3,
      name: "Science Fiction",
      icon: <FaRocket className="w-6 h-6 sm:w-7 sm:h-7" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      hoverColor: "hover:border-blue-500/60",
      bookCount: 1247,
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=300&fit=crop",
      description: "Explore futuristic concepts and mind-bending adventures"
    },
    {
      id: 4,
      name: "Health & Wellness",
      icon: <FaHeartbeat className="w-6 h-6 sm:w-7 sm:h-7" />,
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      hoverColor: "hover:border-red-500/60",
      bookCount: 968,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
      description: "Achieve balance in body, mind, and spirit"
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-linear-to-b from-[#1C1712] to-[#0F0D0A]">

      <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-1.5 mb-4 sm:mb-6">
            <FiGrid className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm text-amber-400 font-medium">Browse Categories</span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Browse by </span>
            <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Explore thousands of books across different genres and find your next favorite read
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
              className={`group relative bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border ${category.borderColor} ${category.hoverColor} transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Category Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-linear-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-500`}></div>
                
                {/* Icon Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center ${category.bgColor} backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500`}>
                  <div className={`text-white ${category.color.replace('from-', 'text-').replace('to-', 'text-')}`}>
                    {category.icon}
                  </div>
                </div>
              </div>

              {/* Category Info */}
              <div className="p-5 sm:p-6">
                {/* Icon and Name */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl ${category.bgColor} ${category.color.replace('from-', 'text-').replace('to-', 'text-')} group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Book Count and Link */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                    <FiBook className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{category.bookCount.toLocaleString()} books</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs sm:text-sm font-medium group-hover:gap-2 transition-all duration-300">
                    <span>Explore</span>
                    <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute -inset-1 bg-linear-to-r ${category.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}></div>
            </Link>
          ))}
        </div>

        {/* View All Categories CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/25 group"
          >
            <FiCompass className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Explore All Categories</span>
            <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BrowseCategory;