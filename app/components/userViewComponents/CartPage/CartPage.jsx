"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingCart,
  FiArrowRight,
  FiLoader,
  FiBookOpen
} from "react-icons/fi";
import Swal from "sweetalert2";

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // কার্ট লোড করা
  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  // কোয়ান্টিটি আপডেট করা
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(true);
    const updatedCart = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setUpdating(false);
  };

  // আইটেম রিমুভ করা
  const removeItem = (itemId, itemTitle) => {
    Swal.fire({
      title: "Remove Item?",
      text: `Remove "${itemTitle}" from your cart?`,
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
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        
        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Item removed from cart",
          timer: 1500,
          showConfirmButton: false,
          background: "#2A2219",
          color: "#fff",
        });
      }
    });
  };

  // কার্ট ক্লিয়ার করা
  const clearCart = () => {
    if (cartItems.length === 0) return;
    
    Swal.fire({
      title: "Clear Cart?",
      text: "Are you sure you want to remove all items from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, clear all",
      cancelButtonText: "Cancel",
      background: "#2A2219",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("cart", JSON.stringify([]));
        setCartItems([]);
        Swal.fire({
          icon: "success",
          title: "Cleared!",
          text: "Cart has been cleared",
          timer: 1500,
          showConfirmButton: false,
          background: "#2A2219",
          color: "#fff",
        });
      }
    });
  };

  // অর্ডার সামারি ক্যালকুলেশন
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 50 ? 0 : 0;
  const tax = subtotal * 0;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart Empty",
        text: "Add some items to your cart before checkout",
        background: "#2A2219",
        color: "#fff",
      });
      return;
    }
    
    Swal.fire({
      icon: "info",
      title: "Coming Soon!",
      text: "Checkout functionality will be available soon.",
      background: "#2A2219",
      color: "#fff",
      confirmButtonColor: "#F59E0B",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* হেডার */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
            <FiShoppingCart className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm text-amber-400 font-medium">My Cart</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">Shopping </span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">Cart</span>
          </h1>
          <p className="text-gray-400 mt-2">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          // খালি কার্ট
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
              <FiShoppingCart className="w-16 h-16 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't added any items yet</p>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
            >
              Continue Shopping <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* বাম সাইড - কার্ট আইটেম */}
            <div className="lg:col-span-2 space-y-4">
              {/* ক্লিয়ার কার্ট বাটন */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" /> Clear Cart
                </button>
              </div>
              
              {/* আইটেম লিস্ট */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-4 hover:border-amber-500/30 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* ইমেজ */}
                      <div className="relative w-28 h-36 flex-shrink-0 rounded-xl overflow-hidden bg-white/5">
                        {item.thumbnail ? (
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FiBookOpen className="w-8 h-8 text-gray-600" />
                          </div>
                        )}
                      </div>
                      
                      {/* আইটেম তথ্য */}
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between gap-2">
                          <div>
                            <Link href={`/books/${item.id}`}>
                              <h3 className="text-lg font-bold text-white hover:text-amber-400 transition-colors line-clamp-1">
                                {item.title}
                              </h3>
                            </Link>
                            <p className="text-gray-400 text-sm mt-1">Unit Price: ${item.price.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.title)}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            title="Remove"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* কোয়ান্টিটি কন্ট্রোল */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-sm">Quantity:</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                disabled={updating}
                                className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-50"
                              >
                                <FiMinus className="w-4 h-4 mx-auto" />
                              </button>
                              <span className="text-white w-8 text-center">{item.quantity || 1}</span>
                              <button
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                disabled={updating}
                                className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-50"
                              >
                                <FiPlus className="w-4 h-4 mx-auto" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-amber-400 font-bold text-lg">
                              ${((item.price * (item.quantity || 1)).toFixed(2))}
                            </p>
                            {item.originalPrice > item.price && (
                              <p className="text-gray-500 text-xs line-through">
                                ${(item.originalPrice * (item.quantity || 1)).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ডান সাইড - অর্ডার সামারি */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-white/10">
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-white">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax (10%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-white">Total</span>
                      <span className="text-2xl font-bold text-amber-400">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {shipping > 0 && subtotal < 50 && (
                  <div className="mb-4 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <p className="text-amber-400 text-sm text-center">
                      Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                    </p>
                  </div>
                )}
                
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <FiArrowRight className="w-4 h-4" />
                </button>
                
                <Link
                  href="/browse"
                  className="block text-center text-gray-400 hover:text-amber-400 text-sm mt-4 transition-colors"
                >
                  Continue Shopping
                </Link>
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

export default CartPage;