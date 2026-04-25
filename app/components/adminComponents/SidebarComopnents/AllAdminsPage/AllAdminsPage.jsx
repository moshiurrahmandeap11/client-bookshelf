"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiSearch,
  FiUserX,
  FiLoader,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiCalendar,
  FiShield,
  FiStar,
  FiAward,
  FiUsers
} from "react-icons/fi";
import { FaUserShield, FaUserCog, FaCrown } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstance from "@/app/components/sharedComponents/axiosInstance/axiosInstance";
import { TbUserShield } from "react-icons/tb";


const AllAdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });


  const fetchAdmins = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/users/users?page=${page}&limit=10`);
      if (response.data.success) {

        const adminUsers = response.data.data.filter(user => user.role === "admin");
        setAdmins(adminUsers);
        setPagination({
          currentPage: page,
          totalPages: Math.ceil(adminUsers.length / 10) || 1,
          totalItems: adminUsers.length,
        });
      }
    } catch (error) {
      console.error("Fetch admins error:", error);
      showErrorToast("Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);


  const showSuccessToast = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message,
      timer: 2000,
      showConfirmButton: false,
      background: "#2A2219",
      color: "#fff",
      iconColor: "#F59E0B",
    });
  };

  const showErrorToast = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: message,
      timer: 2000,
      showConfirmButton: false,
      background: "#2A2219",
      color: "#fff",
      iconColor: "#EF4444",
    });
  };


  const confirmDelete = (admin) => {
    Swal.fire({
      title: "Remove Admin?",
      html: `Are you sure you want to remove <strong>${admin.fullName}</strong> from admin role?<br/>This action can be undone later.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, remove admin",
      cancelButtonText: "Cancel",
      background: "#2A2219",
      color: "#fff",
      iconColor: "#F59E0B",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "px-4 py-2 rounded-xl font-semibold",
        cancelButton: "px-4 py-2 rounded-xl font-semibold",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleRoleChange(admin._id, "user");
      }
    });
  };


  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axiosInstance.put(`/users/${userId}/role`, { role: newRole });
      if (response.data.success) {
        showSuccessToast(`Admin removed successfully`);
        fetchAdmins(pagination.currentPage);
      }
    } catch (error) {
      console.error("Role change error:", error);
      showErrorToast(error.response?.data?.message || "Failed to change role");
    }
  };


  const filteredAdmins = admins.filter(admin =>
    admin.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const paginatedAdmins = filteredAdmins.slice(
    (pagination.currentPage - 1) * 10,
    pagination.currentPage * 10
  );

  const getAdminBadge = (email) => {
    if (email === "moshiurrahmandeap@gmail.com") {
      return { 
        bg: "bg-gradient-to-r from-amber-500/30 to-orange-500/30", 
        text: "text-amber-400", 
        icon: <FaCrown className="w-3 h-3" />,
        label: "Super Admin"
      };
    }
    return { 
      bg: "bg-amber-500/20", 
      text: "text-amber-400", 
      icon: <FaUserShield className="w-3 h-3" />,
      label: "Admin"
    };
  };

  return (
    <div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <FaUserShield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Management</h1>
              <p className="text-gray-400 text-sm mt-1">Manage platform administrators</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20">
            <FiUsers className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-gray-300">Total Admins: {pagination.totalItems}</span>
          </div>
          <Link
            href="/admin/users"
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300 text-sm"
          >
            View All Users
          </Link>
        </div>
      </div>


      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search admins by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <FiLoader className="w-8 h-8 text-amber-400 animate-spin" />
        </div>
      ) : filteredAdmins.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
            <TbUserShield className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl text-white mb-2">No Admins Found</h3>
          <p className="text-gray-400">No administrators match your search criteria</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-3 w-12">#</th>
                  <th className="pb-3">Admin</th>
                  <th className="pb-3 hidden md:table-cell">Email</th>
                  <th className="pb-3 w-28">Role</th>
                  <th className="pb-3 hidden lg:table-cell">Joined</th>
                  <th className="pb-3 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAdmins.map((admin, index) => {
                  const adminBadge = getAdminBadge(admin.email);
                  const isSuperAdmin = admin.email === "moshiurrahmandeap@gmail.com";
                  
                  return (
                    <tr key={admin._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-3 text-gray-500 text-sm">
                        {(pagination.currentPage - 1) * 10 + index + 1}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          {admin.profilePicture ? (
                            <Image
                              src={admin.profilePicture}
                              alt={admin.fullName}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/30"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold ring-2 ring-amber-500/30">
                              {admin.fullName?.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="text-white font-medium flex items-center gap-1">
                              {admin.fullName}
                              {isSuperAdmin && (
                                <span className="ml-1 px-1.5 py-0.5 bg-amber-500/20 rounded text-[10px] text-amber-400">
                                  Super
                                </span>
                              )}
                            </p>
                            <p className="text-gray-500 text-xs md:hidden">{admin.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <FiMail className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-300 text-sm">{admin.email}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${adminBadge.bg} ${adminBadge.text}`}>
                          {adminBadge.icon}
                          {adminBadge.label}
                        </span>
                      </td>
                      <td className="py-3 hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <FiCalendar className="w-3 h-3" />
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-3">
                        {!isSuperAdmin && (
                          <button
                            onClick={() => confirmDelete(admin)}
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors opacity-0 group-hover:opacity-100"
                            title="Remove Admin"
                          >
                            <FiUserX className="w-4 h-4" />
                          </button>
                        )}
                        {isSuperAdmin && (
                          <span className="text-xs text-gray-500">Protected</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* পেজিনেশন */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                disabled={pagination.currentPage === 1}
                className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 text-white">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllAdminsPage;