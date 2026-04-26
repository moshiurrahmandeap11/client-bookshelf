import axios from "axios";

// Create instance
const axiosInstance = axios.create({
  baseURL: "https://server-bookshelf-5ws0.onrender.com/api", 
  withCredentials: true, 
});

export default axiosInstance;