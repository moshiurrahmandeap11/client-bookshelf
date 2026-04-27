import React from "react";
import Link from "next/link";
import {
  FiFileText,
  FiUserCheck,
  FiBookOpen,
  FiShoppingCart,
  FiLock,
  FiAlertCircle,
  FiUsers,
  FiMail,
  FiShield
} from "react-icons/fi";

export const metadata = {
  title: "Terms and Conditions - BookShelf",
  description: "Read BookShelf's terms and conditions. Understand the rules and guidelines for using our platform.",
};

const TermsAndConditions = () => {
  const lastUpdated = "April 26, 2026";

  const sections = [
    {
      icon: <FiFileText className="w-6 h-6" />,
      title: "Acceptance of Terms",
      content: "By accessing or using BookShelf, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services. These terms apply to all users, visitors, and others who access the platform."
    },
    {
      icon: <FiUserCheck className="w-6 h-6" />,
      title: "Account Registration",
      content: "To access certain features, you must create an account. You agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use."
    },
    {
      icon: <FiBookOpen className="w-6 h-6" />,
      title: "Content Guidelines",
      content: "Users may upload, share, and review books. You retain ownership of content you submit. By uploading content, you grant BookShelf a non-exclusive license to display and distribute it. You may not upload copyrighted material without permission. Prohibited content includes hate speech, harassment, or illegal material."
    },
    {
      icon: <FiShoppingCart className="w-6 h-6" />,
      title: "Purchases and Payments",
      content: "When you purchase a book, you agree to pay the listed price. All payments are processed through secure third-party payment processors. Prices are subject to change without notice. We reserve the right to refuse or cancel orders at our discretion. Digital products are delivered immediately upon purchase."
    },
    {
      icon: <FiLock className="w-6 h-6" />,
      title: "Intellectual Property",
      content: "BookShelf and its original content, features, and functionality are owned and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our explicit permission."
    },
    {
      icon: <FiAlertCircle className="w-6 h-6" />,
      title: "Prohibited Activities",
      content: "You agree not to: violate any laws, infringe on intellectual property rights, upload malicious code, attempt to gain unauthorized access, harass other users, spam or solicit users, or interfere with the platform's operation. Violation may result in account termination."
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Termination",
      content: "We may terminate or suspend your account immediately without notice for conduct that violates these terms. Upon termination, your right to use the platform ceases. You may delete your account at any time through your profile settings."
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "User Conduct",
      content: "You agree to use BookShelf responsibly and respectfully. Do not post false or misleading information. Do not impersonate others. Do not engage in commercial solicitation without permission. We reserve the right to remove any content that violates these standards."
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Communications",
      content: "By creating an account, you consent to receive electronic communications from us, including order confirmations, updates, and promotional messages. You can opt out of promotional emails at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-8 sm:py-12">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-left mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
            <FiFileText className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm text-amber-400 font-medium">Legal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Terms and </span>
            <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">Conditions</span>
          </h1>
          <p className="text-gray-400">
            Last Updated: <span className="text-amber-400">{lastUpdated}</span>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Please read these terms carefully before using BookShelf.
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-5">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400">
                  {section.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <p className="text-gray-400 leading-relaxed ml-2">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Governing Law Section */}
        <div className="mt-8 p-6 bg-amber-500/10 rounded-2xl border border-amber-500/20">
          <h3 className="text-lg font-bold text-white mb-2">Governing Law</h3>
          <p className="text-gray-400 text-sm">
            These terms shall be governed by and construed in accordance with the laws applicable in your jurisdiction. 
            Any disputes arising from these terms shall be resolved through binding arbitration or in courts of competent jurisdiction.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            If you have any questions about these Terms and Conditions, please{" "}
            <Link href="/contact" className="text-amber-400 hover:text-amber-300">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;