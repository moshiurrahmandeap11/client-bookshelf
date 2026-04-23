"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;

  return children;
};

export default PrivateRoute;