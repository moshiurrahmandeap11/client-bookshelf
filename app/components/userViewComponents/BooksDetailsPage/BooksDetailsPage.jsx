"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FiStar,
  FiHeart,
  FiShoppingCart,
  FiShare2,
  FiChevronLeft,
  FiLoader,
  FiCheck,
  FiBookOpen,
  FiUser,
  FiCalendar,
  FiTag,
  FiBookmark
} from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";

import useAuth from "@/app/hooks/useAuth";
import axiosInstance from "../../sharedComponents/axiosInstance/axiosInstance";

const BooksDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const bookId = params?.id;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [relatedBooks, setRelatedBooks] = useState([]);

  // লোকাল স্টোরেজ থেকে লাইক স্ট্যাটাস চেক
  useEffect(() => {
    const savedLikes = localStorage.getItem("likedBooks");
    if (savedLikes) {
      const likes = JSON.parse(savedLikes);
      setLiked(likes[bookId] || false);
    }
  }, [bookId]);

  // লাইক সেভ করা
  const saveLikeStatus = (id, status) => {
    const savedLikes = localStorage.getItem("likedBooks");
    const likes = savedLikes ? JSON.parse(savedLikes) : {};
    likes[id] = status;
    localStorage.setItem("likedBooks", JSON.stringify(likes));
  };

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    saveLikeStatus(bookId, newLiked);
    
    Swal.fire({
      icon: "success",
      title: newLiked ? "Added to Wishlist" : "Removed from Wishlist",
      text: newLiked ? "Book has been added to your wishlist" : "Book has been removed from your wishlist",
      timer: 1500,
      showConfirmButton: false,
      background: "#2A2219",
      color: "#fff",
      iconColor: "#F59E0B",
    });
  };

  // বইয়ের ডিটেইলস ফেচ
  const fetchBookDetails = async () => {
    if (!bookId) return;
    
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/books/${bookId}`);
      
      if (response.data.success) {
        setBook(response.data.data);
        
        // রিলেটেড বই ফেচ (একই ক্যাটাগরির)
        if (response.data.data.category?.slug) {
          const relatedRes = await axiosInstance.get(`/books?category=${response.data.data.category.slug}&limit=4`);
          if (relatedRes.data.success) {
            setRelatedBooks(relatedRes.data.data.filter(b => b._id !== bookId));
          }
        }
      }
    } catch (error) {
      console.error("Fetch book error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to load book details",
        background: "#2A2219",
        color: "#fff",
      });
      router.push("/browse");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);

  // রিভিউ সাবমিট
  const handleSubmitReview = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to leave a review",
        background: "#2A2219",
        color: "#fff",
        confirmButtonColor: "#F59E0B",
      });
      router.push("/login");
      return;
    }

    if (!reviewText.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please write a review",
        background: "#2A2219",
        color: "#fff",
      });
      return;
    }

    setSubmittingReview(true);
    try {
      const response = await axiosInstance.post(`/books/${bookId}/reviews`, {
        rating: reviewRating,
        comment: reviewText,
      });
      
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          text: "Thank you for your feedback",
          timer: 2000,
          showConfirmButton: false,
          background: "#2A2219",
          color: "#fff",
        });
        setReviewText("");
        setReviewRating(5);
        fetchBookDetails(); // রিফ্রেশ
      }
    } catch (error) {
      console.error("Submit review error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to submit review",
        background: "#2A2219",
        color: "#fff",
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  // অ্যাড টু কার্ট
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: bookId,
        title: book.title,
        price: book.discountPrice,
        originalPrice: book.price,
        thumbnail: book.thumbnail,
        quantity: quantity,
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${book.title} has been added to your cart`,
      timer: 2000,
      showConfirmButton: false,
      background: "#2A2219",
      color: "#fff",
      iconColor: "#F59E0B",
    });
  };

  const renderStars = (rating, size = "w-4 h-4") => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;
    
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <FiLoader className="w-8 h-8 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <FiBookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl text-white mb-2">Book Not Found</h2>
          <Link href="/browse" className="text-amber-400 hover:text-amber-300">Browse Books</Link>
        </div>
      </div>
    );
  }

  const allImages = [book.thumbnail, ...(book.images?.map(img => img.url) || [])].filter(Boolean);
  const discountPercent = book.price > book.discountPrice 
    ? Math.round(((book.price - book.discountPrice) / book.price) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* ব্যাক বাটন */}
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors mb-6">
          <FiChevronLeft className="w-5 h-5" /> Back
        </button>

        {/* বইয়ের মূল তথ্য */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* ইমেজ গ্যালারি */}
          <div>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              {allImages[activeImage] ? (
                <Image src={allImages[activeImage]} alt={book.title} fill className="object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><FiBookOpen className="w-20 h-20 text-gray-600" /></div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(idx)} className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? "border-amber-500" : "border-white/20"}`}>
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* বইয়ের বিবরণ */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs mb-3">{book.category?.name}</span>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{book.title}</h1>
                <p className="text-gray-400 text-lg">by {book.authorName}</p>
              </div>
              <button onClick={handleLike} className="p-3 rounded-full bg-white/10 hover:bg-red-500/20 transition-colors">
                {liked ? <FaHeart className="w-6 h-6 text-red-500" /> : <FiHeart className="w-6 h-6 text-gray-400 hover:text-red-500" />}
              </button>
            </div>

            {/* রেটিং ও রিভিউ */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">{renderStars(book.rating?.average)}<span className="text-white font-medium">{book.rating?.average?.toFixed(1)}</span></div>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400 text-sm">{book.rating?.count || 0} reviews</span>
            </div>

            {/* প্রাইস */}
            <div className="mt-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-amber-400">${book.discountPrice}</span>
                {book.price > book.discountPrice && <span className="text-gray-500 text-xl line-through">${book.price}</span>}
                {discountPercent > 0 && <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm">Save {discountPercent}%</span>}
              </div>
              <p className="text-gray-500 text-sm mt-1">Inclusive of all taxes</p>
            </div>

            {/* বিবরণ */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <p className="text-gray-400 leading-relaxed">{book.description || "No description available."}</p>
            </div>

            {/* বইয়ের তথ্য */}
            <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-white/5 rounded-xl">
              <div><p className="text-gray-500 text-sm">Publisher</p><p className="text-white">{book.publisher || "N/A"}</p></div>
              <div><p className="text-gray-500 text-sm">Language</p><p className="text-white">{book.language}</p></div>
              <div><p className="text-gray-500 text-sm">Pages</p><p className="text-white">{book.pages}</p></div>
              <div><p className="text-gray-500 text-sm">ISBN</p><p className="text-white">{book.isbn || "N/A"}</p></div>
              <div><p className="text-gray-500 text-sm">Published</p><p className="text-white">{new Date(book.publishedDate).getFullYear()}</p></div>
              <div><p className="text-gray-500 text-sm">Stock Status</p><p className={book.stock > 0 ? "text-green-400" : "text-red-400"}>{book.stock > 0 ? `In Stock (${book.stock})` : "Out of Stock"}</p></div>
            </div>

            {/* অ্যাড টু কার্ট */}
            {book.stock > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-4 mb-4"><label className="text-gray-300">Quantity:</label><div className="flex items-center gap-2"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20">-</button><span className="text-white w-12 text-center">{quantity}</span><button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20">+</button></div></div>
                <button onClick={handleAddToCart} disabled={book.stock === 0} className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"><FiShoppingCart className="w-5 h-5" /> Add to Cart</button>
              </div>
            )}

            {/* ট্যাগ */}
            {book.tags?.length > 0 && (<div className="mt-4 flex flex-wrap gap-2"><FiTag className="text-gray-500 mt-0.5" />{book.tags.map((tag, i) => (<span key={i} className="px-2 py-1 bg-white/5 rounded-lg text-gray-400 text-xs">{tag}</span>))}</div>)}
          </div>
        </div>

        {/* রিভিউ সেকশন */}
        <div className="border-t border-white/10 pt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Reviews ({book.reviews?.length || 0})</h2>
          
          {/* রিভিউ ফর্ম */}
          <div className="bg-white/5 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Write a Review</h3>
            <div className="flex items-center gap-4 mb-4"><span className="text-gray-300">Your Rating:</span><div className="flex gap-1">{[...Array(5)].map((_, i) => (<button key={i} onClick={() => setReviewRating(i + 1)}>{i < reviewRating ? <FaStar className="w-6 h-6 text-amber-400" /> : <FaStar className="w-6 h-6 text-gray-600" />}</button>))}</div></div>
            <textarea rows="4" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Share your thoughts about this book..." className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 resize-none"></textarea>
            <button onClick={handleSubmitReview} disabled={submittingReview} className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center gap-2">{submittingReview ? <FiLoader className="w-4 h-4 animate-spin" /> : "Submit Review"}</button>
          </div>

          {/* রিভিউ লিস্ট */}
          <div className="space-y-4">
            {book.reviews?.length > 0 ? book.reviews.map((review, idx) => (<div key={idx} className="bg-white/5 rounded-xl p-5"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center"><FiUser className="w-5 h-5 text-amber-400" /></div><div><p className="text-white font-medium">{review.userName}</p><div className="flex items-center gap-1 mt-1">{renderStars(review.rating, "w-3 h-3")}</div></div></div><span className="text-gray-500 text-sm flex items-center gap-1"><FiCalendar className="w-3 h-3" />{new Date(review.createdAt).toLocaleDateString()}</span></div><p className="text-gray-300 mt-3">{review.comment}</p></div>)) : (<div className="text-center py-8"><FiBookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" /><p className="text-gray-400">No reviews yet. Be the first to review!</p></div>)}
          </div>
        </div>

        {/* রিলেটেড বই */}
        {relatedBooks.length > 0 && (<div className="border-t border-white/10 pt-8 mt-8"><h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2><div className="grid grid-cols-2 sm:grid-cols-4 gap-4">{relatedBooks.map(related => (<Link key={related._id} href={`/books/${related._id}`} className="group bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors"><div className="relative h-40 rounded-lg overflow-hidden mb-2">{related.thumbnail ? <Image src={related.thumbnail} alt={related.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" /> : <div className="w-full h-full bg-white/10 flex items-center justify-center"><FiBookOpen className="w-8 h-8 text-gray-600" /></div>}</div><h3 className="text-white font-medium text-sm line-clamp-1">{related.title}</h3><p className="text-amber-400 font-bold text-sm">${related.discountPrice}</p></Link>))}</div></div>)}
      </div>

      <style jsx>{`.line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }`}</style>
    </div>
  );
};

export default BooksDetailsPage;