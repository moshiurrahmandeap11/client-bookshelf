import React from "react";
import Link from "next/link";
import {
  FiInfo,
  FiCheckCircle,
  FiSettings,
  FiShield
} from "react-icons/fi";

export const metadata = {
  title: "Cookie Policy - BookShelf",
  description: "Learn about how BookShelf uses cookies and similar technologies.",
};

const CookiesPage = () => {
  const lastUpdated = "April 26, 2026";

  const cookieTypes = [
    { name: "Essential Cookies", icon: <FiCheckCircle />, description: "Required for the website to function properly. These cannot be disabled.", examples: "Authentication, session management, security" },
    { name: "Functional Cookies", icon: <FiSettings />, description: "Remember your preferences and settings for a better experience.", examples: "Language preference, theme settings, saved items" },
    { name: "Analytics Cookies", icon: <FiInfo />, description: "Help us understand how visitors interact with our site.", examples: "Page views, navigation patterns, user behavior" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-8 sm:py-12">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
            <FiInfo className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-400 font-medium">Cookie Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4"><span className="text-white">Cookie </span><span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">Policy</span></h1>
          <p className="text-gray-400">Last Updated: <span className="text-amber-400">{lastUpdated}</span></p>
        </div>

        {/* What are Cookies */}
        <div className="bg-linear-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-3">What Are Cookies?</h2>
          <p className="text-gray-400 leading-relaxed">Cookies are small text files stored on your device when you visit websites. They help us remember your preferences, analyze site usage, and improve your browsing experience.</p>
        </div>

        {/* Cookie Types */}
        <div className="space-y-4 mb-6">
          {cookieTypes.map((type, idx) => (
            <div key={idx} className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-2"><div className="text-amber-400">{type.icon}</div><h3 className="text-lg font-semibold text-white">{type.name}</h3></div>
              <p className="text-gray-400 text-sm mb-1">{type.description}</p>
              <p className="text-gray-500 text-xs"><span className="text-gray-600">Examples:</span> {type.examples}</p>
            </div>
          ))}
        </div>

        {/* Managing Cookies */}
        <div className="bg-linear-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-3">Managing Cookies</h2>
          <p className="text-gray-400 leading-relaxed mb-3">You can control cookies through your browser settings. Most browsers allow you to:</p>
          <ul className="space-y-1 ml-4"><li className="text-gray-400 text-sm">• See what cookies are stored</li><li className="text-gray-400 text-sm">• Delete all or specific cookies</li><li className="text-gray-400 text-sm">• Block cookies from specific sites</li><li className="text-gray-400 text-sm">• Set preferences for future cookies</li></ul>
          <p className="text-gray-400 text-sm mt-3">Note: Disabling essential cookies may affect site functionality.</p>
        </div>

        {/* Third-Party Cookies */}
        <div className="bg-amber-500/10 rounded-2xl p-6 border border-amber-500/20 mb-6">
          <h3 className="text-lg font-bold text-white mb-2">Third-Party Cookies</h3>
          <p className="text-gray-400 text-sm">We may use third-party services (payment processors, analytics) that set their own cookies. These are subject to the respective third party&apos;s policies.</p>
        </div>

        {/* Consent */}
        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2"><FiShield className="text-amber-400" /> Your Consent</h3>
          <p className="text-gray-400 text-sm">By continuing to use BookShelf, you consent to our use of cookies as described in this policy. You can withdraw consent by managing cookie settings in your browser.</p>
        </div>

        {/* Contact */}
        <div className="mt-6 text-center"><p className="text-gray-400 text-sm">Questions about cookies? <Link href="/contact" className="text-amber-400 hover:text-amber-300">Contact us</Link></p></div>
      </div>
    </div>
  );
};

export default CookiesPage;