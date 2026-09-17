import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    lastSeen: {
      type: Date,
      default: null,
    },
    profilePic: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "Hey there! I am using NexusChat.",
    },
    phone: {
      type: String,
      default: "",
    },
    isGuest: {
      type: Boolean,
      default: false,
    }, 
    expireAt: {
      type: Date,
      expires: 0
    }
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
