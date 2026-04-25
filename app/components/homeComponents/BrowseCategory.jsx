"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FiBook, 
  FiTrendingUp, 
  FiChevronRight, 
  FiGrid,
  FiCompass,
  FiHeart,
  FiLoader,
  FiAlertCircle
} from "react-icons/fi";
import { 
  FaMicrophone, 
  FaRocket, 
  FaBrain, 
  FaHeartbeat,
  FaMagic,
  FaRobot,
  FaDragon,
  FaLeaf,
  FaBookOpen,
  FaUserAstronaut,
  FaHistory,
  FaPalette
} from "react-icons/fa";
import axiosInstance from "../sharedComponents/axiosInstance/axiosInstance";


const BrowseCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const iconMap = {
    "Fiction": <FaMagic className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Self-Help": <FaBrain className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Self Help": <FaBrain className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Science Fiction": <FaRocket className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Health & Wellness": <FaHeartbeat className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Biography": <FaUserAstronaut className="w-6 h-6 sm:w-7 sm:h-7" />,
    "History": <FaHistory className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Business": <FaDragon className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Technology": <FaRobot className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Art & Design": <FaPalette className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Philosophy": <FaBrain className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Psychology": <FaBrain className="w-6 h-6 sm:w-7 sm:h-7" />,
    "default": <FaBookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
  };


  const colorMap = {
    "Fiction": "from-purple-500 to-pink-500",
    "Self-Help": "from-emerald-500 to-teal-500",
    "Self Help": "from-emerald-500 to-teal-500",
    "Science Fiction": "from-blue-500 to-cyan-500",
    "Health & Wellness": "from-red-500 to-rose-500",
    "Biography": "from-orange-500 to-amber-500",
    "History": "from-yellow-500 to-orange-500",
    "Business": "from-slate-500 to-gray-500",
    "Technology": "from-cyan-500 to-blue-500",
    "Art & Design": "from-fuchsia-500 to-pink-500",
    "Philosophy": "from-indigo-500 to-purple-500",
    "Psychology": "from-pink-500 to-rose-500",
    "default": "from-amber-500 to-orange-500"
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get("/categories");
      
      if (response.data.success) {

        setCategories(response.data.data.slice(0, 4));
      } else {
        setError("Failed to load categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-linear-to-b from-[#1C1712] to-[#0F0D0A]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-1.5 mb-4 sm:mb-6">
              <FiGrid className="w-4 h-4 text-amber-400" />
              <span className="text-xs sm:text-sm text-amber-400 font-medium">Browse Categories</span>
            </div>
            <div className="h-10 w-64 bg-white/10 rounded-lg animate-pulse mx-auto mb-4"></div>
            <div className="h-5 w-96 bg-white/10 rounded-lg animate-pulse mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-40 sm:h-48 bg-white/10"></div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl"></div>
                    <div className="h-6 w-24 bg-white/10 rounded"></div>
                  </div>
                  <div className="h-4 w-full bg-white/10 rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-white/10 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 w-20 bg-white/10 rounded"></div>
                    <div className="h-4 w-16 bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }


  if (error) {
    return (
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-linear-to-b from-[#1C1712] to-[#0F0D0A]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl text-white mb-2">Failed to load categories</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchCategories}
            className="px-6 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }


  if (categories.length === 0) {
    return (
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-linear-to-b from-[#1C1712] to-[#0F0D0A]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FiBook className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl text-white mb-2">No categories yet</h3>
          <p className="text-gray-400">Categories will appear here once added.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-linear-to-b from-[#1C1712] to-[#0F0D0A]">


      <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-12 sm:mb-16 lg:mb-20">
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
          <p className="text-base sm:text-lg text-gray-400 ">
            Explore thousands of books across different genres and find your next favorite read
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category, index) => {
            const Icon = iconMap[category.name] || iconMap.default;
            const color = colorMap[category.name] || colorMap.default;
            const bgColor = color.replace("from-", "bg-").split(" ")[0] + "/10";
            const borderColor = color.replace("from-", "border-").split(" ")[0] + "/30";
            const hoverColor = color.replace("from-", "hover:border-").split(" ")[0] + "/60";
            
            return (
              <Link
                key={category._id}
                href={`/categories/${category.slug}`}
                className={`group relative bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border ${borderColor} ${hoverColor} transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Category Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className={`w-full h-full bg-linear-to-br ${color} opacity-60`}></div>
                  )}
                  <div className={`absolute inset-0 bg-linear-to-t ${color} opacity-60 group-hover:opacity-70 transition-opacity duration-500`}></div>
                  
                  {/* Icon Overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center ${bgColor} backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500`}>
                    <div className="text-white">
                      {Icon}
                    </div>
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-5 sm:p-6">
                  {/* Icon and Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-xl ${bgColor} text-${color.split("-")[1]}-400 group-hover:scale-110 transition-transform duration-300`}>
                      {Icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {category.description || `Explore our collection of ${category.name.toLowerCase()} books`}
                  </p>

                  {/* Book Count and Link */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                      <FiBook className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{category.bookCount?.toLocaleString() || "0"} books</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs sm:text-sm font-medium group-hover:gap-2 transition-all duration-300">
                      <span>Explore</span>
                      <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute -inset-1 bg-linear-to-r ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}></div>
              </Link>
            );
          })}
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

      <style jsx>{`
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