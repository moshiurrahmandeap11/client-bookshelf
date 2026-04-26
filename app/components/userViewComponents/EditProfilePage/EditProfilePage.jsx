"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FiUser,
  FiMail,
  FiLock,
  FiUpload,
  FiX,
  FiLoader,
  FiSave,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import Swal from "sweetalert2";
import useAuth from "@/app/hooks/useAuth";
import axiosInstance from "../../sharedComponents/axiosInstance/axiosInstance";

const EditProfilePage = () => {
  const router = useRouter();
  const params = useParams();
  const { user, loading: authLoading, refetchUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.email || "",
      }));
      if (user.profilePicture) {
        setProfilePicturePreview(user.profilePicture);
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Image size must be less than 2MB",
          background: "#2A2219",
          color: "#fff",
        });
        return;
      }
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    setProfilePicturePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Name and email are required",
        background: "#2A2219",
        color: "#fff",
      });
      return;
    }

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmNewPassword
    ) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "New passwords do not match",
        background: "#2A2219",
        color: "#fff",
      });
      return;
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Password must be at least 6 characters",
        background: "#2A2219",
        color: "#fff",
      });
      return;
    }

    setLoading(true);
    const submitData = new FormData();
    submitData.append("fullName", formData.fullName);
    if (formData.currentPassword)
      submitData.append("currentPassword", formData.currentPassword);
    if (formData.newPassword)
      submitData.append("newPassword", formData.newPassword);
    if (formData.confirmNewPassword)
      submitData.append("confirmNewPassword", formData.confirmNewPassword);
    if (profilePicture) submitData.append("profilePicture", profilePicture);

    try {
      const response = await axiosInstance.put("/users/edit", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        await refetchUser();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Profile updated successfully",
          timer: 2000,
          showConfirmButton: false,
          background: "#2A2219",
          color: "#fff",
        });
        router.push("/profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to update profile",
        background: "#2A2219",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <FiLoader className="w-8 h-8 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/profile"
            className="p-2 rounded-lg bg-white/10 text-gray-400 hover:text-amber-400 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Edit Profile
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Update your personal information
            </p>
          </div>
        </div>


        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <label className="block text-white font-medium mb-3">
              Profile Picture
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                {profilePicturePreview ? (
                  <div className="relative">
                    <Image
                      src={profilePicturePreview}
                      alt="Profile"
                      width={100}
                      height={100}
                      className="w-24 h-24 rounded-full object-cover ring-2 ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={removeProfilePicture}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-3xl font-bold">
                    {user.fullName?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <label className="cursor-pointer px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:text-amber-400 transition-colors text-sm flex items-center gap-2">
                <FiUpload className="w-4 h-4" /> Upload New Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-gray-500 text-xs mt-3">PNG, JPG up to 2MB</p>
          </div>


          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
              Basic Information
            </h2>

            <div>
              <label className="block text-gray-300 text-sm mb-1 flex items-center gap-2">
                <FiUser className="w-4 h-4" /> Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1 flex items-center gap-2">
                <FiMail className="w-4 h-4" /> Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-gray-400 cursor-not-allowed"
              />
              <p className="text-gray-500 text-xs mt-1">
                Email cannot be changed. Contact support for assistance.
              </p>
            </div>
          </div>


          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2 flex items-center gap-2">
              <FiLock className="w-4 h-4" /> Change Password
            </h2>
            <p className="text-gray-500 text-sm">
              Leave empty if you don&apos;t want to change password
            </p>

            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-amber-500 pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showCurrentPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-amber-500 pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showNewPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-amber-500 pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>


          <div className="flex gap-4 justify-end">
            <Link
              href="/profile"
              className="px-6 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:bg-white/20 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
