"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FiHome, 
  FiArrowLeft, 
  FiLock, 
  FiShield,
  FiMail,
  FiHelpCircle
} from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";

const AccessDeniedPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center px-4 relative overflow-hidden">


      <div className="relative z-10 max-w-md w-full text-center">
        {/* Animated Lock Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-red-500/20 to-amber-500/20 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-24 h-24 bg-linear-to-br from-red-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl">
              <FiLock className="w-12 h-12 text-white" />
            </div>
          </div>
          {/* Floating Shield Icon */}
          <div className="absolute -top-2 -right-8 animate-bounce-slow">
            <div className="w-12 h-12 bg-amber-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-500/30">
              <FaUserShield className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-8xl sm:text-9xl font-bold bg-linear-to-r from-red-500 via-amber-500 to-red-500 bg-clip-text text-transparent animate-pulse">
            403
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Access Denied
        </h2>

        {/* Description */}
        <div className="space-y-3 mb-8">
          <p className="text-gray-400">
            You don&apos;t have permission to access this page.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20">
            <FiShield className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400">Administrator access required</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300 group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/25 group"
          >
            <FiHome className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Back to Home
          </Link>
        </div>

        {/* Help Section */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-gray-500 text-sm mb-3">
            Need access? Contact your administrator
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm group"
          >
            <FiMail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Contact Support
            <FiHelpCircle className="w-3 h-3" />
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
            <span>If you believe this is an error</span>
            <span>•</span>
            <span>Please check your login credentials</span>
            <span>•</span>
            <span>Or request admin privileges</span>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AccessDeniedPage;