"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiBookOpen,
  FiUsers,
  FiAward,
  FiHeart,
  FiGlobe,
  FiArrowRight,
  FiStar,
  FiTarget,
  FiEye,
  FiSmile,
} from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

const AboutPage = () => {
  const stats = [
    {
      icon: FiUsers,
      value: "10,000+",
      label: "Active Readers",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FiBookOpen,
      value: "50,000+",
      label: "Books Available",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: FiAward,
      value: "4.9/5",
      label: "User Rating",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: FiGlobe,
      value: "25+",
      label: "Countries",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const values = [
    {
      icon: FiHeart,
      title: "Passion for Reading",
      description:
        "We believe reading transforms lives and opens doors to endless possibilities.",
      color: "from-rose-500 to-red-500",
    },
    {
      icon: FiTarget,
      title: "Quality First",
      description:
        "Curated collections with hand-picked books from verified sources.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: FiEye,
      title: "Transparency",
      description:
        "Clear policies, honest reviews, and authentic reader experiences.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: FiSmile,
      title: "Community Driven",
      description:
        "Built by readers, for readers. Your feedback shapes our platform.",
      color: "from-amber-500 to-orange-500",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former librarian with 15+ years of experience in digital publishing.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      social: { twitter: "#", linkedin: "#" },
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      bio: "Tech enthusiast passionate about creating seamless reading experiences.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      social: { twitter: "#", linkedin: "#" },
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      bio: "Connecting readers and fostering a vibrant book-loving community.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      social: { twitter: "#", linkedin: "#" },
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 sm:pt-24 lg:pt-32">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">We&apos;re on a Mission to </span>
            <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Transform Reading
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            BookShelf was born from a simple idea: make discovering and
            organizing books effortless, enjoyable, and accessible to everyone,
            everywhere.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <FiTarget className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-400 leading-relaxed">
                To create the world&apos;s most accessible and engaging digital
                library, empowering readers to discover, organize, and share
                their love for books while supporting authors and publishers.
              </p>
            </div>

            <div className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
              <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <FiEye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                A world where every reader can instantly access their next great
                read, where book lovers connect across borders, and where
                reading is celebrated as a gateway to knowledge and imagination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 sm:py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-white">Our Core </span>
              <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at BookShelf
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-[#1C1712] rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 bg-linear-to-br ${value.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-white">Meet the </span>
              <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Passionate book lovers dedicated to creating the best reading
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover ring-4 ring-amber-500/20 group-hover:ring-amber-500/50 transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-amber-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  <a
                    href={member.social.twitter}
                    className="text-gray-500 hover:text-amber-400 transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="text-gray-500 hover:text-amber-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Quote */}
      <section className="py-16 sm:py-20 bg-linear-to-r from-amber-500/10 to-orange-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaQuoteLeft className="w-12 h-12 text-amber-500/30 mx-auto mb-6" />
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 italic leading-relaxed">
            BookShelf has completely changed how I discover and organize my
            reading. It&apos;s not just a platform; it&apos;s a community of
            passionate readers.
          </p>
          <div className="mt-6">
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-gray-300">— David Williams, Verified Reader</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 sm:p-12 text-center border border-white/20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Start Your Reading Journey?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Join thousands of readers who have already discovered the joy of
              organized reading.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 hover:scale-105"
            >
              Get Started Free
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
