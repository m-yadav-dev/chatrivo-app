import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import messagesRoutes from "./routes/messages.routes.js";
import { app } from "./library/socket.js";
import cors from "cors";
import { ENV_VARS } from "./library/env.js";
import { audioToTextRouter } from "./routes/audio-to-text.routes.js";

const allowedOrigins = [
  ENV_VARS.CLIENT_URL,
  "http://localhost:5173",
  "chatrivo-app.duckdns.org"
].filter(Boolean);

// Middlewares
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes

app.use("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running!", status: "active" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/messages", audioToTextRouter);

export default app;
