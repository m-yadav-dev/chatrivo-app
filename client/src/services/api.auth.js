import { axiosInstance } from "@/lib/axios";

export const checkAuth = async () => {
  const response = await axiosInstance.get("auth/check");
  return response.data;
};

export const signUp = async (userData) => {
  const response = await axiosInstance.post("auth/sign-up", userData);
  return response.data;
};

export const login = async (email, password) => {
  const response = await axiosInstance.post("auth/login", { email, password });
  return response.data;
};

export const guestLogin = async () => {
  const response = await axiosInstance.post("auth/guest-login");
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("auth/logout");
  return response.data;
};


export const connectSocket = async () => {
    
}