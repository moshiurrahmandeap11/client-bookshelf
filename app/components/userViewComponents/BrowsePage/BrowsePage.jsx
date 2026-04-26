"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiSearch,
  FiFilter,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiBookOpen,
  FiGrid,
  FiList,
  FiLoader,
  FiEye,
} from "react-icons/fi";
import axiosInstance from "../../sharedComponents/axiosInstance/axiosInstance";

const BrowsePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");


  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
  });


  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
    }
  };


  const fetchBooks = async (page = 1) => {
    try {
      setLoading(true);

      let url = `/books?page=${page}&limit=12`;
      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
      if (selectedCategory) url += `&category=${selectedCategory}`;
      if (minPrice) url += `&minPrice=${minPrice}`;
      if (maxPrice) url += `&maxPrice=${maxPrice}`;

      const response = await axiosInstance.get(url);

      if (response.data.success) {
        setBooks(response.data.data);
        setPagination({
          currentPage: response.data.pagination.currentPage,
          totalPages: response.data.pagination.totalPages,
          totalItems: response.data.pagination.totalItems,
          itemsPerPage: response.data.pagination.itemsPerPage,
        });
      }
    } catch (error) {
      console.error("Fetch books error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBooks(1);
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBooks(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setShowFilter(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FiStar
          key={i}
          className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400"
        />,
      );
    }
    for (let i = fullStars; i < 5; i++) {
      stars.push(
        <FiStar key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />,
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712]">

      <section className="sticky top-16 lg:top-20 z-20 bg-[#1C1712]/95 backdrop-blur-xl border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">

            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, author or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:text-amber-400 transition-colors"
              >
                <FiFilter className="w-4 h-4" />
                Filter
                {(selectedCategory || minPrice || maxPrice) && (
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                )}
              </button>

              <div className="flex gap-1 bg-white/10 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "grid" ? "bg-amber-500 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  <FiGrid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "list" ? "bg-amber-500 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  <FiList className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>


          {showFilter && (
            <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium">Filter Books</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <FiX className="w-3 h-3" /> Clear all
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-gray-400 text-sm">
          Showing {books.length} of {pagination.totalItems} books
        </p>
      </div>


      <section className="py-6 mt-4 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <FiLoader className="w-8 h-8 text-amber-400 animate-spin" />
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                <FiBookOpen className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl text-white mb-2">No books found</h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden"
                >

                  <div className="relative h-64 overflow-hidden">
                    {book.thumbnail ? (
                      <Image
                        src={book.thumbnail}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center">
                        <FiBookOpen className="w-12 h-12 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>


                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-amber-400">
                        {book.category?.name}
                      </span>
                      <div className="flex items-center gap-1">
                        {renderStars(book.rating?.average)}
                        <span className="text-gray-500 text-xs">
                          ({book.rating?.count || 0})
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {book.authorName}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-amber-400 font-bold text-lg">
                          ${book.discountPrice}
                        </p>
                        {book.price > book.discountPrice && (
                          <p className="text-gray-500 text-xs line-through">
                            ${book.price}
                          </p>
                        )}
                      </div>
                      <Link
                        href={`/books/${book._id}`}
                        className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 text-sm flex items-center gap-1"
                      >
                        <FiEye className="w-3 h-3" /> View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all duration-300 p-5"
                >
                  <div className="flex flex-col sm:flex-row gap-5">

                    <div className="relative w-32 h-40 flex-shrink-0 rounded-xl overflow-hidden">
                      {book.thumbnail ? (
                        <Image
                          src={book.thumbnail}
                          alt={book.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/10 flex items-center justify-center">
                          <FiBookOpen className="w-8 h-8 text-gray-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <span className="text-xs text-amber-400">
                            {book.category?.name}
                          </span>
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-2">
                            {book.authorName}
                          </p>
                          <p className="text-gray-500 text-sm line-clamp-2">
                            {book.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-400 font-bold text-2xl">
                            ${book.discountPrice}
                          </p>
                          {book.price > book.discountPrice && (
                            <p className="text-gray-500 text-sm line-through">
                              ${book.price}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            {renderStars(book.rating?.average)}
                            <span className="text-gray-500 text-sm ml-1">
                              ({book.rating?.count || 0})
                            </span>
                          </div>
                          <span className="text-gray-500 text-sm">
                            {book.pages} pages
                          </span>
                          <span className="text-gray-500 text-sm">
                            {book.language}
                          </span>
                        </div>
                        <Link
                          href={`/books/${book._id}`}
                          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 text-sm flex items-center gap-2"
                        >
                          <FiEye className="w-4 h-4" /> View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}


          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1">
                {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (
                    pagination.currentPage >=
                    pagination.totalPages - 2
                  ) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                        pagination.currentPage === pageNum
                          ? "bg-amber-500 text-white"
                          : "bg-white/10 text-gray-400 hover:bg-white/20"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
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

export default BrowsePage;
