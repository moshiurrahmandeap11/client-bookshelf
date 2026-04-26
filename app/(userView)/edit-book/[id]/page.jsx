"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  FiUpload,
  FiX,
  FiPlus,
  FiLoader,
  FiTrash2,
  FiArrowLeft,
  FiSave
} from "react-icons/fi";
import Swal from "sweetalert2";
import axiosInstance from "@/app/components/sharedComponents/axiosInstance/axiosInstance";

const EditBook = () => {
  const router = useRouter();
  const params = useParams();
  const bookId = params?.id;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
    status: "active",
  });
  
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState(null);
  
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);


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


  const fetchBook = async () => {
    if (!bookId) return;
    
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/books/${bookId}`);
      
      if (response.data.success) {
        const book = response.data.data;
        
        setFormData({
          title: book.title || "",
          authorName: book.authorName || "",
          categoryId: book.category?.id || "",
          publisher: book.publisher || "",
          price: book.price || "",
          discountPrice: book.discountPrice || "",
          description: book.description || "",
          stock: book.stock || "",
          pages: book.pages || "",
          language: book.language || "English",
          isbn: book.isbn || "",
          publishedDate: book.publishedDate ? new Date(book.publishedDate).toISOString().split('T')[0] : "",
          tags: book.tags?.join(", ") || "",
          status: book.status || "active",
        });
        

        if (book.thumbnail) {
          setExistingThumbnail(book.thumbnail);
          setThumbnailPreview(book.thumbnail);
        }
        

        if (book.images && book.images.length > 0) {
          setExistingGallery(book.images);
        }
      }
    } catch (error) {
      console.error("Fetch book error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to load book data",
        background: "#2A2219",
        color: "#fff",
      });
      router.push("/manage-books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBook();
  }, [bookId]);

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
      setExistingThumbnail(null);
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
    setExistingThumbnail(null);
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

  const removeNewGalleryImage = (index) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const removeExistingGalleryImage = (image) => {
    setDeletedImages(prev => [...prev, image.publicId]);
    setExistingGallery(prev => prev.filter(img => img.publicId !== image.publicId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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

    setSubmitting(true);
    const submitData = new FormData();
    

    Object.keys(formData).forEach(key => {
      if (formData[key]) submitData.append(key, formData[key]);
    });
    

    if (thumbnail) {
      submitData.append("thumbnail", thumbnail);
    }
    

    galleryImages.forEach(img => {
      submitData.append("images", img);
    });
    

    deletedImages.forEach(publicId => {
      submitData.append("deletedImages", publicId);
    });

    try {
      const response = await axiosInstance.put(`/books/${bookId}`, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000
      });
      
      if (response.data.success) {
        Swal.fire({ 
          icon: "success", 
          title: "Success!", 
          text: "Book updated successfully", 
          timer: 2000, 
          showConfirmButton: false, 
          background: "#2A2219", 
          color: "#fff" 
        });
        router.push("/manage-books");
      }
    } catch (error) {
      console.error("Update book error:", error);
      Swal.fire({ 
        icon: "error", 
        title: "Error!", 
        text: error.response?.data?.message || "Failed to update book", 
        background: "#2A2219", 
        color: "#fff" 
      });
    } finally {
      setSubmitting(false);
    }
  };


  const ImagePreview = ({ src, alt, onRemove, className }) => (
    <div className="relative">
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
          className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
        >
          <FiX className="w-3 h-3" />
        </button>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FiLoader className="w-8 h-8 text-amber-400 animate-spin" />
      </div>
    );
  }

  return (
    <div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors mb-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Books
          </button>
          <h1 className="text-2xl font-bold text-white">Edit Book</h1>
          <p className="text-gray-400 text-sm mt-1">Update book information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-1 space-y-6">
  
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <label className="block text-white font-medium mb-2">Book Thumbnail *</label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-amber-500/50 transition-colors">
                {thumbnailPreview ? (
                  <ImagePreview 
                    src={thumbnailPreview} 
                    alt="Thumbnail" 
                    onRemove={removeThumbnail}
                    className="mx-auto rounded-lg object-cover w-40 h-48"
                  />
                ) : (
                  <label className="cursor-pointer block">
                    <FiUpload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Click to upload new thumbnail</p>
                    <p className="text-gray-600 text-xs">PNG, JPG up to 2MB</p>
                    <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" />
                  </label>
                )}
              </div>
            </div>


            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <label className="block text-white font-medium mb-2">Gallery Images</label>
              

              {existingGallery.length > 0 && (
                <div className="mb-3">
                  <p className="text-gray-400 text-xs mb-2">Current Images:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {existingGallery.map((img, idx) => (
                      <ImagePreview 
                        key={idx}
                        src={img.url} 
                        alt={`Gallery ${idx}`} 
                        onRemove={() => removeExistingGalleryImage(img)}
                        className="rounded-lg object-cover w-full h-20"
                      />
                    ))}
                  </div>
                </div>
              )}
              

              <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-amber-500/50 transition-colors">
                <label className="cursor-pointer block">
                  <FiPlus className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Add new images</p>
                  <p className="text-gray-600 text-xs">PNG, JPG up to 2MB each</p>
                  <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
                </label>
              </div>
              

              {galleryPreviews.length > 0 && (
                <div className="mt-3">
                  <p className="text-gray-400 text-xs mb-2">New Images:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {galleryPreviews.map((preview, idx) => (
                      <ImagePreview 
                        key={idx}
                        src={preview} 
                        alt={`New ${idx}`} 
                        onRemove={() => removeNewGalleryImage(idx)}
                        className="rounded-lg object-cover w-full h-20"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>


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
              <div>
                <label className="block text-gray-300 text-sm mb-1">ISBN</label>
                <input type="text" name="isbn" value={formData.isbn} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="ISBN number" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Published Date</label>
                <input type="date" name="publishedDate" value={formData.publishedDate} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Tags (comma separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="fiction, bestseller, award-winning" />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>


        <div className="flex gap-4 pt-4">
          <button type="button" onClick={() => router.back()} className="px-6 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:bg-white/20 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="px-6 py-2 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-2">
            {submitting ? <><FiLoader className="w-4 h-4 animate-spin" /> Saving...</> : <><FiSave className="w-4 h-4" /> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;