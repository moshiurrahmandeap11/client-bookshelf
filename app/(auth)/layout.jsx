"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";

export default function AuthLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1C1712] via-[#2A2219] to-[#1C1712] flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header with Logo */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="flex items-center justify-center md:justify-start space-x-2 group">
            <div className="relative">
              <BookOpen className="w-8 h-8 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              BookShelf
            </span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Card Container with Animation */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6 sm:p-8 transform transition-all duration-500 hover:shadow-amber-500/10">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-6">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} BookShelf. All rights reserved.
        </p>
      </div>
    </div>
  );
}