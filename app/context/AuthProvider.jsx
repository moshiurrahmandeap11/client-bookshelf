"use client"
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../components/sharedComponents/axiosInstance/axiosInstance";
import { FiLoader } from "react-icons/fi";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false); 


  const setAuthToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      setToken(newToken);
    } else {
      localStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common["Authorization"];
      setToken(null);
      setUser(null);
    }
  };

  // get current user
  const fetchUser = async (authToken) => {
    if (!authToken) {
      setLoading(false);
      setIsInitialized(true);
      return;
    }

    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
      const res = await axiosInstance.get("/users/me");

      setUser(res.data.user);
    } catch (error) {

      if (error.response?.status === 401 || error.response?.status === 403) {
        setAuthToken(null);
      }
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  };


  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchUser(savedToken);  
    } else {
      setLoading(false);
      setIsInitialized(true);
    }
  }, []);

  // login
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/users/login", { email, password });
      
      if (res.data.success && res.data.token) {
        setAuthToken(res.data.token);
        setUser(res.data.user);
      }
      
      return res.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error.response?.data || { success: false, message: "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // register
  const register = async (userData) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/users/register", userData);
      
      if (res.data.success && res.data.token) {
        setAuthToken(res.data.token);
        setUser(res.data.user);
      }
      
      return res.data;
    } catch (error) {

      throw error.response?.data || { success: false, message: "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  // logout
  const logout = async () => {
    try {
      if (token) {
        await axiosInstance.post("/users/logout");
      }
    } catch (error) {

    } finally {
      setAuthToken(null);
    }
  };

  const updateProfile = async (formData) => {
    try {
      const res = await axiosInstance.put("/users/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (res.data.success) {
        setUser(res.data.user);
      }
      
      return res.data;
    } catch (error) {

      throw error.response?.data || { success: false, message: "Update failed" };
    }
  };

  const authInfo = {
    user,
    loading,
    token,
    login,
    register,
    logout,
    updateProfile,
    refetchUser: () => fetchUser(token),
  };


  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;