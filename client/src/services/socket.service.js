import io from "socket.io-client";

const BASE_URL = import.meta.env.VITE_SOCKET_URL;

let socket = null;



export const socketService = {


  connectSocket: (userId) => {
    // If the socket is already connected, return the existing socket instance
    if (socket?.connected) return socket;

    // Create a new socket connection
    socket = io(BASE_URL, {
      withCredentials: true,
      query: {
        userId,
      },
    });

    // Handle socket connection events
    socket.connect();

    return socket;
  },


  disconnectSocket: () => {
    if (socket?.connected) {
      socket.disconnect();
      socket = null; // Reset the socket instance after disconnecting
    }
  },

  getSocket: () => socket,


  subscribeToNewMessages: (onMessageReceivedCallback) => {

    if (!socket) return

    socket.on("newMessage", onMessageReceivedCallback)

    return () => {
      socket.off("newMessage", onMessageReceivedCallback)
    }

  }


}




