"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiBookOpen,
  FiUsers,
  FiStar,
  FiDollarSign,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiShoppingCart,
  FiUserPlus,
  FiBookmark,
  FiMoreVertical,
  FiDownload,
  FiRefreshCw
} from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");


  const stats = [
    { 
      title: "Total Books", 
      value: "2,847", 
      change: "+12.5%", 
      trend: "up", 
      icon: FiBookOpen, 
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    { 
      title: "Active Users", 
      value: "10,234", 
      change: "+8.2%", 
      trend: "up", 
      icon: FiUsers, 
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10"
    },
    { 
      title: "Total Reviews", 
      value: "5,847", 
      change: "+15.3%", 
      trend: "up", 
      icon: FiStar, 
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10"
    },
    { 
      title: "Monthly Revenue", 
      value: "$12,847", 
      change: "-2.1%", 
      trend: "down", 
      icon: FiDollarSign, 
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10"
    },
  ];


  const revenueData = [
    { name: "Jan", revenue: 4000, books: 240, users: 300 },
    { name: "Feb", revenue: 3000, books: 198, users: 320 },
    { name: "Mar", revenue: 5000, books: 300, users: 350 },
    { name: "Apr", revenue: 4500, books: 280, users: 380 },
    { name: "May", revenue: 6000, books: 350, users: 420 },
    { name: "Jun", revenue: 5500, books: 320, users: 450 },
    { name: "Jul", revenue: 7000, books: 420, users: 500 },
    { name: "Aug", revenue: 6500, books: 400, users: 480 },
    { name: "Sep", revenue: 7500, books: 450, users: 520 },
    { name: "Oct", revenue: 8000, books: 480, users: 580 },
    { name: "Nov", revenue: 8500, books: 500, users: 620 },
    { name: "Dec", revenue: 9000, books: 550, users: 700 },
  ];


  const categoryData = [
    { name: "Fiction", value: 35, color: "#F59E0B" },
    { name: "Self-Help", value: 25, color: "#10B981" },
    { name: "Science Fiction", value: 20, color: "#3B82F6" },
    { name: "Others", value: 20, color: "#8B5CF6" },
  ];


  const recentActivities = [
    { id: 1, user: "Sarah Johnson", action: "added a new book", target: "The Midnight Library", time: "2 minutes ago", type: "book" },
    { id: 2, user: "Michael Chen", action: "registered as new user", target: "", time: "15 minutes ago", type: "user" },
    { id: 3, user: "Emily Rodriguez", action: "wrote a review", target: "Atomic Habits", time: "1 hour ago", type: "review" },
    { id: 4, user: "David Kim", action: "purchased", target: "Dune", time: "3 hours ago", type: "purchase" },
    { id: 5, user: "Lisa Wong", action: "added to wishlist", target: "The Silent Patient", time: "5 hours ago", type: "wishlist" },
  ];


  const topBooks = [
    { id: 1, title: "The Midnight Library", author: "Matt Haig", sales: 1243, revenue: "$18,645", trend: "up" },
    { id: 2, title: "Atomic Habits", author: "James Clear", sales: 1156, revenue: "$17,340", trend: "up" },
    { id: 3, title: "Dune", author: "Frank Herbert", sales: 987, revenue: "$14,805", trend: "down" },
    { id: 4, title: "The Silent Patient", author: "Alex Michaelides", sales: 876, revenue: "$13,140", trend: "up" },
    { id: 5, title: "Project Hail Mary", author: "Andy Weir", sales: 654, revenue: "$9,810", trend: "down" },
  ];


  const quickActions = [
    { name: "Add New Book", href: "/admin/books/add", icon: FiBookOpen, color: "from-amber-500 to-orange-600" },
    { name: "Add Category", href: "/admin/categories/add", icon: FiBookmark, color: "from-blue-500 to-cyan-600" },
    { name: "View Users", href: "/admin/users", icon: FiUsers, color: "from-emerald-500 to-teal-600" },
    { name: "Export Data", href: "#", icon: FiDownload, color: "from-purple-500 to-pink-600" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#2A2219] p-3 rounded-xl border border-white/10">
          <p className="text-white text-sm font-semibold">{label}</p>
          <p className="text-amber-400">Revenue: ${payload[0].value}</p>
          <p className="text-blue-400">Books: {payload[1]?.value}</p>
        </div>
      );
    }
    return null;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "book":
        return <FiBookOpen className="w-4 h-4 text-blue-400" />;
      case "user":
        return <FiUserPlus className="w-4 h-4 text-emerald-400" />;
      case "review":
        return <FiStar className="w-4 h-4 text-amber-400" />;
      case "purchase":
        return <FiShoppingCart className="w-4 h-4 text-purple-400" />;
      default:
        return <FiEye className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here&apos;s what&apos;s happening with your store today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl bg-white/10 text-gray-400 hover:text-amber-400 transition-colors">
              <FiRefreshCw className="w-5 h-5" />
            </button>
            <div className="flex gap-1 bg-white/10 rounded-xl p-1">
              {["daily", "weekly", "monthly"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-all duration-300 ${
                    selectedPeriod === period
                      ? "bg-amber-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group relative bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                  {stat.trend === "up" ? <FiArrowUp className="w-3 h-3" /> : <FiArrowDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Revenue Overview</h2>
              <p className="text-gray-400 text-sm">Monthly revenue and book sales</p>
            </div>
            <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-gray-300">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#F59E0B" fillOpacity={1} fill="url(#revenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Category Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: "#666" }}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:border-amber-500/30 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-linear-to-br ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white text-sm font-medium">{action.name}</h3>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity & Top Books */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                <p className="text-gray-400 text-sm">Latest actions on your platform</p>
              </div>
              <Link href="/admin/activities" className="text-amber-400 text-sm hover:text-amber-300">View All</Link>
            </div>
          </div>
          <div className="divide-y divide-white/10">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 flex items-center gap-3 hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                    {activity.target && <span className="text-amber-400"> "{activity.target}"</span>}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <FaRegClock className="w-3 h-3 text-gray-500" />
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </div>
                <FiMoreVertical className="w-4 h-4 text-gray-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Books */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Top Selling Books</h2>
                <p className="text-gray-400 text-sm">Best performers this month</p>
              </div>
              <Link href="/admin/books" className="text-amber-400 text-sm hover:text-amber-300">View All</Link>
            </div>
          </div>
          <div className="divide-y divide-white/10">
            {topBooks.map((book, index) => (
              <div key={book.id} className="p-4 flex items-center gap-3 hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-medium">{book.title}</p>
                    {book.trend === "up" ? <FiArrowUp className="w-3 h-3 text-green-400" /> : <FiArrowDown className="w-3 h-3 text-red-400" />}
                  </div>
                  <p className="text-gray-500 text-xs">{book.author}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-semibold">{book.sales}</p>
                  <p className="text-gray-500 text-xs">sales</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-400 text-sm font-semibold">{book.revenue}</p>
                  <p className="text-gray-500 text-xs">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;