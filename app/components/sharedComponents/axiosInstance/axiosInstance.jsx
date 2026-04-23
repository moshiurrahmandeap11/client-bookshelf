import axios from "axios";

// Create instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // change if needed
  withCredentials: true, // important if you use httpOnly cookies
});

export default axiosInstance;