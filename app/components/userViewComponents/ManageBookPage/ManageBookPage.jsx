"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiPlus,
  FiLoader,
  FiChevronLeft,
  FiChevronRight,
  FiBookOpen,
  FiFilter,
  FiX,
  FiStar
} from "react-icons/fi";
import Swal from "sweetalert2";

import useAuth from "@/app/hooks/useAuth";
import axiosInstance from "../../sharedComponents/axiosInstance/axiosInstance";

const ManageBookPage = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // ইউজারের বই ফেচ করা
  const fetchUserBooks = async (page = 1) => {
    try {
      setLoading(true);
      let url = `/books/user/me?page=${page}&limit=10`;
      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
      if (selectedStatus !== "all") url += `&status=${selectedStatus}`;
      
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
      console.error("Fetch user books error:", error);
      if (error.response?.status === 404) {
        setBooks([]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to load your books",
          background: "#2A2219",
          color: "#fff",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBooks();
    }
  }, [user, searchTerm, selectedStatus]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchUserBooks(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setShowFilter(false);
  };

  // ডিলিট কনফার্মেশন
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

  // ডিলিট হ্যান্ডলার
  const handleDelete = async (bookId) => {
    try {
      const response = await axiosInstance.delete(`/books/${bookId}`);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Book has been deleted successfully",
          timer: 2000,
          showConfirmButton: false,
          background: "#2A2219",
          color: "#fff",
        });
        fetchUserBooks(pagination.currentPage);
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete book",
        background: "#2A2219",
        color: "#fff",
      });
    }
  };

  // স্ট্যাটাস ব্যাজ রঙ
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return { bg: "bg-green-500/20", text: "text-green-400", label: "Active" };
      case "inactive":
        return { bg: "bg-red-500/20", text: "text-red-400", label: "Inactive" };
      default:
        return { bg: "bg-gray-500/20", text: "text-gray-400", label: status || "Draft" };
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />);
    }
    for (let i = fullStars; i < 5; i++) {
      stars.push(<FiStar key={i} className="w-3 h-3 text-gray-600" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* হেডার */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Manage Books</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your uploaded books</p>
          </div>
          <Link
            href="/add-book"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
          >
            <FiPlus className="w-5 h-5" />
            Add New Book
          </Link>
        </div>

        {/* সার্চ ও ফিল্টার বার */}
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
            {selectedStatus !== "all" && <span className="w-2 h-2 bg-amber-400 rounded-full"></span>}
          </button>
        </div>

        {/* ফিল্টার প্যানেল */}
        {showFilter && (
          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Filter by Status</h3>
              {selectedStatus !== "all" && (
                <button onClick={clearFilters} className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1">
                  <FiX className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStatus("all")}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedStatus === "all" ? "bg-amber-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedStatus("active")}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedStatus === "active" ? "bg-green-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setSelectedStatus("inactive")}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedStatus === "inactive" ? "bg-red-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        )}

        {/* বইয়ের তালিকা */}
        {loading ? (
          <div className="flex justify-center py-20">
            <FiLoader className="w-8 h-8 text-amber-400 animate-spin" />
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
              <FiBookOpen className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl text-white mb-2">No Books Found</h3>
            <p className="text-gray-400">You haven't uploaded any books yet</p>
            <Link
              href="/add-book"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              Upload Your First Book
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
                    <th className="pb-3 hidden sm:table-cell">Status</th>
                    <th className="pb-3 w-28">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => {
                    const statusBadge = getStatusBadge(book.status);
                    
                    return (
                      <tr key={book._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
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
                                <FiBookOpen className="w-5 h-5 text-gray-500" />
                              </div>
                            )}
                            <div>
                              <p className="text-white font-medium line-clamp-1">{book.title}</p>
                              <p className="text-gray-500 text-xs md:hidden">{book.authorName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 hidden md:table-cell">
                          <span className="text-gray-300 text-sm">{book.authorName}</span>
                        </td>
                        <td className="py-3 hidden lg:table-cell">
                          <span className="text-gray-400 text-xs px-2 py-1 bg-white/10 rounded-full">
                            {book.category?.name}
                          </span>
                        </td>
                        <td className="py-3">
                          <div>
                            <p className="text-amber-400 font-semibold">${book.discountPrice}</p>
                            {book.price > book.discountPrice && (
                              <p className="text-gray-500 text-xs line-through">${book.price}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 hidden sm:table-cell">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${book.status === "active" ? "bg-green-400" : "bg-red-400"}`}></span>
                            {statusBadge.label}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/books/${book._id}`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                              title="View Book"
                            >
                              <FiEye className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/edit-book/${book._id}`}
                              className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
                              title="Edit Book"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => confirmDelete(book)}
                              className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                              title="Delete Book"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* পেজিনেশন */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 text-white">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* স্ট্যাটিস্টিকস */}
        {books.length > 0 && (
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">{pagination.totalItems}</p>
                <p className="text-xs text-gray-400">Total Books</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">{books.filter(b => b.status === "active").length}</p>
                <p className="text-xs text-gray-400">Active</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400">{books.filter(b => b.status === "inactive").length}</p>
                <p className="text-xs text-gray-400">Inactive</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-400">
                  ${books.reduce((sum, b) => sum + (b.discountPrice || 0), 0).toFixed(0)}
                </p>
                <p className="text-xs text-gray-400">Total Value</p>
              </div>
            </div>
          </div>
        )}
      </div>

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

export default ManageBookPage;