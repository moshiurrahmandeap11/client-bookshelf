"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiUserX,
  FiUser,
  FiLoader,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiCalendar,
  FiMoreVertical
} from "react-icons/fi";
import { FaUserShield, FaUserCog } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstance from "@/app/components/sharedComponents/axiosInstance/axiosInstance";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "user",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });


  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(`/users/users/?page=${page}&limit=10`);
      if (response.data.success) {
        setUsers(response.data.data);
        setPagination({
          currentPage: response.data.pagination?.currentPage || page,
          totalPages: response.data.pagination?.totalPages || 1,
          totalItems: response.data.pagination?.totalItems || response.data.data.length,
        });
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      showErrorToast("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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


  const confirmDelete = (user) => {
    Swal.fire({
      title: "Delete User?",
      html: `Are you sure you want to delete <strong>${user.fullName}</strong>?<br/>This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete user",
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
        await handleDelete(user._id);
      }
    });
  };


  const confirmRoleChange = (user, newRole) => {
    Swal.fire({
      title: "Change Role?",
      html: `Change <strong>${user.fullName}</strong>'s role from <strong>${user.role}</strong> to <strong>${newRole}</strong>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#F59E0B",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, change role",
      cancelButtonText: "Cancel",
      background: "#2A2219",
      color: "#fff",
      iconColor: "#F59E0B",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleRoleChange(user._id, newRole);
      }
    });
  };


  const handleDelete = async (userId) => {
    try {
      const response = await axiosInstance.delete(`/users/users/${userId}`);
      if (response.data.success) {
        showSuccessToast("User deleted successfully");
        fetchUsers(pagination.currentPage);
      }
    } catch (error) {
      console.error("Delete error:", error);
      showErrorToast(error.response?.data?.message || "Failed to delete user");
    }
  };


  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axiosInstance.put(`/users/users/${userId}/role`, { role: newRole });
      if (response.data.success) {
        showSuccessToast(`User role changed to ${newRole}`);
        fetchUsers(pagination.currentPage);
      }
    } catch (error) {
      console.error("Role change error:", error);
      showErrorToast(error.response?.data?.message || "Failed to change role");
    }
  };


  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
    setIsEditModalOpen(true);
  };


  const handleUpdate = async () => {
    if (!formData.fullName || !formData.email) {
      showErrorToast("Name and email are required");
      return;
    }

    try {
      const response = await axiosInstance.put(`/users/users/${selectedUser._id}`, {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
      });
      
      if (response.data.success) {
        showSuccessToast("User updated successfully");
        setIsEditModalOpen(false);
        fetchUsers(pagination.currentPage);
      }
    } catch (error) {
      console.error("Update error:", error);
      showErrorToast(error.response?.data?.message || "Failed to update user");
    }
  };


  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const getRoleBadge = (role) => {
    if (role === "admin") {
      return { bg: "bg-amber-500/20", text: "text-amber-400", icon: <FaUserShield className="w-3 h-3" /> };
    }
    return { bg: "bg-gray-500/20", text: "text-gray-400", icon: <FiUser className="w-3 h-3" /> };
  };

  return (
    <div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Users Management</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your platform users</p>
        </div>
        <div className="text-sm text-gray-500">
          Total Users: {pagination.totalItems}
        </div>
      </div>


      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>


      {loading ? (
        <div className="flex justify-center py-20">
          <FiLoader className="w-8 h-8 text-amber-400 animate-spin" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-3 w-12">#</th>
                  <th className="pb-3">User</th>
                  <th className="pb-3 hidden md:table-cell">Email</th>
                  <th className="pb-3 w-24">Role</th>
                  <th className="pb-3 hidden lg:table-cell">Status</th>
                  <th className="pb-3 hidden lg:table-cell">Joined</th>
                  <th className="pb-3 w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => {
                  const roleBadge = getRoleBadge(user.role);
                  const isAdmin = user.role === "admin";
                  
                  return (
                    <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 text-gray-500 text-sm">
                        {(pagination.currentPage - 1) * 10 + index + 1}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          {user.profilePicture ? (
                            <Image
                              src={user.profilePicture}
                              alt={user.fullName}
                              width={36}
                              height={36}
                              className="w-9 h-9 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold">
                              {user.fullName?.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="text-white font-medium">{user.fullName}</p>
                            <p className="text-gray-500 text-xs md:hidden">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <FiMail className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-300 text-sm">{user.email}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${roleBadge.bg} ${roleBadge.text}`}>
                            {roleBadge.icon}
                            {user.role}
                          </span>
                          {!isAdmin && (
                            <button
                              onClick={() => confirmRoleChange(user, "admin")}
                              className="p-1 rounded-lg hover:bg-white/10 text-gray-500 hover:text-amber-400 transition-colors"
                              title="Make Admin"
                            >
                              <FaUserCog className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {isAdmin && user.email !== "moshiurrahmandeap@gmail.com" && (
                            <button
                              onClick={() => confirmRoleChange(user, "user")}
                              className="p-1 rounded-lg hover:bg-white/10 text-gray-500 hover:text-gray-300 transition-colors"
                              title="Remove Admin"
                            >
                              <FiUserX className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-3 hidden lg:table-cell">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-green-400" : "bg-red-400"}`}></span>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <FiCalendar className="w-3 h-3" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(user)}
                            className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                            title="Edit User"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => confirmDelete(user)}
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            title="Delete User"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>


          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => fetchUsers(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 text-white">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchUsers(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}


      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-linear-to-br from-[#2A2219] to-[#1C1712] rounded-2xl w-full max-w-md border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Edit User</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <FiMoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-4">

              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                {selectedUser.profilePicture ? (
                  <Image
                    src={selectedUser.profilePicture}
                    alt={selectedUser.fullName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                    {selectedUser.fullName?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">Editing: {selectedUser.fullName}</p>
                  <p className="text-gray-500 text-xs">User ID: {selectedUser._id}</p>
                </div>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 p-5 pt-0">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 px-4 py-2 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;