"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Menu, X, User, LogOut, Settings, LayoutDashboard, 
  ChevronDown, BookOpen, Home, Compass, Info, 
  Grid3x3, PlusCircle, BookMarked, Sparkles 
} from "lucide-react";
import useAuth from "@/app/hooks/useAuth";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  
  // State Management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);
  
  // Navigation Links Configuration with Icons
  const publicLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Browse", href: "/browse", icon: Compass },
    { name: "About", href: "/about", icon: Info },
    { name: "Categories", href: "/categories", icon: Grid3x3 },
  ];
  
  const privateLinks = [
    { name: "Add Book", href: "/add-book", icon: PlusCircle },
    { name: "Manage Books", href: "/manage-books", icon: BookMarked },
  ];
  
  // Handle logout
  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    router.push("/");
  };
  
  // Dropdown menu items
  const dropdownItems = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Settings", href: "/settings", icon: Settings },
  ];
  
  // Check if link is active
  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
  
  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-[#1C1712]/95 backdrop-blur-xl shadow-2xl" 
            : "bg-linear-to-r from-[#1C1712] to-[#2A2219]"
        }`}
      >
        <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* ========== LEFT: Logo with Animation ========== */}
            <div className="shrink-0 group">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative">
                  <BookOpen className="w-7 h-7 lg:w-8 lg:h-8 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
                  <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <span className="text-xl lg:text-2xl font-bold bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  BookShelf
                </span>
              </Link>
            </div>
            

            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {/* Public Links */}
              {publicLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                      active
                        ? "text-amber-400 bg-amber-400/10"
                        : "text-gray-300 hover:text-amber-400 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                        active ? "text-amber-400" : ""
                      }`} />
                      <span>{link.name}</span>
                    </div>
                    {active && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-linear-to-r from-amber-400 to-orange-400 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
              
              {/* Private Links (only when logged in) */}
              {user && !loading && (
                <>
                  <div className="w-px h-6 bg-linear-to-b from-transparent via-gray-600 to-transparent mx-1"></div>
                  {privateLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`relative px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                          active
                            ? "text-amber-400 bg-amber-400/10"
                            : "text-gray-300 hover:text-amber-400 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                            active ? "text-amber-400" : ""
                          }`} />
                          <span>{link.name}</span>
                        </div>
                        {active && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-linear-to-r from-amber-400 to-orange-400 rounded-full"></div>
                        )}
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
            

            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                // Loading state
                <div className="w-24 h-9 bg-white/10 rounded-xl animate-pulse"></div>
              ) : user ? (
                // Logged In - User Menu Dropdown
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 focus:outline-none group px-2 py-1.5 rounded-xl hover:bg-white/5 transition-all duration-300"
                  >
                    {/* Profile Picture with Ring */}
                    <div className="relative">
                      {user.profilePicture ? (
                        <Image
                          src={user.profilePicture}
                          alt={user.fullName}
                          width={100}
                          height={100}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-500/50 group-hover:ring-amber-500 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold ring-2 ring-amber-500/50 group-hover:ring-amber-500 transition-all duration-300">
                          {user.fullName?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1C1712]"></div>
                    </div>
                    
                    {/* User Name */}
                    <span className="text-sm font-medium text-gray-200 group-hover:text-amber-400 transition-colors duration-300">
                      {user.fullName?.split(" ")[0] || "User"}
                    </span>
                    
                    {/* Dropdown Icon */}
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-all duration-300 ${
                        isDropdownOpen ? "rotate-180 text-amber-400" : ""
                      }`}
                    />
                  </button>
                  
                  {/* Dropdown Menu with Animation */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-linear-to-br from-[#2A2219] to-[#1C1712] rounded-2xl shadow-2xl py-2 border border-amber-500/20 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
                      {/* User Info Section */}
                      <div className="px-4 py-3 border-b border-amber-500/20">
                        <p className="text-sm font-semibold text-white">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      
                      {/* Dropdown Items */}
                      {dropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:text-amber-400 hover:bg-white/5 transition-all duration-200 group"
                        >
                          <item.icon className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                          {item.name}
                        </Link>
                      ))}
                      
                      {/* Divider */}
                      <div className="border-t border-amber-500/20 my-1"></div>
                      
                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
                      >
                        <LogOut className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Not Logged In - Auth Buttons
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-amber-400 transition-all duration-300 rounded-xl hover:bg-white/5"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2 text-sm font-medium text-white bg-linear-to-r from-amber-500 to-orange-600 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 transform hover:scale-105"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
            

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-300 group-hover:text-amber-400 transition-colors duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div
        className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-all duration-500 ease-out transform ${
          isMobileMenuOpen 
            ? "translate-y-0 opacity-100 visible" 
            : "translate-y-full opacity-0 invisible"
        }`}
        style={{
          height: "70vh",
          top: "auto", 
        }}
      >

        <div className="w-full flex justify-center pt-2 pb-1">
          <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
        </div>
        
        <div className="h-full bg-linear-to-br from-[#1C1712] to-[#2A2219] overflow-y-auto rounded-t-3xl shadow-2xl">
          <div className="px-4 py-4 space-y-2">
            {/* Public Links */}
            {publicLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    active
                      ? "bg-amber-400/10 text-amber-400 border-l-4 border-amber-400"
                      : "text-gray-300 hover:text-amber-400 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? "text-amber-400" : ""}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            
            {/* Private Links (Mobile) */}
            {user && !loading && (
              <>
                <div className="h-px bg-linear-to-r from-transparent via-gray-600 to-transparent my-3"></div>
                {privateLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                        active
                          ? "bg-amber-400/10 text-amber-400 border-l-4 border-amber-400"
                          : "text-gray-300 hover:text-amber-400 hover:bg-white/5"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? "text-amber-400" : ""}`} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </>
            )}
            
            {/* Mobile Auth Section */}
            <div className="h-px bg-linear-to-r from-transparent via-gray-600 to-transparent my-3"></div>
            
            {user ? (
              // Logged In - Mobile User Info
              <div className="space-y-2">
                <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-xl">
                  {user.profilePicture ? (
                    <Image
                      src={user.profilePicture}
                      alt={user.fullName}
                      width={100}
                      height={100}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold text-lg ring-2 ring-amber-500">
                      {user.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                
                {/* Mobile Dropdown Items */}
                {dropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base text-gray-300 hover:text-amber-400 hover:bg-white/5 transition-all duration-300"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                {/* Mobile Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full space-x-3 px-4 py-3 rounded-xl text-base text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              // Not Logged In - Mobile Auth Buttons
              <div className="space-y-3 px-4">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 text-base font-medium text-gray-300 border border-gray-600 rounded-xl hover:text-amber-400 hover:border-amber-400 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 text-base font-medium text-white bg-linear-to-r from-amber-500 to-orange-600 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;