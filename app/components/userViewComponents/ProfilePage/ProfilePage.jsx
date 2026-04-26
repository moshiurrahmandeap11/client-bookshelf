"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiEdit2,
  FiBookOpen,
  FiHeart,
  FiStar,
  FiLoader,
  FiLogOut,
  FiShoppingCart,
} from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "@/app/hooks/useAuth";
import axiosInstance from "../../sharedComponents/axiosInstance/axiosInstance";

const ProfilePage = () => {
  const { user, loading, logout, refetchUser } = useAuth();
  const router = useRouter();
  const [userStats, setUserStats] = useState({
    totalBooks: 0,
    totalReviews: 0,
    totalLikes: 0,
    cartItems: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);


  const fetchUserStats = async () => {
    if (!user) return;

    try {
      setStatsLoading(true);


      const booksRes = await axiosInstance.get(`/books/user/me?limit=100`);
      const userBooks = booksRes.data.data || [];


      const reviewsRes = await axiosInstance.get("/books?limit=100");
      const allBooks = reviewsRes.data.data || [];


      let userReviewsCount = 0;
      allBooks.forEach((book) => {
        if (book.reviews && book.reviews.length > 0) {
          const userReviews = book.reviews.filter(
            (review) => review.userId === (user.id || user._id),
          );
          userReviewsCount += userReviews.length;
        }
      });


      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartItemsCount = cart.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0,
      );

      setUserStats({
        totalBooks: userBooks.length,
        totalReviews: userReviewsCount,
        totalLikes: 0,
        cartItems: cartItemsCount,
      });
    } catch (error) {
      console.error("Fetch stats error:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const handleLogout = async () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      background: "#2A2219",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logout();
        router.push("/");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading profile...</p>
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
          <p className="text-gray-400 mb-6">
            Please login to view your profile
          </p>
          <Link
            href="/login"
            className="px-6 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden mb-8">

          <div className="h-32 sm:h-40 bg-gradient-to-r from-amber-500/20 to-orange-500/20"></div>


          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">

              <div className="relative">
                {user.profilePicture ? (
                  <Image
                    src={user.profilePicture}
                    alt={user.fullName}
                    width={120}
                    height={120}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-amber-500 ring-4 ring-amber-500/20"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-amber-500 ring-4 ring-amber-500/20">
                    {user.fullName?.charAt(0).toUpperCase()}
                  </div>
                )}
                <Link
                  href={`/profile/edit/${user._id}`}
                  className="absolute bottom-2 right-2 p-1.5 bg-amber-500 rounded-full text-white hover:bg-amber-600 transition-colors"
                >
                  <FiEdit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </div>


              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {user.fullName}
                  </h1>
                  {user.role === "admin" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 rounded-full text-xs text-amber-400">
                      <FaUserShield className="w-3 h-3" /> Admin
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-400 mt-1">
                  <FiMail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 text-xs mt-2">
                  <FiCalendar className="w-3 h-3" />
                  <span>
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>


              <div className="flex gap-3">
                <Link
                  href={`/profile/edit/${user._id}`}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 text-sm flex items-center gap-2"
                >
                  <FiEdit2 className="w-4 h-4" /> Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-all duration-300 text-sm flex items-center gap-2"
                >
                  <FiLogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10 hover:border-amber-500/30 transition-all duration-300">
            <FiBookOpen className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {statsLoading ? (
                <FiLoader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                userStats.totalBooks
              )}
            </p>
            <p className="text-gray-400 text-sm">Books Uploaded</p>
          </div>
          <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10 hover:border-amber-500/30 transition-all duration-300">
            <FiHeart className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {statsLoading ? (
                <FiLoader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                userStats.totalLikes
              )}
            </p>
            <p className="text-gray-400 text-sm">Total Likes</p>
          </div>
          <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10 hover:border-amber-500/30 transition-all duration-300">
            <FiStar className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {statsLoading ? (
                <FiLoader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                userStats.totalReviews
              )}
            </p>
            <p className="text-gray-400 text-sm">Reviews Written</p>
          </div>
          <div className="bg-white/5 rounded-xl p-5 text-center border border-white/10 hover:border-amber-500/30 transition-all duration-300">
            <FiShoppingCart className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {statsLoading ? (
                <FiLoader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                userStats.cartItems
              )}
            </p>
            <p className="text-gray-400 text-sm">Cart Items</p>
          </div>
        </div>


        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
          </div>
          <div className="divide-y divide-white/10">
            <Link
              href="/manage-books"
              className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FiBookOpen className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-amber-400 transition-colors">
                  Manage My Books
                </span>
              </div>
              <span className="text-gray-500 text-sm">
                {userStats.totalBooks} books
              </span>
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FiHeart className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-amber-400 transition-colors">
                  My Wishlist
                </span>
              </div>
              <span className="text-gray-500 text-sm">View saved books</span>
            </Link>
            <Link
              href="/my-reviews"
              className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FiStar className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-amber-400 transition-colors">
                  My Reviews
                </span>
              </div>
              <span className="text-gray-500 text-sm">
                {userStats.totalReviews} reviews
              </span>
            </Link>
  
            <Link
              href="/cart"
              className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FiShoppingCart className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-amber-400 transition-colors">
                  My Cart
                </span>
              </div>
              <span className="text-gray-500 text-sm">
                {userStats.cartItems} items
              </span>
            </Link>
          </div>
        </div>
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

export default ProfilePage;
