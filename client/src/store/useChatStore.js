import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";
import { sendMessageApi, transcribeAudioMessageApi } from "@/services/api.chat";
import { socketService } from "@/services/socket.service";
import { useChatUIStore } from "./useChatUIStore";

export const useChatStore = create((set, get) => ({
  isMessagesLoading: false,
  isMessageSending: false,
  messages: [],
  isMediaFileUploading: false,
  users: [],
  isUsersLoading: false,

  isAudioTranscribing: false,

  // Fetch users for chat
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("messages/users");
      set({ users: response.data });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching users.";
      console.error(`Error fetching users: ${errorMessage}`);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch messages for chat
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching messages.";
      console.error(`Error fetching messages: ${errorMessage}`);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // /send/:id API endpoint for sending messages is handled in the backend, so we don't need to implement it here in the store. Instead, we can call that API directly from the component when sending a message.
  sendMessage: async (messageData) => {
    const { messages } = get();
    const { selectedUser } = useChatUIStore.getState();
    const { authUser } = useAuthStore.getState();

    const receiverId = selectedUser?._id;
    const senderId = authUser?._id;

    const tempId = `temp-${Date.now()}`;

    if (!receiverId || !senderId) return;

    const optimisticMessage = {
      _id: tempId,
      senderId,
      receiverId,
      text: messageData.text || "",
      messageType: messageData.media
        ? messageData.messageType || "image"
        : "text",
      media: messageData.mediaPreviewUrl
        ? { url: messageData.mediaPreviewUrl }
        : null,
      createdAt: new Date().toISOString(),
    };
    set({ messages: [...messages, optimisticMessage] });
    set({ isMessageSending: true });

    try {
      const realMessage = await sendMessageApi(receiverId, messageData);
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === tempId ? realMessage : msg,
        ),
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while sending the message.";
      console.error(`Error sending message: ${errorMessage}`);

      // Remove the optimistic message on error
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== tempId),
      }));
      toast.error("Failed to send message. Please try again.");
      set({ isMessageSending: false });
    } finally {
      set({ isMessageSending: false });
    }
  },

  //path: /api/messages/audio-to-text/:id  send audio message to transcribe and get text response from n8n workflow

  transcribeAudioMessage: async (audioFile, receiverId) => {
    //  Step 1: Loading state for audio transcription
    set({ isAudioTranscribing: true });
    try {

      const responseData = await transcribeAudioMessageApi(audioFile, receiverId);
      // push the transcribed message to messages state to show in UI immediately after transcription

      set((state) => ({
        messages: [...state.messages, responseData],
      }));

    } catch (error) {
      console.error("Error transcribing audio message:", error);
      console.log("Error details:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while transcribing the audio message.";
      toast.error(errorMessage);
    } finally {
      set({ isAudioTranscribing: false });
    }
  },

  // connect to socket server and listen for typing events

  setupMessageListener: () => {
    const { selectedUser } = useChatUIStore.getState();
    const socket = useAuthStore.getState().socket;
    if (!socket || !selectedUser) return;

    const cleanupListner = socketService.subscribeToNewMessages((newMessage) => {
      const currentSelectedUser = useChatUIStore.getState().selectedUser
      const isForCurrentUser = newMessage.senderId == currentSelectedUser._id || newMessage.receiverId === currentSelectedUser._id

      if (isForCurrentUser) {
        set((state) => ({
          messages: [...state.messages, newMessage]
        }))
      }
    });

    return cleanupListner;
  }
}));
