import jwt from "jsonwebtoken";
import { ENV_VARS } from "../library/env.js";

export const socketAuthMiddleware = (socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;
    if (!cookieHeader) {
      return next(new Error("Authentication error: No cookies found"));
    }

    const tokenString = cookieHeader
      .split("; ")
      .find((str) => str.startsWith("token="));
    if (!tokenString) {
      return next(new Error("Authentication error: No token found"));
    }

    const token = tokenString.split("=")[1];
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("❌ Socket Auth Failure:", error.message);
    next(new Error("Authentication error: Session expired or invalid"));
  }
};
