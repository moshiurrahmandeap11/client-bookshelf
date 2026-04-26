"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiLoader,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiEye,
  FiFilter,
  FiX,
} from "react-icons/fi";
import Swal from "sweetalert2";
import axiosInstance from "@/app/components/sharedComponents/axiosInstance/axiosInstance";

const AdminAllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
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
      let url = `/books?page=${page}&limit=10`;
      if (searchTerm) url += `&search=${searchTerm}`;
      if (selectedCategory) url += `&category=${selectedCategory}`;

      const response = await axiosInstance.get(url);
      if (response.data.success) {
        setBooks(response.data.data);
        setPagination({
          currentPage: response.data.pagination?.currentPage || page,
          totalPages: response.data.pagination?.totalPages || 1,
          totalItems: response.data.pagination?.totalItems || 0,
        });
      }
    } catch (error) {
      console.error("Fetch books error:", error);
      showErrorToast("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBooks(1);
  }, [searchTerm, selectedCategory]);

  const showSuccessToast = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message,
      timer: 2000,
      showConfirmButton: false,
      background: "#2A2219",
      color: "#fff",
      iconColor: "#F59E0B",
    });
  };

  const showErrorToast = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: message,
      timer: 2000,
      showConfirmButton: false,
      background: "#2A2219",
      color: "#fff",
      iconColor: "#EF4444",
    });
  };

  const confirmDelete = (book) => {
    Swal.fire({
      title: "Delete Book?",
      html: `Are you sure you want to delete <strong>${book.title}</strong>?<br/>This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete book",
      cancelButtonText: "Cancel",
      background: "#2A2219",
      color: "#fff",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "px-4 py-2 rounded-xl font-semibold",
        cancelButton: "px-4 py-2 rounded-xl font-semibold",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(book._id);
      }
    });
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await axiosInstance.delete(`/books/${bookId}`);
      if (response.data.success) {
        showSuccessToast("Book deleted successfully");
        fetchBooks(pagination.currentPage);
      }
    } catch (error) {
      console.error("Delete error:", error);
      showErrorToast(error.response?.data?.message || "Failed to delete book");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FiStar key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />,
      );
    }
    for (let i = fullStars; i < 5; i++) {
      stars.push(<FiStar key={i} className="w-3 h-3 text-gray-600" />);
    }
    return stars;
  };

  return (
    <div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Books Management</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your book collection
          </p>
        </div>
        <Link
          href="/admin/books/add"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
        >
          <FiPlus className="w-5 h-5" />
          Add New Book
        </Link>
      </div>


      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:text-amber-400 transition-colors"
        >
          <FiFilter className="w-4 h-4" />
          Filter
          {selectedCategory && (
            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
          )}
        </button>
      </div>


      {showFilter && (
        <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Filter by Category</h3>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory("")}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <FiX className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                !selectedCategory
                  ? "bg-amber-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedCategory === cat.slug
                    ? "bg-amber-500 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}


      {loading ? (
        <div className="flex justify-center py-20">
          <FiLoader className="w-8 h-8 text-amber-400 animate-spin" />
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
            <FiEye className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl text-white mb-2">No Books Found</h3>
          <p className="text-gray-400">Add your first book to get started</p>
          <Link
            href="/admin/books/add"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Add New Book
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-3 w-12">#</th>
                  <th className="pb-3">Book</th>
                  <th className="pb-3 hidden md:table-cell">Author</th>
                  <th className="pb-3 hidden lg:table-cell">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3 hidden sm:table-cell">Rating</th>
                  <th className="pb-3 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr
                    key={book._id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-3 text-gray-500 text-sm">
                      {(pagination.currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        {book.thumbnail ? (
                          <Image
                            src={book.thumbnail}
                            alt={book.title}
                            width={40}
                            height={50}
                            className="w-10 h-12 rounded object-cover"
                          />
                        ) : (
                          <div className="w-10 h-12 rounded bg-white/10 flex items-center justify-center">
                            <FiEye className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium line-clamp-1">
                            {book.title}
                          </p>
                          <p className="text-gray-500 text-xs md:hidden">
                            {book.authorName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 hidden md:table-cell">
                      <span className="text-gray-300 text-sm">
                        {book.authorName}
                      </span>
                    </td>
                    <td className="py-3 hidden lg:table-cell">
                      <span className="text-gray-400 text-xs px-2 py-1 bg-white/10 rounded-full">
                        {book.category?.name}
                      </span>
                    </td>
                    <td className="py-3">
                      <div>
                        <p className="text-amber-400 font-semibold">
                          ${book.discountPrice}
                        </p>
                        {book.price > book.discountPrice && (
                          <p className="text-gray-500 text-xs line-through">
                            ${book.price}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-1">
                        {renderStars(book.rating?.average || 0)}
                        <span className="text-gray-500 text-xs ml-1">
                          ({book.rating?.count || 0})
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/books/edit/${book._id}`}
                          className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => confirmDelete(book)}
                          className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => fetchBooks(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 text-white">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchBooks(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AdminAllBooksPage;
