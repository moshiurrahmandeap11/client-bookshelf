"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";
import useAuth from "@/app/hooks/useAuth";

const AdminProtected = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {

    if (!loading) {
      if (!user) {

        router.replace("/login"); 
      } else if (user.role !== "admin") {

        router.replace("/403");
      } else {

        setIsAuthorized(true);
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }


  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtected;