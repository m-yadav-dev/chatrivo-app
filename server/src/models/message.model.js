import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "video", "audio", "document", "audio-transcription"],
      default: "text",
      required: true,
    },
    text: {
      type: String,
      default: "",
      trim: true,
      maxLength: 1000,
    },
    media: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
      fileName: { type: String, default: "" },
      duration: { type: Number, default: 0 },
      fileSize: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
    isRead: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true },
);

messageSchema.index({
  senderId: 1,
  receiverId: 1,
});

messageSchema.index({
  createdAt: -1,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
