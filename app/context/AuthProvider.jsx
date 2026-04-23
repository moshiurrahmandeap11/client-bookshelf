"use client"
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../components/sharedComponents/axiosInstance/axiosInstance";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);


  const setAuthToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      setToken(newToken);
    } else {
      localStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common["Authorization"];
      setToken(null);
    }
  };

  // get current user
  const fetchUser = async () => {

    if (!token) {
      setLoading(false);
      return;
    }

    try {

      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axiosInstance.get("/users/me");
      setUser(res.data.user);
    } catch (error) {
      console.error("Fetch user error:", error);

      if (error.response?.status === 401 || error.response?.status === 403) {
        setAuthToken(null);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]); 


  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/users/login", { email, password });
      
      if (res.data.success && res.data.token) {
  
        setAuthToken(res.data.token);
        setUser(res.data.user);
      }
      
      return res.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error.response?.data || { success: false, message: "Login failed" };
    }
  };


  const register = async (userData) => {
    try {
      const res = await axiosInstance.post("/users/register", userData);
      
      if (res.data.success && res.data.token) {

        setAuthToken(res.data.token);
        setUser(res.data.user);
      }
      
      return res.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error.response?.data || { success: false, message: "Registration failed" };
    }
  };


  const logout = async () => {
    try {
      if (token) {
        await axiosInstance.post("/users/logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {

      setAuthToken(null);
      setUser(null);
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
      console.error("Update profile error:", error);
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
    refetchUser: fetchUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;