import React from "react";
import Link from "next/link";
import {
  FiShield,
  FiUser,
  FiMail,
  FiDatabase,
  FiLock,
  FiEye,
  FiServer,
  FiGlobe,
  FiClock,
  FiFileText,
  FiKey,
  FiTrash2,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";

export const metadata = {
  title: "Privacy Policy - BookShelf",
  description: "Read BookShelf's privacy policy to understand how we collect, use, and protect your personal information.",
};

const PrivacyPolicyPage = () => {
  const lastUpdated = "April 26, 2026";

  const sections = [
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal Information: When you create an account, we collect your name, email address, and profile information.",
        "Usage Data: We collect information about how you interact with our platform, including books viewed, purchases made, and reviews written.",
        "Device Information: We may collect information about your device, browser type, IP address, and operating system.",
        "Payment Information: Payment processing is handled by secure third-party payment processors. We do not store your full payment details."
      ]
    },
    {
      icon: <FiDatabase className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our services, including book listings, purchases, and user accounts.",
        "To personalize your experience and recommend books based on your interests.",
        "To process transactions and send you order confirmations.",
        "To communicate with you about updates, promotions, and customer support.",
        "To improve our platform and develop new features.",
        "To prevent fraud and ensure the security of our platform."
      ]
    },
    {
      icon: <FiLock className="w-6 h-6" />,
      title: "Data Security",
      content: [
        "We implement industry-standard security measures to protect your personal information.",
        "Your password is encrypted using bcrypt hashing before being stored in our database.",
        "All data transmission between your browser and our servers is encrypted using SSL/TLS technology.",
        "We regularly review our security practices and update them as needed.",
        "Access to your personal information is restricted to authorized personnel only."
      ]
    },
    {
      icon: <FiEye className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        "Access: You can request a copy of the personal information we hold about you.",
        "Correction: You can update or correct your personal information through your account settings.",
        "Deletion: You can request deletion of your account and personal information.",
        "Opt-out: You can unsubscribe from marketing communications at any time.",
        "Data Portability: You can request your data in a structured, commonly used format."
      ]
    },
    {
      icon: <FiServer className="w-6 h-6" />,
      title: "Cookies and Tracking Technologies",
      content: [
        "We use cookies to enhance your browsing experience and remember your preferences.",
        "Session cookies are used to keep you logged in while you navigate our site.",
        "We use analytics cookies to understand how users interact with our platform.",
        "You can control cookie settings through your browser preferences.",
        "Third-party services may also use cookies for payment processing and analytics."
      ]
    },
    {
      icon: <FiUser className="w-6 h-6" />,
      title: "Children's Privacy",
      content: [
        "Our services are not intended for children under 13 years of age.",
        "We do not knowingly collect personal information from children under 13.",
        "If you believe a child has provided us with personal information, please contact us immediately.",
        "Parents or guardians can request deletion of their child's information."
      ]
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "International Data Transfers",
      content: [
        "Your information may be transferred to and processed in countries other than your own.",
        "We ensure appropriate safeguards are in place for international data transfers.",
        "By using our services, you consent to the transfer of your data as described in this policy.",
        "We comply with applicable data protection laws for international data transfers."
      ]
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Data Retention",
      content: [
        "We retain your personal information for as long as your account is active.",
        "When you delete your account, we will delete your personal information within 30 days.",
        "Some information may be retained for legal or legitimate business purposes.",
        "Anonymized data may be retained for analytical purposes."
      ]
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Third-Party Services",
      content: [
        "We use third-party services for payment processing (Stripe, PayPal).",
        "We use cloud storage providers (Cloudinary) for image hosting.",
        "We use analytics services to understand platform usage.",
        "These third parties have their own privacy policies and data handling practices.",
        "We do not sell your personal information to third parties."
      ]
    },
    {
      icon: <FiKey className="w-6 h-6" />,
      title: "Changes to This Privacy Policy",
      content: [
        "We may update this privacy policy from time to time.",
        "We will notify you of any material changes by posting the new policy on this page.",
        "The 'Last Updated' date at the top of this page will be revised accordingly.",
        "Your continued use of the platform after changes constitutes acceptance of the updated policy."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-8 sm:py-12">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-left mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
            <FiShield className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm text-amber-400 font-medium">Privacy & Security</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Privacy </span>
            <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-gray-400">
            Last Updated: <span className="text-amber-400">{lastUpdated}</span>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            At BookShelf, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
          </p>
        </div>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-12">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
            <FiLock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-white font-semibold">Secure & Encrypted</p>
            <p className="text-gray-500 text-xs">Your data is protected with industry-standard encryption</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
            <FiUser className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-white font-semibold">Your Data, Your Control</p>
            <p className="text-gray-500 text-xs">Access, update, or delete your information anytime</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
            <FiCheckCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-white font-semibold">No Data Selling</p>
            <p className="text-gray-500 text-xs">We never sell your personal information to third parties</p>
          </div>
        </div>

        {/* Policy Content */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400">
                  {section.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-2 ml-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-gray-400">
                    <span className="text-amber-400 mt-1">•</span>
                    <span className="text-sm sm:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-10 p-6 sm:p-8 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-center">
          <FiMail className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Questions About Your Privacy?</h3>
          <p className="text-gray-400 mb-4">
            If you have any questions about this Privacy Policy or how we handle your data, please contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
            >
              Contact Our Privacy Team
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Visit Help Center
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>This privacy policy applies to all BookShelf services and features.</p>
          <p className="mt-2">
            By using BookShelf, you agree to the terms outlined in this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;