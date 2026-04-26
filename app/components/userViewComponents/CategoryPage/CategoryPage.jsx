"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiBookOpen,
  FiSearch,
  FiGrid,
  FiList,
  FiChevronRight,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import {
  FaMagic,
  FaBrain,
  FaRocket,
  FaHeartbeat,
  FaUserAstronaut,
  FaHistory,
  FaDragon,
  FaRobot,
  FaPalette,
  FaLeaf,
  FaBookOpen as FaBookOpenIcon,
} from "react-icons/fa";
import axiosInstance from "../../sharedComponents/axiosInstance/axiosInstance";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");


  const iconMap = {
    Fiction: <FaMagic className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Self-Help": <FaBrain className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Self Help": <FaBrain className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Science Fiction": <FaRocket className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Health & Wellness": <FaHeartbeat className="w-6 h-6 sm:w-7 sm:h-7" />,
    Biography: <FaUserAstronaut className="w-6 h-6 sm:w-7 sm:h-7" />,
    History: <FaHistory className="w-6 h-6 sm:w-7 sm:h-7" />,
    Business: <FaDragon className="w-6 h-6 sm:w-7 sm:h-7" />,
    Technology: <FaRobot className="w-6 h-6 sm:w-7 sm:h-7" />,
    "Art & Design": <FaPalette className="w-6 h-6 sm:w-7 sm:h-7" />,
    Environment: <FaLeaf className="w-6 h-6 sm:w-7 sm:h-7" />,
    default: <FaBookOpenIcon className="w-6 h-6 sm:w-7 sm:h-7" />,
  };


  const colorMap = {
    Fiction: "from-purple-500 to-pink-500",
    "Self-Help": "from-emerald-500 to-teal-500",
    "Self Help": "from-emerald-500 to-teal-500",
    "Science Fiction": "from-blue-500 to-cyan-500",
    "Health & Wellness": "from-red-500 to-rose-500",
    Biography: "from-orange-500 to-amber-500",
    History: "from-yellow-500 to-orange-500",
    Business: "from-slate-500 to-gray-500",
    Technology: "from-cyan-500 to-blue-500",
    "Art & Design": "from-fuchsia-500 to-pink-500",
    Environment: "from-green-500 to-emerald-500",
    default: "from-amber-500 to-orange-500",
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);


      const categoriesRes = await axiosInstance.get("/categories");

      if (categoriesRes.data.success) {
        const categoriesData = categoriesRes.data.data;


        const categoriesWithCount = await Promise.all(
          categoriesData.map(async (category) => {
            try {
              const booksRes = await axiosInstance.get(
                `/books?category=${category.slug}&limit=1`,
              );
              const bookCount = booksRes.data.pagination?.totalItems || 0;
              return { ...category, bookCount };
            } catch (err) {
              return { ...category, bookCount: 0 };
            }
          }),
        );

        setCategories(categoriesWithCount);
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

  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl text-white mb-2">Something went wrong</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchCategories}
            className="px-6 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712]">

      <section className="sticky top-16 lg:top-20 z-20 bg-[#1C1712]/95 backdrop-blur-xl border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "grid" ? "bg-amber-500 text-white" : "text-gray-400 hover:text-white"}`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "list" ? "bg-amber-500 text-white" : "text-gray-400 hover:text-white"}`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>


      <section className="py-12 mt-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <FiAlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">No categories found</h3>
              <p className="text-gray-400">
                Try searching with different keywords
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => {
                const Icon = iconMap[category.name] || iconMap.default;
                const color = colorMap[category.name] || colorMap.default;
                const bookCount = category.bookCount || 0;

                return (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug}`}
                    className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden"
                  >

                    {category.image && (
                      <div className="absolute top-0 right-0 w-24 h-24 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6 relative z-10">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {Icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {category.description ||
                          `Explore our collection of ${category.name.toLowerCase()} books`}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <FiBookOpen className="w-4 h-4" />
                          <span>{bookCount.toLocaleString()} books</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                          <span>Explore</span>
                          <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCategories.map((category) => {
                const Icon = iconMap[category.name] || iconMap.default;
                const color = colorMap[category.name] || colorMap.default;
                const bookCount = category.bookCount || 0;

                return (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug}`}
                    className="group block bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all duration-300 hover:transform hover:-translate-x-1"
                  >
                    <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">

                      {category.image && (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      {!category.image && (
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          {Icon}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-1">
                          {category.description ||
                            `Explore our collection of ${category.name.toLowerCase()} books`}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <FiBookOpen className="w-4 h-4" />
                          <span>{bookCount.toLocaleString()}</span>
                        </div>
                        <FiChevronRight className="w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>


      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 sm:p-12 text-center border border-white/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Browse all our books or contact us for personalized
              recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/browse"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
              >
                Browse All Books
                <FiChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;
