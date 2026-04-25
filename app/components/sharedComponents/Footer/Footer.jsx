"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FiBookOpen, 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiTwitter, 
  FiFacebook, 
  FiInstagram, 
  FiLinkedin,
  FiGithub
} from "react-icons/fi";
import axiosInstance from "../axiosInstance/axiosInstance";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState({
    contactAddress: "",
    contactPhone: "",
    contactEmail: "",
    footerText: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      github: ""
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosInstance.get("/settings");
        if (res.data.success) {
          const data = res.data.data;
          
          // সোশ্যাল লিংক পার্স করা (যদি স্ট্রিং হয়)
          let socialLinks = data.socialLinks || {};
          if (typeof socialLinks === 'string') {
            try {
              socialLinks = JSON.parse(socialLinks);
            } catch (e) {
              socialLinks = { facebook: "", twitter: "", instagram: "", linkedin: "", github: "" };
            }
          }
          
          setSettings({
            contactAddress: data.contactAddress || "",
            contactPhone: data.contactPhone || "",
            contactEmail: data.contactEmail || "",
            footerText: data.footerText || "© 2024 BookShelf. All rights reserved.",
            socialLinks: socialLinks
          });
        }
      } catch (error) {
        console.error("Fetch settings error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Books", href: "/browse" },
    { name: "Categories", href: "/categories" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
    { name: "FAQs", href: "/faqs" }
  ];

  // ✅ সোশ্যাল মিডিয়া লিংক (সেটিংস থেকে ডাইনামিক)
  const getSocialLinks = () => {
    const links = [];
    
    if (settings.socialLinks?.facebook) {
      links.push({ icon: FiFacebook, href: settings.socialLinks.facebook, label: "Facebook" });
    }
    if (settings.socialLinks?.twitter) {
      links.push({ icon: FiTwitter, href: settings.socialLinks.twitter, label: "Twitter" });
    }
    if (settings.socialLinks?.instagram) {
      links.push({ icon: FiInstagram, href: settings.socialLinks.instagram, label: "Instagram" });
    }
    if (settings.socialLinks?.linkedin) {
      links.push({ icon: FiLinkedin, href: settings.socialLinks.linkedin, label: "LinkedIn" });
    }
    if (settings.socialLinks?.github) {
      links.push({ icon: FiGithub, href: settings.socialLinks.github, label: "GitHub" });
    }
    
    return links;
  };

  const socialLinks = getSocialLinks();

  // ফুটার টেক্সট প্রসেস করা
  const getFooterText = () => {
    if (settings.footerText && !settings.footerText.includes(currentYear)) {
      return `© ${currentYear} ${settings.footerText}`;
    }
    return settings.footerText || `© ${currentYear} BookShelf. All rights reserved.`;
  };

  return (
    <footer className="bg-[#0F0D0A] border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FiBookOpen className="w-6 h-6 text-amber-500" />
              <span className="text-xl font-bold bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                BookShelf
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your digital library for discovering, organizing, and enjoying thousands of books from anywhere in the world.
            </p>
            
            {/* ✅ ডাইনামিক সোশ্যাল মিডিয়া লিংক */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-amber-400 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {settings.contactAddress && (
                <li className="flex items-start gap-3">
                  <FiMapPin className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <span className="text-gray-400 text-sm">
                    {settings.contactAddress}
                  </span>
                </li>
              )}
              {settings.contactPhone && (
                <li className="flex items-center gap-3">
                  <FiPhone className="w-5 h-5 text-amber-500 shrink-0" />
                  <a href={`tel:${settings.contactPhone}`} className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200">
                    {settings.contactPhone}
                  </a>
                </li>
              )}
              {settings.contactEmail && (
                <li className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-amber-500 shrink-0" />
                  <a href={`mailto:${settings.contactEmail}`} className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200">
                    {settings.contactEmail}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              {getFooterText()}
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-500 hover:text-amber-400 text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-amber-400 text-sm transition-colors duration-200">
                Terms of Use
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-amber-400 text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;