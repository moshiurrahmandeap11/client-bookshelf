
"use client";

import React, { useState } from "react";

import useAuth from "@/app/hooks/useAuth";
import { FiLoader } from "react-icons/fi";
import AdminProtected from "../components/sharedComponents/AdminProtected/AdminProtected";
import HeaderAdmin from "../components/adminComponents/HeaderAdmin/HeaderAdmin";
import Sidebar from "../components/adminComponents/Sidebar/Sidebar";

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-linear-to-br from-[#1C1712] to-[#0F0D0A]">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <main
          className={`transition-all duration-300 ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}
        >
          <HeaderAdmin setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </div>
    </AdminProtected>
  );
}
