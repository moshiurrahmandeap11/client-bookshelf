"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiBookOpen,
  FiUsers,
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiHome,
  FiBarChart2,
  FiPlusCircle,
  FiList,
  FiTag,
  FiStar,
  FiLogOut,
  FiUserCheck
} from "react-icons/fi";
import useAuth from "@/app/hooks/useAuth";

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [openSubmenus, setOpenSubmenus] = useState({});


  useEffect(() => {
    const savedSubmenus = localStorage.getItem("adminSubmenus");
    if (savedSubmenus) {
      setOpenSubmenus(JSON.parse(savedSubmenus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adminSubmenus", JSON.stringify(openSubmenus));
  }, [openSubmenus]);

  const toggleSubmenu = (name) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

 
  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: FiBarChart2,
    },
    {
      name: "Books",
      icon: FiBookOpen,
      submenu: [
        { name: "All Books", href: "/admin/books", icon: FiList },
        { name: "Add New Book", href: "/admin/books/add", icon: FiPlusCircle },
        { name: "Categories", href: "/admin/categories", icon: FiTag },
      ],
    },
    {
      name: "Users",
      icon: FiUsers,
      submenu: [
        { name: "All Users", href: "/admin/users", icon: FiUsers },
        { name: "Admins", href: "/admin/users/admins", icon: FiUserCheck },
      ],
    },
    {
      name: "Settings",
      icon: FiSettings,
      submenu: [
        { name: "General", href: "/admin/settings", icon: FiSettings },
        { name: "Security", href: "/admin/settings/security", icon: FiSettings },
      ],
    },
  ];

  const isActive = (href) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const isSubmenuActive = (submenuItems) => {
    return submenuItems?.some((item) => isActive(item.href));
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 bg-linear-to-b from-[#2A2219] to-[#1C1712] border-r border-white/10 ${
        collapsed ? "w-20" : "w-64"
      } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 h-16">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <FiBookOpen className="w-6 h-6 text-amber-500" />
            <span className="text-xl font-bold bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              BookShelf
            </span>
            <span className="text-xs text-amber-500 bg-amber-500/20 px-1.5 py-0.5 rounded">Admin</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/admin" className="flex justify-center w-full">
            <FiBookOpen className="w-6 h-6 text-amber-500" />
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block p-1 rounded-lg hover:bg-white/10 text-gray-400"
        >
          {collapsed ? <FiChevronRight className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* User Info */}
      <div className={`p-4 border-b border-white/10 ${collapsed ? "text-center" : ""}`}>
        <div className={`flex ${collapsed ? "justify-center" : "items-center gap-3"}`}>
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
            { <img src={user?.profilePicture} alt={user?.fullName} className="w-full h-full rounded-full" /> ||user?.fullName?.charAt(0).toUpperCase() || "A"}
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-white text-sm font-medium truncate">{user?.fullName}</p>
              <p className="text-amber-400 text-xs">Administrator</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isOpen = openSubmenus[item.name];
          const isItemActive = item.href ? isActive(item.href) : false;
          const isSubmenuActiveFlag = hasSubmenu && isSubmenuActive(item.submenu);

          if (!hasSubmenu) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                  isItemActive
                    ? "bg-amber-500/20 text-amber-400"
                    : "text-gray-400 hover:text-amber-400 hover:bg-white/5"
                }`}
              >
                <Icon className={`w-5 h-5 ${isItemActive ? "text-amber-400" : "group-hover:text-amber-400"}`} />
                {!collapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          }

          return (
            <div key={item.name} className="space-y-1">
              <button
                onClick={() => toggleSubmenu(item.name)}
                className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                  isSubmenuActiveFlag
                    ? "bg-amber-500/20 text-amber-400"
                    : "text-gray-400 hover:text-amber-400 hover:bg-white/5"
                }`}
              >
                <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
                  <Icon className={`w-5 h-5 ${isSubmenuActiveFlag ? "text-amber-400" : "group-hover:text-amber-400"}`} />
                  {!collapsed && <span className="text-sm">{item.name}</span>}
                </div>
                {!collapsed && (
                  <span>
                    {isOpen ? <FiChevronDown className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
                  </span>
                )}
              </button>
              {!collapsed && isOpen && (
                <div className="ml-6 pl-2 space-y-1 border-l border-white/10">
                  {item.submenu.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = isActive(sub.href);
                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                          isSubActive
                            ? "bg-amber-500/20 text-amber-400"
                            : "text-gray-400 hover:text-amber-400 hover:bg-white/5"
                        }`}
                      >
                        <SubIcon className="w-4 h-4" />
                        <span className="text-sm">{sub.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Links */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-1 bg-linear-to-b from-[#1C1712] to-[#2A2219]">
        <Link
          href="/"
          className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-xl text-gray-400 hover:text-amber-400 hover:bg-white/5 transition-all duration-300 group`}
        >
          <FiHome className="w-5 h-5" />
          {!collapsed && <span className="text-sm">Back to Site</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={`flex items-center w-full ${collapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 group`}
        >
          <FiLogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;