"use client";

import axiosInstance from "@/app/components/sharedComponents/axiosInstance/axiosInstance";
import React, { useState, useEffect } from "react";
import {
  FiMail,
  FiEye,
  FiTrash2,
  FiLoader,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiFilter,
  FiSend,
  FiX,
  FiCheckCircle,
  FiClock,
  FiMessageCircle,
  FiUser,
  FiCalendar,
  FiInbox,
} from "react-icons/fi";
import Swal from "sweetalert2";

const ContactAdminPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const response = await axiosInstance.get(
        "/contacts?status=unread&limit=1",
      );
      if (response.data.success) {
        setUnreadCount(response.data.pagination.totalItems);
      }
    } catch (error) {
      console.error("Fetch unread count error:", error);
    }
  };

  // Fetch contacts
  const fetchContacts = async (page = 1) => {
    try {
      setLoading(true);
      let url = `/contacts?page=${page}&limit=10`;
      if (statusFilter !== "all") url += `&status=${statusFilter}`;

      const response = await axiosInstance.get(url);

      if (response.data.success) {
        setContacts(response.data.data);
        setPagination({
          currentPage: response.data.pagination.currentPage,
          totalPages: response.data.pagination.totalPages,
          totalItems: response.data.pagination.totalItems,
        });
        await fetchUnreadCount();
      }
    } catch (error) {
      console.error("Fetch contacts error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to load contacts",
        background: "#2A2219",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchUnreadCount();
  }, [statusFilter]);

  // Update contact status
  const updateStatus = async (id, status) => {
    try {
      const response = await axiosInstance.put(`/contacts/${id}/status`, {
        status,
      });
      if (response.data.success) {
        await fetchContacts(pagination.currentPage);
        await fetchUnreadCount();
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `Status changed to ${status}`,
          timer: 1500,
          showConfirmButton: false,
          background: "#2A2219",
          color: "#fff",
        });
      }
    } catch (error) {
      console.error("Update status error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update status",
        background: "#2A2219",
        color: "#fff",
      });
    }
  };

  // Delete contact
  const deleteContact = (contact) => {
    Swal.fire({
      title: "Delete Message?",
      text: `Are you sure you want to delete message from "${contact.name}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      background: "#2A2219",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(
            `/contacts/${contact._id}`,
          );
          if (response.data.success) {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Message deleted successfully",
              timer: 1500,
              showConfirmButton: false,
              background: "#2A2219",
              color: "#fff",
            });
            await fetchContacts(pagination.currentPage);
            await fetchUnreadCount();
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete message",
            background: "#2A2219",
            color: "#fff",
          });
        }
      }
    });
  };

  // Send reply
  const sendReply = async () => {
    if (!replyMessage.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please enter a reply message",
        background: "#2A2219",
        color: "#fff",
      });
      return;
    }

    setSendingReply(true);
    try {
      const response = await axiosInstance.put(
        `/contacts/${selectedContact._id}/reply`,
        {
          replyMessage: replyMessage,
        },
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Reply Sent!",
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
          background: "#2A2219",
          color: "#fff",
        });
        setSelectedContact(null);
        setReplyMessage("");
        await fetchContacts(pagination.currentPage);
        await fetchUnreadCount();
      }
    } catch (error) {
      console.error("Reply error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to send reply",
        background: "#2A2219",
        color: "#fff",
      });
    } finally {
      setSendingReply(false);
    }
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "read":
        return {
          bg: "bg-blue-500/20",
          text: "text-blue-400",
          icon: <FiEye className="w-3 h-3" />,
          label: "Read",
        };
      case "replied":
        return {
          bg: "bg-green-500/20",
          text: "text-green-400",
          icon: <FiCheckCircle className="w-3 h-3" />,
          label: "Replied",
        };
      default:
        return {
          bg: "bg-amber-500/20",
          text: "text-amber-400",
          icon: <FiClock className="w-3 h-3" />,
          label: "Unread",
        };
    }
  };

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject?.toLowerCase().includes(searchTerm.toLowerCase()),
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
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage customer inquiries and support tickets
          </p>
        </div>

        {/* Stats and Filter Button */}
        <div className="flex items-center gap-3">
          {/* Unread Count Badge */}
          {unreadCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 rounded-full border border-amber-500/30">
              <FiInbox className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">
                {unreadCount} Unread
              </span>
            </div>
          )}

          {/* Total Count */}
          <div className="px-3 py-1.5 bg-white/10 rounded-full">
            <span className="text-gray-300 text-sm">
              Total: {pagination.totalItems}
            </span>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:text-amber-400 transition-colors"
          >
            <FiFilter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, email or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                statusFilter === "all"
                  ? "bg-amber-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              All Messages
            </button>
            <button
              onClick={() => setStatusFilter("unread")}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                statusFilter === "unread"
                  ? "bg-amber-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setStatusFilter("read")}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                statusFilter === "read"
                  ? "bg-amber-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              Read
            </button>
            <button
              onClick={() => setStatusFilter("replied")}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                statusFilter === "replied"
                  ? "bg-amber-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              Replied
            </button>
          </div>
        </div>
      )}

      {/* Contacts Table - Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr className="text-left text-gray-400 text-sm">
              <th className="pb-3 w-12">#</th>
              <th className="pb-3">Sender</th>
              <th className="pb-3">Subject</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 w-36">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact, index) => {
              const statusBadge = getStatusBadge(contact.status);
              const isUnread = contact.status === "unread";

              return (
                <tr
                  key={contact._id}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors group ${isUnread ? "bg-amber-500/5" : ""}`}
                >
                  <td className="py-3 text-gray-500 text-sm">
                    {(pagination.currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="py-3">
                    <div>
                      <p
                        className={`font-medium ${isUnread ? "text-white" : "text-gray-300"}`}
                      >
                        {contact.name}
                      </p>
                      <p className="text-gray-500 text-xs">{contact.email}</p>
                    </div>
                  </td>
                  <td className="py-3">
                    <p
                      className={`text-sm line-clamp-1 ${isUnread ? "text-white" : "text-gray-400"}`}
                    >
                      {contact.subject}
                    </p>
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}
                    >
                      {statusBadge.icon}
                      {statusBadge.label}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <FiCalendar className="w-3 h-3" />
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      {/* View & Reply Button */}
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
                        title="View & Reply"
                      >
                        <FiMessageCircle className="w-4 h-4" />
                      </button>

                      {/* Mark as Read Button (only for unread messages) */}
                      {contact.status === "unread" && (
                        <button
                          onClick={() => updateStatus(contact._id, "read")}
                          className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                          title="Mark as Read"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                      )}

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteContact(contact)}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Contacts Cards - Mobile/Tablet View */}
      <div className="lg:hidden space-y-4">
        {filteredContacts.map((contact, index) => {
          const statusBadge = getStatusBadge(contact.status);
          const isUnread = contact.status === "unread";

          return (
            <div
              key={contact._id}
              className={`bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border p-4 transition-all ${
                isUnread
                  ? "border-amber-500/30 bg-amber-500/5"
                  : "border-white/10"
              }`}
            >
              {/* Header with Status */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p
                    className={`font-semibold ${isUnread ? "text-white" : "text-gray-300"}`}
                  >
                    {contact.name}
                  </p>
                  <p className="text-gray-500 text-xs">{contact.email}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}
                >
                  {statusBadge.icon}
                  {statusBadge.label}
                </span>
              </div>

              {/* Subject */}
              <p
                className={`text-sm mb-2 ${isUnread ? "text-white" : "text-gray-400"}`}
              >
                <span className="text-gray-500">Subject:</span>{" "}
                {contact.subject}
              </p>

              {/* Date */}
              <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                <FiCalendar className="w-3 h-3" />
                {new Date(contact.createdAt).toLocaleString()}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <button
                  onClick={() => setSelectedContact(contact)}
                  className="flex-1 px-3 py-1.5 bg-amber-500/20 text-amber-400 rounded-lg text-sm hover:bg-amber-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <FiMessageCircle className="w-4 h-4" /> Reply
                </button>

                {contact.status === "unread" && (
                  <button
                    onClick={() => updateStatus(contact._id, "read")}
                    className="flex-1 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiEye className="w-4 h-4" /> Mark Read
                  </button>
                )}

                <button
                  onClick={() => deleteContact(contact)}
                  className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => fetchContacts(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1">
            {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
              let pageNum;
              if (pagination.totalPages <= 5) {
                pageNum = i + 1;
              } else if (pagination.currentPage <= 3) {
                pageNum = i + 1;
              } else if (pagination.currentPage >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i;
              } else {
                pageNum = pagination.currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => fetchContacts(pageNum)}
                  className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                    pagination.currentPage === pageNum
                      ? "bg-amber-500 text-white"
                      : "bg-white/10 text-gray-400 hover:bg-white/20"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => fetchContacts(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="p-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* View & Reply Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-linear-to-br from-[#2A2219] to-[#1C1712] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 sticky top-0 bg-[#2A2219]">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FiMail className="w-5 h-5 text-amber-400" />
                Message Details
              </h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Sender Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl">
                <div>
                  <p className="text-gray-500 text-xs">From</p>
                  <p className="text-white font-medium flex items-center gap-2">
                    <FiUser className="w-4 h-4 text-amber-400" />
                    {selectedContact.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Email</p>
                  <p className="text-white text-sm break-all">
                    {selectedContact.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Subject</p>
                  <p className="text-amber-400 font-medium">
                    {selectedContact.subject}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Received</p>
                  <p className="text-gray-300 text-sm">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Original Message */}
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-gray-500 text-xs mb-2">Original Message</p>
                <div className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                  {selectedContact.message}
                </div>
              </div>

              {/* Reply Section */}
              <div className="border-t border-white/10 pt-4">
                <label className=" text-white font-medium mb-2 flex items-center gap-2">
                  <FiSend className="w-4 h-4 text-amber-400" />
                  Reply to {selectedContact.name}
                </label>
                <textarea
                  rows="4"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 resize-none"
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendReply}
                    disabled={sendingReply}
                    className="px-4 py-2 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                  >
                    {sendingReply ? (
                      <FiLoader className="w-4 h-4 animate-spin" />
                    ) : (
                      <FiSend className="w-4 h-4" />
                    )}
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ContactAdminPage;
