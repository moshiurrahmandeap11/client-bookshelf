"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiSave,
  FiRefreshCw,
  FiLoader,
  FiGlobe,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiGithub,
  FiUpload,
  FiX
} from "react-icons/fi";
import Swal from "sweetalert2";
import axiosInstance from "@/app/components/sharedComponents/axiosInstance/axiosInstance";

const AdminSettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteTitle: "",
    siteDescription: "",
    siteKeywords: "",
    siteAuthor: "",
    footerText: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      github: ""
    }
  });
  
  const [favicon, setFavicon] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);
  const [existingFavicon, setExistingFavicon] = useState(null);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [existingLogo, setExistingLogo] = useState(null);
  const [ogImage, setOgImage] = useState(null);
  const [ogImagePreview, setOgImagePreview] = useState(null);
  const [existingOgImage, setExistingOgImage] = useState(null);

  // সেটিংস ফেচ করা
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/settings");
      if (response.data.success) {
        const data = response.data.data;
        setSettings({
          siteTitle: data.siteTitle || "",
          siteDescription: data.siteDescription || "",
          siteKeywords: data.siteKeywords || "",
          siteAuthor: data.siteAuthor || "",
          footerText: data.footerText || "",
          contactEmail: data.contactEmail || "",
          contactPhone: data.contactPhone || "",
          contactAddress: data.contactAddress || "",
          socialLinks: data.socialLinks || {
            facebook: "", twitter: "", instagram: "", linkedin: "", github: ""
          }
        });
        
        // বিদ্যমান ইমেজ সেট করা
        setExistingFavicon(data.favicon || null);
        setFaviconPreview(data.favicon || null);
        setExistingLogo(data.logo || null);
        setLogoPreview(data.logo || null);
        setExistingOgImage(data.ogImage || null);
        setOgImagePreview(data.ogImage || null);
      }
    } catch (error) {
      console.error("Fetch settings error:", error);
      Swal.fire({ icon: "error", title: "Error!", text: "Failed to load settings", background: "#2A2219", color: "#fff" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (platform, value) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }));
  };

  const handleFileChange = (type, file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      Swal.fire({ icon: "error", title: "Error!", text: "Image size must be less than 2MB", background: "#2A2219", color: "#fff" });
      return;
    }
    
    if (type === "favicon") {
      setFavicon(file);
      setFaviconPreview(URL.createObjectURL(file));
    } else if (type === "logo") {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    } else if (type === "ogImage") {
      setOgImage(file);
      setOgImagePreview(URL.createObjectURL(file));
    }
  };

  const removeFile = (type) => {
    if (type === "favicon") {
      setFavicon(null);
      setFaviconPreview(null);
      setExistingFavicon(null);
    } else if (type === "logo") {
      setLogo(null);
      setLogoPreview(null);
      setExistingLogo(null);
    } else if (type === "ogImage") {
      setOgImage(null);
      setOgImagePreview(null);
      setExistingOgImage(null);
    }
  };

  // ফেভিকন আপডেট করার পর favicon.ico রিলোড করার ফাংশন
  const reloadFavicon = (newFaviconUrl) => {
    if (!newFaviconUrl) return;
    
    // পুরনো favicon লিংক খুঁজে বের করা
    const links = document.querySelectorAll("link[rel*='icon']");
    links.forEach(link => link.remove());
    
    // নতুন favicon যোগ করা
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.href = `${newFaviconUrl}?v=${Date.now()}`; // ক্যাশ বাইপাসের জন্য টাইমস্ট্যাম্প
    document.head.appendChild(newLink);
  };

  // লোগো আপডেট করার পর localStorage-এ সেভ করা (হেডারে দেখানোর জন্য)
  const updateLogoInStorage = (newLogoUrl) => {
    if (newLogoUrl) {
      localStorage.setItem("siteLogo", newLogoUrl);
      // কাস্টম ইভেন্ট ডিসপ্যাচ করে হেডার আপডেট করা
      window.dispatchEvent(new Event("siteLogoUpdated"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData();
    formData.append("siteTitle", settings.siteTitle);
    formData.append("siteDescription", settings.siteDescription);
    formData.append("siteKeywords", settings.siteKeywords);
    formData.append("siteAuthor", settings.siteAuthor);
    formData.append("footerText", settings.footerText);
    formData.append("contactEmail", settings.contactEmail);
    formData.append("contactPhone", settings.contactPhone);
    formData.append("contactAddress", settings.contactAddress);
    formData.append("socialLinks", JSON.stringify(settings.socialLinks));
    
    // ✅ শুধু নতুন ফাইল থাকলেই append করা
    if (favicon && favicon instanceof File) {
      formData.append("favicon", favicon);
    }
    if (logo && logo instanceof File) {
      formData.append("logo", logo);
    }
    if (ogImage && ogImage instanceof File) {
      formData.append("ogImage", ogImage);
    }

    try {
      const response = await axiosInstance.put("/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 30000 // 30 সেকেন্ড টাইমআউট
      });
      
      if (response.data.success) {
        const updatedData = response.data.data;
        
        // ✅ ফেভিকন আপডেট হলে রিয়েল টাইমে আপডেট করা
        if (updatedData.favicon) {
          reloadFavicon(updatedData.favicon);
        }
        
        // ✅ লোগো আপডেট হলে স্টোরেজে আপডেট করা
        if (updatedData.logo) {
          updateLogoInStorage(updatedData.logo);
        }
        
        Swal.fire({ 
          icon: "success", 
          title: "Success!", 
          text: "Settings updated successfully", 
          background: "#2A2219", 
          color: "#fff", 
          timer: 2000, 
          showConfirmButton: false 
        });
        
        // ✅ সেটিংস রিফ্রেশ করে নতুন ডাটা দেখানো
        await fetchSettings();
        
        // ✅ নতুন ফাইল আপলোডের পর ফাইল স্টেট রিসেট করা
        setFavicon(null);
        setLogo(null);
        setOgImage(null);
      }
    } catch (error) {
      console.error("Update settings error:", error);
      Swal.fire({ icon: "error", title: "Error!", text: error.response?.data?.message || "Failed to update settings", background: "#2A2219", color: "#fff" });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    Swal.fire({
      title: "Reset Settings?",
      text: "This will reset all settings to default. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, reset",
      background: "#2A2219",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.post("/settings/reset");
          if (response.data.success) {
            Swal.fire({ icon: "success", title: "Reset!", text: "Settings reset to default", background: "#2A2219", color: "#fff" });
            await fetchSettings();
            removeFile("favicon");
            removeFile("logo");
            removeFile("ogImage");
            
            // ✅ ডিফল্ট ফেভিকন রিলোড
            if (response.data.data?.favicon) {
              reloadFavicon(response.data.data.favicon);
            } else {
              // ডিফল্ট favicon রিলোড
              reloadFavicon("/favicon.ico");
            }
          }
        } catch (error) {
          Swal.fire({ icon: "error", title: "Error!", text: "Failed to reset settings", background: "#2A2219", color: "#fff" });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FiLoader className="w-8 h-8 text-amber-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-white">Site Settings</h1><p className="text-gray-400 text-sm">Manage your website configuration</p></div>
        <button onClick={handleReset} className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors flex items-center gap-2"><FiRefreshCw className="w-4 h-4" /> Reset to Default</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ফেভিকন, লোগো, ওজি ইমেজ */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Brand Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Favicon */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Favicon (32x32)</label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center">
                {faviconPreview ? (
                  <div className="relative inline-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={faviconPreview} alt="Favicon" className="w-8 h-8" />
                    <button type="button" onClick={() => removeFile("favicon")} className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full">
                      <FiX className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <FiUpload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Upload Favicon</p>
                    <p className="text-gray-600 text-xs">PNG, ICO, JPG up to 2MB</p>
                    <input 
                      type="file" 
                      accept="image/*,.ico" 
                      onChange={(e) => handleFileChange("favicon", e.target.files[0])} 
                      className="hidden" 
                    />
                  </label>
                )}
              </div>
            </div>
            {/* Logo */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Site Logo (200x60)</label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center">
                {logoPreview ? (
                  <div className="relative inline-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logoPreview} alt="Logo" className="h-10" />
                    <button type="button" onClick={() => removeFile("logo")} className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full">
                      <FiX className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <FiUpload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Upload Logo</p>
                    <p className="text-gray-600 text-xs">PNG, JPG, SVG up to 2MB</p>
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange("logo", e.target.files[0])} className="hidden" />
                  </label>
                )}
              </div>
            </div>
            {/* OG Image */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Social Share Image (1200x630)</label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center">
                {ogImagePreview ? (
                  <div className="relative inline-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ogImagePreview} alt="OG Image" className="h-16 object-cover" />
                    <button type="button" onClick={() => removeFile("ogImage")} className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full">
                      <FiX className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <FiUpload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Upload OG Image</p>
                    <p className="text-gray-600 text-xs">PNG, JPG up to 2MB</p>
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange("ogImage", e.target.files[0])} className="hidden" />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* সাইট তথ্য */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2"><FiGlobe className="w-5 h-5" /> Site Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-gray-300 text-sm mb-1">Site Title</label><input type="text" name="siteTitle" value={settings.siteTitle} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="BookShelf" /></div>
            <div><label className="block text-gray-300 text-sm mb-1">Site Author</label><input type="text" name="siteAuthor" value={settings.siteAuthor} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="BookShelf Team" /></div>
            <div className="md:col-span-2"><label className="block text-gray-300 text-sm mb-1">Meta Description (SEO)</label><textarea name="siteDescription" rows="2" value={settings.siteDescription} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white resize-none" placeholder="Site description for search engines"></textarea></div>
            <div className="md:col-span-2"><label className="block text-gray-300 text-sm mb-1">Meta Keywords (SEO)</label><input type="text" name="siteKeywords" value={settings.siteKeywords} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="books, reading, ebook, library" /></div>
          </div>
        </div>

        {/* যোগাযোগ তথ্য */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">📞 Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-gray-300 text-sm mb-1 flex items-center gap-2"><FiMail className="w-4 h-4" /> Contact Email</label><input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" /></div>
            <div><label className="block text-gray-300 text-sm mb-1 flex items-center gap-2"><FiPhone className="w-4 h-4" /> Contact Phone</label><input type="text" name="contactPhone" value={settings.contactPhone} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" /></div>
            <div className="md:col-span-2"><label className="block text-gray-300 text-sm mb-1 flex items-center gap-2"><FiMapPin className="w-4 h-4" /> Contact Address</label><input type="text" name="contactAddress" value={settings.contactAddress} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" /></div>
          </div>
        </div>

        {/* সোশ্যাল মিডিয়া */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-lg font-semibold text-white">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-gray-300 text-sm mb-1 flex items-center gap-2"><FiFacebook className="w-4 h-4" /> Facebook</label><input type="url" value={settings.socialLinks.facebook} onChange={(e) => handleSocialChange("facebook", e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="https://facebook.com/yourpage" /></div>
            <div><label className="block text-gray-300 text-sm mb-1 flex items-center gap-2"><FiTwitter className="w-4 h-4" /> Twitter</label><input type="url" value={settings.socialLinks.twitter} onChange={(e) => handleSocialChange("twitter", e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="https://twitter.com/yourhandle" /></div>
            <div><label className="block text-gray-300 text-sm mb-1 flex items-center gap-2"><FiInstagram className="w-4 h-4" /> Instagram</label><input type="url" value={settings.socialLinks.instagram} onChange={(e) => handleSocialChange("instagram", e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="https://instagram.com/yourpage" /></div>
            <div><label className="block text-gray-300 text-sm mb-1 flex items-center gap-2"><FiLinkedin className="w-4 h-4" /> LinkedIn</label><input type="url" value={settings.socialLinks.linkedin} onChange={(e) => handleSocialChange("linkedin", e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="https://linkedin.com/company/yourcompany" /></div>
            <div className="md:col-span-2"><label className="block text-gray-300 text-sm mb-1 flex items-center gap-2"><FiGithub className="w-4 h-4" /> GitHub</label><input type="url" value={settings.socialLinks.github} onChange={(e) => handleSocialChange("github", e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="https://github.com/yourusername" /></div>
          </div>
        </div>

        {/* ফুটার টেক্সট */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <label className="block text-gray-300 text-sm mb-1">Footer Text</label>
          <input type="text" name="footerText" value={settings.footerText} onChange={handleInputChange} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="© 2024 BookShelf. All rights reserved." />
        </div>

        {/* বাটন */}
        <div className="flex justify-end gap-4">
          <button type="button" onClick={fetchSettings} className="px-6 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:bg-white/20 transition-colors">Cancel</button>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2">
            {saving ? <><FiLoader className="w-4 h-4 animate-spin" /> Saving...</> : <><FiSave className="w-4 h-4" /> Save Settings</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;