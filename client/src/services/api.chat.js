import { axiosInstance } from "@/lib/axios"








// Get All Users
export const getUsers = async () => {
    const response = await axiosInstance.get("messages/users")
    return response.data
}


// get Messages 

export const getMessages = async (userId) => {
    const response = await axiosInstance.get(`messages/${userId}`)
    return response.data
}

// Send Message 

export const sendMessageApi = async (receiverId, messageData) => {
    const formData = new FormData()

    if (messageData.text) {
        formData.append("text", messageData.text)
    }
    if (messageData.messageType) {
        formData.append("messageType", messageData.messageType)
    }
    if (messageData.media) {
        formData.append("media", messageData.media)
    }
    // Note: messageData.mediaPreviewUrl is a UI-only blob URL for optimistic rendering
    // and is intentionally never appended to FormData.

    const response = await axiosInstance.post(`messages/send/${receiverId}`, formData)

    return response.data
}



export const transcribeAudioMessageApi = async (audioFile, receiverId) => {
    const formData = new FormData()
    formData.append("audio", audioFile, "voice_message.webm")

    const response = await axiosInstance.post(
        `messages/audio-to-text/${receiverId}`,
        formData
    )
    return response.data
}