import axios from "axios";
import FormData from "form-data";
import { ENV_VARS } from "../library/env.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../library/socket.js";

export const transcribeAudio = async (request, response, next) => {
  try {
    const { id } = request.params; // You can extract any necessary parameters from the request if needed
    console.log(
      `Step 1: Received audio file for transcription from user ID: ${request.user._id}, intended for receiver ID: ${id}`,
    );
    console.log(
      `Step 2: Audio file details: ${request.file ? `Original Name: ${request.file.originalname}, Size: ${request.file.size} bytes, MIME Type: ${request.file.mimetype}` : "No file uploaded"}`,
    );
    if (!request.file) {
      // Check if a file was uploaded or not
      return response.status(400).json({ error: "No audio file uploaded." });
    }

    const formData = new FormData();
    console.log(
      `Appending audio file to FormData with original name: ${request.file.originalname}`,
    );
    formData.append("file", request.file.buffer, {
      // Use the original file name or a default one
      filename: "voice_message.webm", // or use the original file name
      contentType: request.file.mimetype,
    });

    const n8nWebhookUrl = ENV_VARS.N8N_WEBHOOK_URL; // Use the environment variable for the n8n webhook URL
    console.log(`Sending audio file to n8n webhook at URL: ${n8nWebhookUrl}`);
    const n8nResponse = await axios.post(n8nWebhookUrl, formData, {
      headers: {
        ...formData.getHeaders(), // Include the correct headers for multipart/form-data
      },
    });

    console.log(
      `Step 3: Received response from n8n: ${JSON.stringify(n8nResponse.data)}`,
    );

    const transcribedText = n8nResponse.data.text; // Assuming n8n returns the transcribed text in this field
    console.log(`Step 4: Extracted transcribed text: ${transcribedText}`);
    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Set message expiration time to 24 hours from now

    // Create a new message using the polymorphic Message model
    const newMessage = new Message({
      senderId: request.user._id, // Assuming the authenticated user is the sender
      receiverId: id, // Use the ID from the route parameters
      text: transcribedText, // Use the transcribed text as the message content
      messageType: "audio-transcription", // You can set a specific message type for transcriptions
      expireAt, // Set the expiration time for the audio-transcribed message
    });

    // Save the message to the database
    await newMessage.save();

    const realTimeReceiverSocketId = getReceiverSocketId(id);
    if (realTimeReceiverSocketId) {
      // emit is used to send the new message to the receiver in real-time
      // emit means to send an event to the client with the specified socket ID. In this case, it sends a "newMessage" event along with the new message data to the receiver's socket, allowing the receiver to receive the new message in real-time without needing to refresh or poll for new messages.
      io.to(realTimeReceiverSocketId).emit("newMessage", newMessage); // Emit the new message to the receiver in real-time
      console.log(
        `✨ Emitted new message to socket ID: ${realTimeReceiverSocketId}`,
      );
    }

    response.status(201).json({
      success: true,
      message: "Audio file transcribed successfully.",
      data: newMessage,
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};
