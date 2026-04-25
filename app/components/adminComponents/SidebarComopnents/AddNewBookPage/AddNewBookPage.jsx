"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiUpload,
  FiX,
  FiPlus,
  FiLoader,
  FiTrash2,
  FiImage
} from "react-icons/fi";
import Swal from "sweetalert2";
import axiosInstance from "@/app/components/sharedComponents/axiosInstance/axiosInstance";

const AddNewBookPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    authorName: "",
    categoryId: "",
    publisher: "",
    price: "",
    discountPrice: "",
    description: "",
    stock: "",
    pages: "",
    language: "English",
    isbn: "",
    publishedDate: "",
    tags: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({ icon: "error", title: "Error!", text: "Image size must be less than 2MB", background: "#2A2219", color: "#fff" });
        return;
      }
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(f => f.size <= 2 * 1024 * 1024);
    
    if (validFiles.length !== files.length) {
      Swal.fire({ icon: "error", title: "Error!", text: "Some images exceed 2MB limit", background: "#2A2219", color: "#fff" });
    }
    
    setGalleryImages(prev => [...prev, ...validFiles]);
    setGalleryPreviews(prev => [...prev, ...validFiles.map(f => URL.createObjectURL(f))]);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // প্রিভিউ ইমেজের জন্য সঠিক JSX (Next.js Image এর পরিবর্তে normal img)
  const ImagePreview = ({ src, alt, onRemove, className }) => {
    return (
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={src} 
          alt={alt} 
          className={className}
          style={{ objectFit: 'cover' }}
        />
        {onRemove && (
          <button 
            type="button" 
            onClick={onRemove} 
            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
          >
            <FiX className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ভ্যালিডেশন চেক
    if (!formData.title || !formData.authorName || !formData.categoryId || !formData.price) {
      Swal.fire({ 
        icon: "error", 
        title: "Error!", 
        text: "Please fill all required fields", 
        background: "#2A2219", 
        color: "#fff" 
      });
      return;
    }

    setLoading(true);
    const submitData = new FormData();
    
    // ফর্ম ডাটা যোগ করা
    Object.keys(formData).forEach(key => {
      if (formData[key]) submitData.append(key, formData[key]);
    });
    
    // থাম্বনেইল যোগ করা
    if (thumbnail) {
      submitData.append("thumbnail", thumbnail);
    }
    
    // গ্যালারি ইমেজ যোগ করা
    galleryImages.forEach(img => {
      submitData.append("images", img);
    });

    // ডিবাগ: ফর্মডাটা কি আছে দেখা
    for (let pair of submitData.entries()) {
      console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
    }

    try {
      const response = await axiosInstance.post("/books", submitData, {
        headers: { 
          "Content-Type": "multipart/form-data" 
        },
        timeout: 60000 // 60 সেকেন্ড টাইমআউট
      });
      
      if (response.data.success) {
        Swal.fire({ 
          icon: "success", 
          title: "Success!", 
          text: "Book added successfully", 
          timer: 2000, 
          showConfirmButton: false, 
          background: "#2A2219", 
          color: "#fff" 
        });
        router.push("/admin/books");
      }
    } catch (error) {
      console.error("Create book error:", error);
      console.error("Error response:", error.response?.data);
      
      let errorMessage = "Failed to add book";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Swal.fire({ 
        icon: "error", 
        title: "Error!", 
        text: errorMessage, 
        background: "#2A2219", 
        color: "#fff" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Book</h1>
          <p className="text-gray-400 text-sm mt-1">Create a new book listing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* বাম কলাম - থাম্বনেইল ও ইমেজ */}
          <div className="lg:col-span-1 space-y-6">
            {/* থাম্বনেইল */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <label className="block text-white font-medium mb-2">Book Thumbnail *</label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-amber-500/50 transition-colors">
                {thumbnailPreview ? (
                  <ImagePreview 
                    src={thumbnailPreview} 
                    alt="Thumbnail" 
                    onRemove={() => { setThumbnail(null); setThumbnailPreview(null); }}
                    className="mx-auto rounded-lg object-cover w-40 h-48"
                  />
                ) : (
                  <label className="cursor-pointer block">
                    <FiUpload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Click to upload thumbnail</p>
                    <p className="text-gray-600 text-xs">PNG, JPG up to 2MB</p>
                    <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            {/* ইমেজ গ্যালারি */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <label className="block text-white font-medium mb-2">Gallery Images</label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-amber-500/50 transition-colors">
                <label className="cursor-pointer block">
                  <FiPlus className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Add images</p>
                  <p className="text-gray-600 text-xs">PNG, JPG up to 2MB each</p>
                  <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
                </label>
              </div>
              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {galleryPreviews.map((preview, idx) => (
                    <ImagePreview 
                      key={idx}
                      src={preview} 
                      alt={`Gallery ${idx}`} 
                      onRemove={() => removeGalleryImage(idx)}
                      className="rounded-lg object-cover w-full h-20"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ডান কলাম - বইয়ের তথ্য (একই থাকবে) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Book Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-amber-500" placeholder="Enter book title" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Author Name *</label>
                <input type="text" name="authorName" value={formData.authorName} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-amber-500" placeholder="Author name" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Category *</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-amber-500">
                  <option value="">Select category</option>
                  {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Publisher</label>
                <input type="text" name="publisher" value={formData.publisher} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="Publisher name" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Price (USD) *</label>
                <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-amber-500" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Discount Price</label>
                <input type="number" step="0.01" name="discountPrice" value={formData.discountPrice} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="0.00" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="Quantity" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Pages</label>
                <input type="number" name="pages" value={formData.pages} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="Number of pages" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Language</label>
                <select name="language" value={formData.language} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white">
                  <option>English</option><option>Bengali</option><option>Spanish</option><option>French</option><option>German</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Description</label>
              <textarea name="description" rows="4" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white resize-none" placeholder="Book description..."></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-gray-300 text-sm mb-1">ISBN</label><input type="text" name="isbn" value={formData.isbn} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="ISBN number" /></div>
              <div><label className="block text-gray-300 text-sm mb-1">Published Date</label><input type="date" name="publishedDate" value={formData.publishedDate} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" /></div>
            </div>

            <div><label className="block text-gray-300 text-sm mb-1">Tags (comma separated)</label><input type="text" name="tags" value={formData.tags} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="fiction, bestseller, award-winning" /></div>
          </div>
        </div>

        {/* বাটন */}
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={() => router.back()} className="px-6 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:bg-white/20 transition-colors">Cancel</button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-2">
            {loading ? <><FiLoader className="w-4 h-4 animate-spin" /> Saving...</> : "Publish Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookPage;