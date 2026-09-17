import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.error("Arcjet blocked request: too many attempts.");
    }

    if (error.response?.status === 401) {
      console.warn("Session expired. User needs to login again.");
    }

    return Promise.reject(error);
  },
); 