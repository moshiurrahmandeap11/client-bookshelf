"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiX,
  FiUpload,
  FiImage,
  FiLoader,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Swal from "sweetalert2";
import axiosInstance from "@/app/components/sharedComponents/axiosInstance/axiosInstance";


const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });


  const fetchCategories = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/categories/paginated?page=${page}&limit=10`);
      if (res.data.success) {
        setCategories(res.data.data);
        setPagination({
          currentPage: res.data.pagination.currentPage,
          totalPages: res.data.pagination.totalPages,
          totalItems: res.data.pagination.totalItems,
        });
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
      showErrorToast("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" && !isEditing ? { slug: generateSlug(value) } : {}),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showErrorToast("Image size must be less than 2MB");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };


  const showSuccessToast = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message,
      timer: 2000,
      showConfirmButton: false,
      background: "#2A2219",
      color: "#fff",
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
    });
  };


  const confirmDelete = (category) => {
    Swal.fire({
      title: "Delete Category?",
      text: `Are you sure you want to delete "${category.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#2A2219",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(category._id);
      }
    });
  };


  const handleCreate = async () => {
    if (!formData.name || !formData.slug) {
      showErrorToast("Name and Slug are required");
      return;
    }

    try {
      setUploading(true);
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("slug", formData.slug);
      submitData.append("description", formData.description);
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      const res = await axiosInstance.post("/categories", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        showSuccessToast("Category created successfully");
        resetModal();
        fetchCategories();
      }
    } catch (error) {
      console.error("Create error:", error);
      showErrorToast(error.response?.data?.message || "Failed to create category");
    } finally {
      setUploading(false);
    }
  };


  const handleUpdate = async () => {
    if (!formData.name || !formData.slug) {
      showErrorToast("Name and Slug are required");
      return;
    }

    try {
      setUploading(true);
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("slug", formData.slug);
      submitData.append("description", formData.description);
      if (formData.image && typeof formData.image !== "string") {
        submitData.append("image", formData.image);
      }

      const res = await axiosInstance.put(`/categories/${selectedCategory._id}`, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        showSuccessToast("Category updated successfully");
        resetModal();
        fetchCategories();
      }
    } catch (error) {
      console.error("Update error:", error);
      showErrorToast(error.response?.data?.message || "Failed to update category");
    } finally {
      setUploading(false);
    }
  };


  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`/categories/${id}`);
      if (res.data.success) {
        showSuccessToast("Category deleted successfully");
        fetchCategories();
      }
    } catch (error) {
      console.error("Delete error:", error);
      showErrorToast("Failed to delete category");
    }
  };


  const openEditModal = (category) => {
    setIsEditing(true);
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      image: category.image || null,
    });
    setImagePreview(category.image);
    setIsModalOpen(true);
  };


  const openCreateModal = () => {
    setIsEditing(false);
    setSelectedCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      image: null,
    });
    setImagePreview(null);
    setIsModalOpen(true);
  };


  const resetModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      slug: "",
      description: "",
      image: null,
    });
    setImagePreview(null);
    setIsEditing(false);
    setSelectedCategory(null);
  };


  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Categories</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your book categories</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
        >
          <FiPlus className="w-5 h-5" />
          Add Category
        </button>
      </div>


      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search categories..."
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
                  <th className="pb-3 w-16">Image</th>
                  <th className="pb-3">Name</th>
                  <th className="pb-3 hidden md:table-cell">Slug</th>
                  <th className="pb-3 hidden lg:table-cell">Description</th>
                  <th className="pb-3 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <FiImage className="w-5 h-5 text-gray-500" />
                        </div>
                      )}
                    </td>
                    <td className="py-3">
                      <span className="text-white font-medium">{category.name}</span>
                    </td>
                    <td className="py-3 hidden md:table-cell">
                      <span className="text-gray-400 text-sm">{category.slug}</span>
                    </td>
                    <td className="py-3 hidden lg:table-cell">
                      <span className="text-gray-400 text-sm line-clamp-1">{category.description || "—"}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(category)}
                          className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmDelete(category)}
                          className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => fetchCategories(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 text-white">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchCategories(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-linear-to-br from-[#2A2219] to-[#1C1712] rounded-2xl w-full max-w-md border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {isEditing ? "Edit Category" : "Add Category"}
              </h2>
              <button
                onClick={resetModal}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiImage className="w-8 h-8 text-gray-500" />
                    )}
                  </div>
                  <label className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl cursor-pointer hover:bg-white/20 transition-colors">
                    <FiUpload className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-white">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">Max size: 2MB. Recommended: 400x400</p>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Fiction"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="e.g., fiction"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-xs text-gray-500 mt-1">URL-friendly identifier</p>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Brief description of this category..."
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 p-5 pt-0">
              <button
                onClick={resetModal}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={isEditing ? handleUpdate : handleCreate}
                disabled={uploading}
                className="flex-1 px-4 py-2 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <FiLoader className="w-5 h-5 animate-spin" />
                ) : (
                  isEditing ? "Update" : "Create"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AdminCategoriesPage;