"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiHeart,
  FiTrash2,
  FiShoppingCart,
  FiEye,
  FiStar,
  FiLoader,
  FiBookOpen,
  FiChevronRight,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstance from "../../sharedComponents/axiosInstance/axiosInstance";

const WishListPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedBooks, setLikedBooks] = useState({});


  const getLikedBookIds = () => {
    const saved = localStorage.getItem("likedBooks");
    if (saved) {
      return JSON.parse(saved);
    }
    return {};
  };


  const fetchWishlistItems = async () => {
    try {
      setLoading(true);
      const likedBookIds = getLikedBookIds();
      const likedIds = Object.keys(likedBookIds).filter(
        (id) => likedBookIds[id] === true,
      );

      if (likedIds.length === 0) {
        setWishlistItems([]);
        setLoading(false);
        return;
      }


      const bookPromises = likedIds.map(async (id) => {
        try {
          const response = await axiosInstance.get(`/books/${id}`);
          if (response.data.success) {
            return response.data.data;
          }
          return null;
        } catch (err) {
          console.error(`Failed to fetch book ${id}:`, err);
          return null;
        }
      });

      const books = (await Promise.all(bookPromises)).filter(
        (book) => book !== null,
      );
      setWishlistItems(books);
      setLikedBooks(likedBookIds);
    } catch (error) {
      console.error("Fetch wishlist error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to load wishlist",
        background: "#2A2219",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);


  const removeFromWishlist = (bookId, bookTitle) => {
    Swal.fire({
      title: "Remove from Wishlist?",
      text: `Are you sure you want to remove "${bookTitle}" from your wishlist?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      background: "#2A2219",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedLikes = { ...likedBooks };
        delete updatedLikes[bookId];
        localStorage.setItem("likedBooks", JSON.stringify(updatedLikes));
        setLikedBooks(updatedLikes);
        setWishlistItems(wishlistItems.filter((item) => item._id !== bookId));

        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Book removed from wishlist",
          timer: 1500,
          showConfirmButton: false,
          background: "#2A2219",
          color: "#fff",
        });
      }
    });
  };


  const handleAddToCart = (book) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.id === book._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: book._id,
        title: book.title,
        price: book.discountPrice,
        originalPrice: book.price,
        thumbnail: book.thumbnail,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${book.title} has been added to your cart`,
      timer: 1500,
      showConfirmButton: false,
      background: "#2A2219",
      color: "#fff",
    });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
            <FiHeart className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm text-amber-400 font-medium">
              My Collection
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">My </span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Wishlist
            </span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-md">
            Books you&apos;ve saved for later reading
          </p>
        </div>

   
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
              <FiHeart className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-400 mb-6">
              Start adding books you love to your wishlist
            </p>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
            >
              Browse Books <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* টেবিল ভিউ (ডেস্কটপের জন্য) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="pb-3 w-12">#</th>
                    <th className="pb-3">Book</th>
                    <th className="pb-3">Author</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Rating</th>
                    <th className="pb-3 w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((book, index) => (
                    <tr
                      key={book._id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                    >
                      <td className="py-4 text-gray-500 text-sm">
                        {index + 1}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          {book.thumbnail ? (
                            <Image
                              src={book.thumbnail}
                              alt={book.title}
                              width={40}
                              height={50}
                              className="w-10 h-14 rounded object-cover"
                            />
                          ) : (
                            <div className="w-10 h-14 rounded bg-white/10 flex items-center justify-center">
                              <FiBookOpen className="w-5 h-5 text-gray-500" />
                            </div>
                          )}
                          <div>
                            <p className="text-white font-medium">
                              {book.title}
                            </p>
                            <p className="text-gray-500 text-xs lg:hidden">
                              {book.authorName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-gray-300 text-sm hidden lg:inline">
                          {book.authorName}
                        </span>
                      </td>
                      <td className="py-4">
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
                      <td className="py-4">
                        <div className="flex items-center gap-1">
                          {renderStars(book.rating?.average)}
                          <span className="text-gray-500 text-xs ml-1">
                            ({book.rating?.count || 0})
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/books/${book._id}`}
                            className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                            title="View Details"
                          >
                            <FiEye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleAddToCart(book)}
                            className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                            title="Add to Cart"
                          >
                            <FiShoppingCart className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              removeFromWishlist(book._id, book.title)
                            }
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            title="Remove from Wishlist"
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


            <div className="lg:hidden space-y-4">
              {wishlistItems.map((book) => (
                <div
                  key={book._id}
                  className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden">
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
                      <h3 className="text-base font-bold text-white mb-0.5 line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-gray-400 text-xs">{book.authorName}</p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {renderStars(book.rating?.average)}
                        <span className="text-gray-500 text-xs ml-1">
                          ({book.rating?.count || 0})
                        </span>
                      </div>
                      <div className="mt-1">
                        <p className="text-amber-400 font-bold text-base">
                          ${book.discountPrice}
                        </p>
                        {book.price > book.discountPrice && (
                          <p className="text-gray-500 text-xs line-through">
                            ${book.price}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Link
                          href={`/books/${book._id}`}
                          className="flex-1 px-2 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-center text-xs hover:bg-blue-500/30 transition"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleAddToCart(book)}
                          className="flex-1 px-2 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/30 transition"
                        >
                          Cart
                        </button>
                        <button
                          onClick={() =>
                            removeFromWishlist(book._id, book.title)
                          }
                          className="px-2 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                        >
                          <FiTrash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}


        {wishlistItems.length > 0 && (
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <FaHeart className="w-5 h-5 text-red-500" />
                <span className="text-white">
                  {wishlistItems.length} books in wishlist
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiShoppingCart className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400">
                  Total value: $
                  {wishlistItems
                    .reduce((sum, b) => sum + (b.discountPrice || 0), 0)
                    .toFixed(2)}
                </span>
              </div>
              <Link
                href="/browse"
                className="text-amber-400 hover:text-amber-300 text-sm"
              >
                Continue Shopping →
              </Link>
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

export default WishListPage;
