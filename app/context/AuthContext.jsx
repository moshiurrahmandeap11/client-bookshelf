"use client"
import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  loading: true,
  token: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  updateProfile: () => {},
  refetchUser: () => {},
});