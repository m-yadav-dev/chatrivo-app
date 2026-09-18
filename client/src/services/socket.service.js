import io from "socket.io-client";

const BASE_URL = import.meta.env.VITE_SOCKET_URL;

let socket = null;
export const connectSocket = async (userId) => {
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
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null; // Reset the socket instance after disconnecting
  }
};

// Use this function to get the current socket instance
export const getSocket = () => socket;



export const subscribeToNewMessages = async () => {
  
}


export const unSubscribeToNewMessages = async () => {

}