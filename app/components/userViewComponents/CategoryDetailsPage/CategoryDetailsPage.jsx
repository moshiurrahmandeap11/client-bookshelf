"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FiSearch,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiLoader,
  FiAlertCircle,
  FiStar,
  FiBookOpen,
  FiFilter,
} from "react-icons/fi";
import axiosInstance from "../../sharedComponents/axiosInstance/axiosInstance";

const CategoryDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const [categoryName, setCategoryName] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilter, setShowFilter] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });


  const getCategoryNameFromSlug = (slug) => {
    const categoryMap = {
      fiction: "Fiction",
      "self-help": "Self-Help",
      "science-fiction": "Science Fiction",
      "health-wellness": "Health & Wellness",
      biography: "Biography",
      history: "History",
      business: "Business",
      technology: "Technology",
      "art-design": "Art & Design",
      environment: "Environment",
      philosophy: "Philosophy",
      psychology: "Psychology",
    };
    return (
      categoryMap[slug] ||
      slug?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };


  const fetchCategoryAndBooks = async (page = 1) => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);


      let foundCategoryName = getCategoryNameFromSlug(slug);

      try {

        const categoriesRes = await axiosInstance.get("/categories");
        if (categoriesRes.data.success) {
          const matchedCategory = categoriesRes.data.data.find(
            (cat) =>
              cat.slug === slug ||
              cat.name.toLowerCase().replace(/ /g, "-") === slug,
          );
          if (matchedCategory) {
            foundCategoryName = matchedCategory.name;
          }
        }
      } catch (err) {
        console.log("Categories API not available, using local mapping");
      }

      setCategoryName(foundCategoryName);


      let url = `/books?page=${page}&limit=12`;
      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
      if (minPrice) url += `&minPrice=${minPrice}`;
      if (maxPrice) url += `&maxPrice=${maxPrice}`;


      if (sortBy === "price_asc") url += `&sort=price_asc`;
      else if (sortBy === "price_desc") url += `&sort=price_desc`;
      else if (sortBy === "rating") url += `&sort=rating`;

      const booksRes = await axiosInstance.get(url);

      if (booksRes.data.success) {

        let filteredBooks = booksRes.data.data;


        filteredBooks = booksRes.data.data.filter((book) => {
          const bookCategory = book.category?.name?.toLowerCase() || "";
          const targetCategory = foundCategoryName.toLowerCase();

          return (
            bookCategory === targetCategory ||
            bookCategory === slug?.replace(/-/g, " ") ||
            bookCategory.includes(targetCategory)
          );
        });

        setBooks(filteredBooks);
        setPagination({
          currentPage: page,
          totalPages: Math.ceil(filteredBooks.length / 12) || 1,
          totalItems: filteredBooks.length,
        });
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchCategoryAndBooks();
    }
  }, [slug, searchTerm, sortBy, minPrice, maxPrice]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchCategoryAndBooks(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
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


  const startIndex = (pagination.currentPage - 1) * 12;
  const endIndex = startIndex + 12;
  const paginatedBooks = books.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading books...</p>
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
            onClick={() => fetchCategoryAndBooks()}
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
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search in ${categoryName || "this"} category...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:text-amber-400 transition-colors"
                >
                  <FiFilter className="w-4 h-4" />
                  Filter
                  {(minPrice || maxPrice) && (
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  )}
                </button>

                <div className="flex gap-1 bg-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-amber-500 text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    <FiGrid className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-amber-500 text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    <FiList className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {showFilter && (
              <div className="flex flex-wrap items-center gap-4 p-4 bg-white/5 rounded-xl">
                <span className="text-gray-400 text-sm">Price Range:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-24 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-24 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm"
                  />
                </div>
                {(minPrice || maxPrice) && (
                  <button
                    onClick={() => {
                      setMinPrice("");
                      setMaxPrice("");
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden pt-20 sm:pt-24 lg:pt-32 pb-12">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <Link
            href="/categories"
            className="inline-flex items-start gap-2 text-gray-400 hover:text-amber-400 transition-colors mb-4"
          >
            <FiChevronLeft className="w-4 h-4" /> Back to Categories
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              {categoryName || slug?.replace(/-/g, " ")}
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed">
            Explore our collection of{" "}
            {categoryName?.toLowerCase() || slug?.replace(/-/g, " ")} books
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
            <FiBookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-gray-300 text-sm">
              {books.length} books available
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-gray-400 text-sm">
          Showing {paginatedBooks.length} of {books.length} books
        </p>
      </div>

      <section className="py-6 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {books.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                <FiBookOpen className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl text-white mb-2">No books found</h3>
              <p className="text-gray-400">
                No books available in this category yet
              </p>
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
              >
                Browse All Books <FiChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedBooks.map((book) => (
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
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center">
                        <FiBookOpen className="w-12 h-12 text-gray-600" />
                      </div>
                    )}
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
                    <Link href={`/books/${book._id}`}>
                      <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-amber-400">
                        {book.title}
                      </h3>
                    </Link>
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
                        className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-amber-400 transition text-sm flex items-center gap-1"
                      >
                        <FiBookOpen className="w-3 h-3" /> View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedBooks.map((book) => (
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
                          className="object-cover"
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
                          <Link href={`/books/${book._id}`}>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400">
                              {book.title}
                            </h3>
                          </Link>
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
                          <FiBookOpen className="w-4 h-4" /> View Details
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
                className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1">
                {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                  let pageNum =
                    pagination.totalPages <= 5
                      ? i + 1
                      : pagination.currentPage <= 3
                        ? i + 1
                        : pagination.currentPage >= pagination.totalPages - 2
                          ? pagination.totalPages - 4 + i
                          : pagination.currentPage - 2 + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-lg transition-all ${pagination.currentPage === pageNum ? "bg-amber-500 text-white" : "bg-white/10 text-gray-400 hover:bg-white/20"}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20"
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

export default CategoryDetailsPage;
