"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Star, Users, Award, ChevronRight, Play, Sparkles, Book, HeadphoneOff, HeadphonesIcon } from "lucide-react";
import { FaBook } from "react-icons/fa";

const Hero = () => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth 3D rotation effect
  useEffect(() => {
    if (!cardRef.current || !isHovering) {
      if (!isHovering) {
        setRotation({ x: 0, y: 0 });
      }
      return;
    }

    const handleMouseMove = (e) => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation (max 8 degrees)
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      
      // Use requestAnimationFrame for smooth animation
      requestAnimationFrame(() => {
        setRotation({ x: rotateX, y: rotateY });
      });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
      setIsHovering(false);
    };

    const element = cardRef.current;
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovering]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#1C1712] via-[#2A2219] to-[#1C1712]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Floating Books Pattern - Hidden on mobile */}
        <div className="hidden md:block absolute inset-0 opacity-10">
          <div className="absolute top-10 left-[10%] animate-float-slow">
            <BookOpen className="w-12 h-12 text-amber-400" />
          </div>
          <div className="absolute top-1/3 right-[15%] animate-float-medium">
            <BookOpen className="w-8 h-8 text-amber-400" />
          </div>
          <div className="absolute bottom-1/4 left-[20%] animate-float-fast">
            <BookOpen className="w-10 h-10 text-amber-400" />
          </div>
          <div className="absolute top-2/3 right-[25%] animate-float-slow">
            <BookOpen className="w-6 h-6 text-amber-400" />
          </div>
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #F59E0B 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          

          <div className="text-center lg:text-left space-y-6 sm:space-y-8 order-1 lg:order-0">

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Explore Millions of </span>
              <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Books
              </span>
              <span className="text-white"> at Your Fingertips</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Join thousands of book lovers who discover, read, and share their favorite books. 
              Access unlimited reading materials from our vast digital library.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 pt-2 sm:pt-4">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl font-bold text-white">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                  <span>50K+</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">Active Readers</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl font-bold text-white">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                  <span>100K+</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">Books Available</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl font-bold text-white">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                  <span>4.9</span>
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                </div>
                <p className="text-xs sm:text-sm text-gray-500">User Rating</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4">
              <Link
                href="/register"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-amber-500 to-orange-600 rounded-xl text-white font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold text-base sm:text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </span>
              </button>
            </div>

            {/* Trusted By - Hidden on mobile */}
            <div className="hidden sm:block pt-6 sm:pt-8">
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 text-center lg:text-left">Trusted by leading companies</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 opacity-60">
                <span className="text-gray-400 font-semibold text-sm sm:text-lg">TechCorp</span>
                <span className="text-gray-400 font-semibold text-sm sm:text-lg">BookHub</span>
                <span className="text-gray-400 font-semibold text-sm sm:text-lg">Readify</span>
                <span className="text-gray-400 font-semibold text-sm sm:text-lg">Libra</span>
              </div>
            </div>
          </div>

          {/* ========== RIGHT CONTENT (Book Stack Image) ========== */}
          <div className="order-2 lg:order-0 w-full max-w-md lg:max-w-none mx-auto">
            <div 
              ref={cardRef}
              onMouseEnter={() => setIsHovering(true)}
              className="relative transition-all duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* Main Book Stack Card */}
              <div className="relative bg-linear-to-br from-[#2A2219] to-[#1C1712] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-amber-500/20 shadow-2xl">
                
                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-16 h-16 sm:w-20 sm:h-20 bg-amber-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-16 h-16 sm:w-20 sm:h-20 bg-orange-500/20 rounded-full blur-2xl"></div>

                {/* Book Stack Images */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Book 1 - Top */}
                  <div className="relative group cursor-pointer">
                    <div className="absolute -left-1 sm:-left-2 top-1/2 -translate-y-1/2 w-6 h-12 sm:w-8 sm:h-16 bg-amber-500/20 rounded-l-lg"></div>
                    <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl transform rotate-1 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-16 sm:w-16 sm:h-20 bg-white/10 rounded-lg flex items-center justify-center">
                          <span className="text-2xl sm:text-3xl"><FaBook /></span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-sm sm:text-base truncate">The Midnight Library</h3>
                          <p className="text-gray-300 text-xs sm:text-sm">Matt Haig</p>
                          <div className="hidden sm:flex items-center gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* Book 2 - Middle */}
                  <div className="relative group cursor-pointer">
                    <div className="absolute -left-1 sm:-left-2 top-1/2 -translate-y-1/2 w-6 h-12 sm:w-8 sm:h-16 bg-amber-500/20 rounded-l-lg"></div>
                    <div className="bg-linear-to-r from-emerald-600 to-teal-600 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl transform -rotate-1 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-16 sm:w-16 sm:h-20 bg-white/10 rounded-lg flex items-center justify-center">
                          <span className="text-2xl sm:text-3xl"><Book /></span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-sm sm:text-base truncate">Atomic Habits</h3>
                          <p className="text-gray-300 text-xs sm:text-sm">James Clear</p>
                          <div className="hidden sm:flex items-center gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* Book 3 - Bottom */}
                  <div className="relative group cursor-pointer">
                    <div className="absolute -left-1 sm:-left-2 top-1/2 -translate-y-1/2 w-6 h-12 sm:w-8 sm:h-16 bg-amber-500/20 rounded-l-lg"></div>
                    <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl transform rotate-1 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-16 sm:w-16 sm:h-20 bg-white/10 rounded-lg flex items-center justify-center">
                          <span className="text-2xl sm:text-3xl"><HeadphonesIcon /></span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-sm sm:text-base truncate">Audio Books</h3>
                          <p className="text-gray-300 text-xs sm:text-sm">Listen Anytime</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span className="text-[10px] sm:text-xs text-amber-400">New Feature</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info Card */}
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-500/10 rounded-lg sm:rounded-xl border border-amber-500/20">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-amber-400 text-[10px] sm:text-xs font-semibold">Limited Time Offer</p>
                      <p className="text-white text-base sm:text-lg font-bold">Get 30% Off</p>
                      <p className="text-gray-400 text-[10px] sm:text-xs hidden sm:block">on yearly subscription</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl sm:text-2xl font-bold text-white">$9.99</p>
                      <p className="text-gray-500 text-xs sm:text-sm line-through">$14.99</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-5 -right-3 sm:-top-10 sm:-right-10 animate-bounce-slow">
                <div className="bg-amber-500/10 backdrop-blur-sm rounded-full p-2 sm:p-3 border border-amber-500/20">
                  <Award className="w-5 h-5 sm:w-8 sm:h-8 text-amber-400" />
                </div>
              </div>
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
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;