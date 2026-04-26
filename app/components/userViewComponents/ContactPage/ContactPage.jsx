"use client";

import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiSend,
  FiCheckCircle,
  FiMapPin,
  FiPhone,
  FiClock,
  FiMail as FiMailIcon,
} from "react-icons/fi";
import Swal from "sweetalert2";
import axiosInstance from "../../sharedComponents/axiosInstance/axiosInstance";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const tryFetch = async () => {
      const res = await axiosInstance.get("/settings");
      if (res.data.success) {
        setSettings(res.data.data);
      }
    };
    tryFetch();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/contact", formData);

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: response.data.message,
          background: "#2A2219",
          color: "#fff",
          iconColor: "#F59E0B",
          confirmButtonColor: "#F59E0B",
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Contact error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to send message. Please try again.",
        background: "#2A2219",
        color: "#fff",
        confirmButtonColor: "#F59E0B",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Visit Us",
      details: `${settings?.contactAddress}`,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: `${settings?.contactPhone}`,
      action: `tel:${settings?.contactPhone}`,
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: FiMailIcon,
      title: "Email Us",
      details: `${settings?.contactEmail}`,
      action: `mailto:${settings?.contactEmail}`,
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: FiClock,
      title: "Support Hours",
      details: "Mon-Fri: 9AM - 6PM<br/>Sat: 10AM - 2PM",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const socialIcons = {
    facebook: (
      <FaFacebook />
    ),
    twitter: (
      <BsTwitter />
    ),
    instagram: (
      <BsInstagram />
    ),
    linkedin: (
      <BsLinkedin />
    ) ,
    github: (
      <FaGithub />
    ),
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-12 sm:py-20">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 mt-4">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 bg-linear-to-br ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {info.title}
                </h3>
                {info.action ? (
                  <a
                    href={info.action}
                    className="text-gray-400 text-sm hover:text-amber-400 transition-colors"
                  >
                    {info.details}
                  </a>
                ) : (
                  <p
                    className="text-gray-400 text-sm"
                    dangerouslySetInnerHTML={{ __html: info.details }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className=" text-gray-300 text-sm mb-2 flex items-center gap-2">
                  <FiUser className="w-4 h-4" /> Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                    errors.name ? "border-red-500" : "border-white/20"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className=" text-gray-300 text-sm mb-2 flex items-center gap-2">
                  <FiMail className="w-4 h-4" /> Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                    errors.email ? "border-red-500" : "border-white/20"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                    errors.subject ? "border-red-500" : "border-white/20"
                  }`}
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Please describe your inquiry in detail..."
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none ${
                    errors.message ? "border-red-500" : "border-white/20"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-linear-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Alternative Ways to Connect
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">100% privacy guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">No spam, ever</span>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Follow Us
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Stay connected with us on social media
              </p>
              <div className="flex gap-4">
                {Object.entries(settings?.socialLinks || {}).map(
                  ([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-white/20 transition-all duration-300"
                    >
                      {socialIcons[key] || key}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
