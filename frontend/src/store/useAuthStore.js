import { axiosInstance } from "@/lib/axios";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { create } from "zustand";

const BASE_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (import.meta.env.VITE_BACKEND_URL || "/").replace(
    /\/api\/?$/,
    "",
  );

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isUserLoggedIn: false,
  isUserSignUp: false,
  isGuestLoggingIn: false,
  isCheckingAuth: false,
  isUpdatingProfile: false,
  isUserLoggedOut: false,

  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const response = await axiosInstance.get("auth/check");

      const user = response.data;

      if (!user || typeof user !== "object" || !user._id) {
        throw new Error("Invalid user data received.");
      }

      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while checking authentication.";
      console.error(`Error checking authentication: ${errorMessage}`);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (userData) => {
    set({ isUserSignUp: true });
    try {
      await axiosInstance.post("auth/sign-up", userData);

      toast.success("Account created successfully!");
      get().connectSocket();
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during sign-up.";
      toast.error(errorMessage);
      console.error(`Error during sign-up: ${errorMessage}`);
      return false;
    } finally {
      set({ isUserSignUp: false });
    }
  },

  logIn: async (credentials) => {
    set({ isUserLoggedIn: true });
    try {
      const response = await axiosInstance.post("auth/login", credentials);
      set({ authUser: response.data });
      toast.success("Logged in successfully!");
      get().connectSocket();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during log-in.";
      toast.error(errorMessage);
      console.error(`Error during log-in: ${errorMessage}`);
    } finally {
      set({ isUserLoggedIn: false });
    }
  },

  guestLogin: async () => {
    set({ isGuestLoggingIn: true });
    try {
      const response = await axiosInstance.post("auth/guest-login");
      set({ authUser: response.data });
      toast.success("Logged in as guest successfully!");
      get().connectSocket();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during guest log-in.";
      toast.error(errorMessage);
      console.error(`Error during guest log-in: ${errorMessage}`);
    } finally {
      set({ isGuestLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isUserLoggedOut: true });

    try {
      await axiosInstance.post("auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during log-out.";
      toast.error(errorMessage);
      console.error(`Error during log-out: ${errorMessage}`);
    } finally {
      set({ isUserLoggedOut: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser || socket?.connected) return;

    const socketConnection = io(BASE_URL, {
      withCredentials: true,
      query: {
        userId: authUser._id,
      },
      autoConnect: false,
    });

    // console.log(`auth userId: ${authUser._id}`);

    socketConnection.connect();

    set({ socket: socketConnection });

    socketConnection.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
      console.log(`Online users updated in state: ${userIds}`);
    });
  },

  disconnectSocket: () => {
    const { socket } = get();

    if (socket?.connected) socket.disconnect();
  },
}));
