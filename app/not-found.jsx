"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FiHome, 
  FiArrowLeft, 
  FiSearch,
  FiBookOpen,
  FiCompass,
  FiHelpCircle,
  FiMail,
  FiAlertCircle
} from "react-icons/fi";
import { FaBook, FaQuestionCircle } from "react-icons/fa";

const NotFoundPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const suggestedLinks = [
    { name: "Home", href: "/", icon: FiHome },
    { name: "Browse Books", href: "/browse", icon: FiBookOpen },
    { name: "Categories", href: "/categories", icon: FiCompass },
    { name: "Contact Us", href: "/contact", icon: FiMail },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center px-4 relative overflow-hidden">

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="relative inline-block">
            {/* Animated Numbers */}
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="relative">
                <div className="text-8xl sm:text-9xl md:text-[10rem] font-bold bg-linear-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent animate-pulse">
                  4
                </div>
              </div>
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center animate-bounce-slow">
                  <FaQuestionCircle className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400" />
                </div>
              </div>
              <div className="relative">
                <div className="text-8xl sm:text-9xl md:text-[10rem] font-bold bg-linear-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent animate-pulse">
                  4
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <div className="space-y-3 mb-8">
          <p className="text-gray-400 text-base sm:text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full border border-amber-500/20">
            <FiSearch className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-gray-300">
              You might have mistyped the address or the page may have moved
            </span>
          </div>
        </div>

        {/* Auto Redirect Info */}
        <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <FiArrowLeft className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-gray-400">
              Redirecting to homepage in <span className="text-amber-400 font-bold">{countdown}</span> seconds
            </p>
          </div>
          <div className="mt-3 w-full bg-white/10 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-linear-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 10) * 100}%` }}
            ></div>
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

        {/* Suggested Links */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4">You might want to try these pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {suggestedLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300 group text-sm"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-400 transition-colors text-sm group"
          >
            <FiHelpCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Still need help? Contact Support
          </Link>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default NotFoundPage;