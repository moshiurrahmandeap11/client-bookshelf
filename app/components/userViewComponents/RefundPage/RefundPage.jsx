import React from "react";
import Link from "next/link";
import {
  FiRefreshCw,
  FiClock,
  FiCreditCard,
  FiMail,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle
} from "react-icons/fi";

export const metadata = {
  title: "Refund Policy - BookShelf",
  description: "Read BookShelf's refund policy for digital book purchases.",
};

const RefundPage = () => {
  const lastUpdated = "April 26, 2026";

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] py-8 sm:py-12">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-left mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">

            <span className="text-xs sm:text-sm text-amber-400 font-medium">Refund Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Refund </span>
            <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-gray-400">
            Last Updated: <span className="text-amber-400">{lastUpdated}</span>
          </p>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
            <FiClock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-white font-semibold">7-Day Refund Window</p>
            <p className="text-gray-500 text-xs">Request refunds within 7 days of purchase</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
            <FiCheckCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-white font-semibold">Digital Products</p>
            <p className="text-gray-500 text-xs">Refunds for unused/unread books only</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
            <FiCreditCard className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-white font-semibold">Original Payment Method</p>
            <p className="text-gray-500 text-xs">Refunds issued to original payment source</p>
          </div>
        </div>

        {/* Policy Content */}
        <div className="space-y-6">
          {/* Eligible for Refund */}
          <div className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Eligible for Refund</h2>
            </div>
            <ul className="space-y-2 ml-2">
              <li className="flex items-start gap-2 text-gray-400"><span className="text-green-400 mt-1">•</span> Technical issues preventing access to your purchased book</li>
              <li className="flex items-start gap-2 text-gray-400"><span className="text-green-400 mt-1">•</span> Duplicate purchase of the same book</li>
              <li className="flex items-start gap-2 text-gray-400"><span className="text-green-400 mt-1">•</span> Book content significantly different from description</li>
              <li className="flex items-start gap-2 text-gray-400"><span className="text-green-400 mt-1">•</span> Accidental purchase reported within 24 hours</li>
            </ul>
          </div>

          {/* Not Eligible for Refund */}
          <div className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400">
                <FiXCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Not Eligible for Refund</h2>
            </div>
            <ul className="space-y-2 ml-2">
              <li className="flex items-start gap-2 text-gray-400"><span className="text-red-400 mt-1">•</span> Change of mind after purchase</li>
              <li className="flex items-start gap-2 text-gray-400"><span className="text-red-400 mt-1">•</span> Books that have been downloaded or accessed</li>
              <li className="flex items-start gap-2 text-gray-400"><span className="text-red-400 mt-1">•</span> Refund requests after 7-day window</li>
              <li className="flex items-start gap-2 text-gray-400"><span className="text-red-400 mt-1">•</span> Free or promotional items</li>
              <li className="flex items-start gap-2 text-gray-400"><span className="text-red-400 mt-1">•</span> Subscription or membership fees (non-refundable)</li>
            </ul>
          </div>

          {/* How to Request */}
          <div className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                <FiMail className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">How to Request a Refund</h2>
            </div>
            <ol className="space-y-3 ml-2 list-decimal list-inside text-gray-400">
              <li>Go to your <Link href="/profile" className="text-amber-400 hover:text-amber-300">Profile Dashboard</Link></li>
              <li>Navigate to &quot;My Orders&quot; or&quot;Purchase History&quot;</li>
              <li>Find the order you want to request a refund for</li>
              <li>Click &quot;Request Refund&quot; and provide a reason</li>
              <li>Submit your request</li>
            </ol>
            <p className="text-gray-400 mt-4">
              You can also contact us directly at{" "}
              <a href="mailto:support@bookshelf.com" className="text-amber-400 hover:text-amber-300">
                support@bookshelf.com
              </a>{" "}
              with your order details.
            </p>
          </div>

          {/* Processing Time */}
          <div className="bg-amber-500/10 rounded-2xl p-6 border border-amber-500/20">
            <h3 className="text-lg font-bold text-white mb-2">Refund Processing Time</h3>
            <p className="text-gray-400 text-sm">
              Once approved, refunds typically take 5-10 business days to appear in your account, depending on your payment provider.
              You will receive a confirmation email once your refund has been processed.
            </p>
          </div>
        </div>

        {/* Contact Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Questions about refunds?{" "}
            <Link href="/contact" className="text-amber-400 hover:text-amber-300">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPage;