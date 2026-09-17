import { User } from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../services/cloudinary.service.js";
import { getReceiverSocketId, io } from "../library/socket.js";

export const getUsers = async (request, response, next) => {
  try {
    const loggedInUser = request.user?._id;

    if (!loggedInUser) {
      return response.status(401).json({
        message: "Unauthorized access",
      });
    }
    const users = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password",
    );

    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (request, response, next) => {
  try {
    const { id: userToChatId } = request.params;
    const myId = request.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });
    response.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (request, response, next) => {
  try {
    const { id: receiverId } = request.params;
    const senderId = request.user._id;

    // find isUser guest User or not,

    const senderUser = await User.findById(senderId).select("isGuest expireAt");
    const receiverUser =
      await User.findById(receiverId).select("isGuest expireAt");

    let messageExpireAt = null;

    if (senderUser?.isGuest || receiverUser?.isGuest) {
      messageExpireAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Set message expiration time to 24 hours from now
    }

    const { text, messageType, media, fileName, duration } = request.body;
    const mediaFile = request.file; // From multer

    // 1. Validation Gateway
    if (messageType === "text" && !text) {
      return response
        .status(400)
        .json({ message: "Cannot send an empty text message" });
    }

    if (messageType !== "text" && !media && !mediaFile) {
      return response
        .status(400)
        .json({ message: "Media is required for this message type" });
    }

    let mediaUrl = "";
    let mediaPublicId = "";

    // 2. Media Routing
    if (mediaFile || media) {
      const targetFolderConstants = {
        image: "chat-app/images",
        audio: "chat-app/audios",
        video: "chat-app/videos",
        document: "chat-app/documents",
      };

      const targetFolder =
        targetFolderConstants[messageType] || "chat-app/others";

      let dataUri;
      if (mediaFile) {
        const base64 = mediaFile.buffer.toString("base64");
        dataUri = `data:${mediaFile.mimetype};base64,${base64}`;
      } else {
        dataUri = media;
      }

      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(dataUri, {
        folder: targetFolder,
        resource_type: "auto",
      });

      mediaUrl = uploadResponse.secure_url;
      mediaPublicId = uploadResponse.public_id;
    }

    // 3. Database Construction
    const newMessage = new Message({
      senderId,
      receiverId,
      text: text || "",
      messageType: messageType || "text",
      media: {
        url: mediaUrl,
        public_id: mediaPublicId,
        fileName: fileName || "",
        duration: duration || 0,
      },
      expireAt: messageExpireAt,
    });

    await newMessage.save();

    // 4. REAL-TIME DELIVERY TRIGGER
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log(
        `⚡ Real-time message delivered to Socket: ${receiverSocketId}`,
      );
    }

    return response.status(201).json(newMessage);
  } catch (error) {
    if (error.http_code === 400 || error.message.includes("cloudinary")) {
      return response
        .status(400)
        .json({ error: "Media upload failed or file type unsupported." });
    }

    next(error);
  }
};
