"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiStar,
  FiEdit2,
  FiTrash2,
  FiLoader,
  FiBookOpen,
  FiChevronRight,
  FiMessageSquare,
  FiCalendar,
  FiUser
} from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "@/app/hooks/useAuth";
import axiosInstance from "../../sharedComponents/axiosInstance/axiosInstance";


const MyReviewsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");

  // ইউজারের সব রিভিউ ফেচ করা
  const fetchMyReviews = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      // সব বই ফেচ করা
      const response = await axiosInstance.get("/books?limit=100");
      
      if (response.data.success) {
        const allBooks = response.data.data;
        // ইউজারের রিভিউ ফিল্টার করা
        const userReviews = [];
        
        allBooks.forEach(book => {
          if (book.reviews && book.reviews.length > 0) {
            book.reviews.forEach(review => {
              if (review.userId === (user.id || user._id)) {
                userReviews.push({
                  ...review,
                  bookId: book._id,
                  bookTitle: book.title,
                  bookThumbnail: book.thumbnail,
                  bookAuthor: book.authorName,
                  bookSlug: book.slug
                });
              }
            });
          }
        });
        
        // তারিখ অনুযায়ী সাজানো (নতুন প্রথমে)
        userReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setReviews(userReviews);
      }
    } catch (error) {
      console.error("Fetch reviews error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to load your reviews",
        background: "#2A2219",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyReviews();
    }
  }, [user]);

  // রিভিউ এডিট মোডাল খোলা
  const openEditModal = (review) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment || "");
  };

  // রিভিউ আপডেট করা
  const handleUpdateReview = async () => {
    if (!editComment.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please write a review",
        background: "#2A2219",
        color: "#fff",
      });
      return;
    }

    try {
      const response = await axiosInstance.put(`/books/${editingReview.bookId}/reviews/${editingReview.id}`, {
        rating: editRating,
        comment: editComment
      });
      
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your review has been updated",
          timer: 1500,
          showConfirmButton: false,
          background: "#2A2219",
          color: "#fff",
        });
        setEditingReview(null);
        fetchMyReviews();
      }
    } catch (error) {
      console.error("Update review error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to update review",
        background: "#2A2219",
        color: "#fff",
      });
    }
  };

  // রিভিউ ডিলিট করা
  const deleteReview = (review) => {
    Swal.fire({
      title: "Delete Review?",
      text: `Are you sure you want to delete your review for "${review.bookTitle}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      background: "#2A2219",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(`/books/${review.bookId}/reviews/${review.id}`);
          if (response.data.success) {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Your review has been deleted",
              timer: 1500,
              showConfirmButton: false,
              background: "#2A2219",
              color: "#fff",
            });
            fetchMyReviews();
          }
        } catch (error) {
          console.error("Delete review error:", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete review",
            background: "#2A2219",
            color: "#fff",
          });
        }
      }
    });
  };

  const renderStars = (rating, size = "w-3 h-3 sm:w-4 sm:h-4") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className={`${size} fill-amber-400 text-amber-400`} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className={`${size} fill-amber-400 text-amber-400`} />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaStar key={`empty-${i}`} className={`${size} text-gray-600`} />);
    }
    return stars;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your reviews...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
            <FiUser className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl text-white mb-2">Not Logged In</h3>
          <p className="text-gray-400 mb-6">Please login to view your reviews</p>
          <Link href="/login" className="px-6 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors">
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* হেডার */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
            <FiMessageSquare className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm text-amber-400 font-medium">My Activity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">My </span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">Reviews</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Reviews you've written for books
          </p>
        </div>

        {/* রিভিউ লিস্ট */}
        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
              <FiStar className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Reviews Yet</h2>
            <p className="text-gray-400 mb-6">You haven't written any reviews yet</p>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
            >
              Browse Books <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-5 hover:border-amber-500/30 transition-all duration-300">
                {/* বইয়ের তথ্য */}
                <div className="flex gap-4 pb-3 border-b border-white/10">
                  <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    {review.bookThumbnail ? (
                      <Image src={review.bookThumbnail} alt={review.bookTitle} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center">
                        <FiBookOpen className="w-6 h-6 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Link href={`/books/${review.bookId}`} className="text-white font-semibold hover:text-amber-400 transition-colors">
                      {review.bookTitle}
                    </Link>
                    <p className="text-gray-400 text-sm">by {review.bookAuthor}</p>
                  </div>
                </div>
                
                {/* রিভিউ কন্টেন্ট */}
                <div className="pt-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                      <span className="text-gray-500 text-xs">({review.rating}/5)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <FiCalendar className="w-3 h-3" />
                      <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{review.comment || "No comment provided."}</p>
                  
                  {/* অ্যাকশন বাটন */}
                  <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-white/10">
                    <button
                      onClick={() => openEditModal(review)}
                      className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-colors flex items-center gap-1"
                    >
                      <FiEdit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => deleteReview(review)}
                      className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition-colors flex items-center gap-1"
                    >
                      <FiTrash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* এডিট মোডাল */}
        {editingReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-[#2A2219] to-[#1C1712] rounded-2xl w-full max-w-md border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Edit Review</h2>
                <button onClick={() => setEditingReview(null)} className="p-1 rounded-lg hover:bg-white/10 transition-colors text-gray-400">
                  ✕
                </button>
              </div>
              
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setEditRating(star)}
                        className="focus:outline-none"
                      >
                        {star <= editRating ? (
                          <FaStar className="w-8 h-8 text-amber-400" />
                        ) : (
                          <FaStar className="w-8 h-8 text-gray-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Your Review</label>
                  <textarea
                    rows="4"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 resize-none"
                    placeholder="Share your thoughts about this book..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 p-5 pt-0">
                <button onClick={() => setEditingReview(null)} className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:bg-white/20 transition-colors">
                  Cancel
                </button>
                <button onClick={handleUpdateReview} className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300">
                  Update Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviewsPage;