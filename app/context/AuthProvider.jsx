"use client"
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../components/sharedComponents/axiosInstance/axiosInstance";
import { FiLoader } from "react-icons/fi";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

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

  // Google login - Firebase থেকে ইউজার ডাটা নিয়ে ব্যাকএন্ডে পাঠানো
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user: firebaseUser } = result;
      
      const userData = {
        fullName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        email: firebaseUser.email,
        profilePicture: firebaseUser.photoURL,
        googleId: firebaseUser.uid
      };
      
      const response = await axiosInstance.post("/users/google-login", userData);
      
      if (response.data.success && response.data.token) {
        setAuthToken(response.data.token);
        setUser(response.data.user);
        return response.data;
      }
    } catch (error) {
      console.error("Google login error:", error);
      throw error.response?.data || { success: false, message: "Google login failed" };
    } finally {
      setLoading(false);
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
    googleLogin,
    register,
    logout,
    updateProfile,
    refetchUser: () => fetchUser(token),
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C1712] via-[#2A2219] to-[#1C1712] flex items-center justify-center">
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