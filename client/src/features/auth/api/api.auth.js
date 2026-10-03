import { axiosInstance } from "@/lib/axios";

export const checkAuthApi = async () => {
  const response = await axiosInstance.get("auth/check");
  return response.data;
};

export const signUpApi = async (userData) => {
  const response = await axiosInstance.post("auth/sign-up", userData);
  return response.data;
};

export const loginApi = async (email, password) => {
  const response = await axiosInstance.post("auth/login", { email, password });
  return response.data;
};

export const guestLoginApi = async () => {
  const response = await axiosInstance.post("auth/guest-login");
  return response.data;
};

export const logoutApi = async () => {
  const response = await axiosInstance.post("auth/logout");
  return response.data;
};

