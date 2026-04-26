"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiSearch,
  FiChevronDown,

  FiLogOut,
  FiUserCheck,
} from "react-icons/fi";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";

const HeaderAdmin = ({ setMobileOpen, mobileOpen }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const getPageTitle = () => {
    const path = pathname.split("/").pop();
    if (path === "admin") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
  };

  const notifications = [
    { id: 1, title: "New user registered", time: "2 min ago", read: false },
    { id: 2, title: "Book added: Atomic Habits", time: "1 hour ago", read: false },
    { id: 3, title: "New review received", time: "3 hours ago", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-[#1C1712]/95 backdrop-blur-xl border-b border-white/10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Mobile Menu Button & Page Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 text-gray-400 hover:text-amber-400 transition-colors"
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-white capitalize">
                {getPageTitle()}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Welcome back, {user?.fullName?.split(" ")[0] || "Admin"}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Button (Mobile) */}
            <button className="lg:hidden p-2 rounded-xl bg-white/10 text-gray-400 hover:text-amber-400 transition-colors">
              <FiSearch className="w-5 h-5" />
            </button>



            {/* Time Display */}
            <div className="hidden md:block text-sm text-gray-400">{currentTime}</div>


            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                  
                  { <img src={user?.profilePicture} alt={user?.fullName} className="w-full h-full rounded-full" /> || user?.fullName?.charAt(0).toUpperCase() || "A"}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-white text-sm font-medium">{user?.fullName?.split(" ")[0] || "Admin"}</p>
                  <p className="text-amber-400 text-xs">Admin</p>
                </div>
                <FiChevronDown className={`hidden md:block w-4 h-4 text-gray-400 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-[#2A2219] rounded-2xl shadow-2xl border border-white/10 z-50">
                  <div className="p-3 border-b border-white/10">
                    <p className="text-white font-medium">{user?.fullName}</p>
                    <p className="text-gray-400 text-xs">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-amber-400 hover:bg-white/5 transition-colors">
                      <FiUserCheck className="w-4 h-4" />
                      <span className="text-sm">My Profile</span>
                    </Link>
                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                      <FiLogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;