"use client";

import React from "react";
import Link from "next/link";
import { 
  FiArrowRight, 
  FiChevronRight
} from "react-icons/fi";

const OfferingToJoin = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10"></div>
        

        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #F59E0B 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card */}
        <div className="relative bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">

          {/* Content */}
          <div className="text-center py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12">

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-white">Start Your </span>
              <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Reading Journey
              </span>
              <span className="text-white"> Today</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 leading-relaxed">
              Join thousands of book lovers who use BookShelf to organize, discover, and enjoy reading.
            </p>

            {/* CTA Button with Animation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/register"
                className="group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-linear-to-r from-amber-500 to-orange-600 rounded-xl text-white font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create Free Account
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              {/* Optional: Learn More Link */}
              <Link
                href="/about"
                className="group flex items-center gap-2 px-6 py-3 text-gray-300 hover:text-amber-400 transition-colors duration-300"
              >
                <span>Learn More</span>
                <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
        <svg
          className="relative block w-full h-8 sm:h-12"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="#1C1712"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
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
    </section>
  );
};

export default OfferingToJoin;