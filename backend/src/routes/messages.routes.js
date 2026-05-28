import { authRouteMiddleware } from "../middlewares/auth.middleware.js";
import express from "express";
import multer from "multer";
import {
  getMessages,
  getUsers,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectMessageRoute } from "../middlewares/arcjet.middleware.js";
import { errorHandler } from "../middlewares/errorHandler.middleware.js";
const messageRoute = express.Router();

messageRoute.use(authRouteMiddleware);

const upload = multer({ storage: multer.memoryStorage() });
messageRoute.get("/users", getUsers);
messageRoute.get("/:id", getMessages);
messageRoute.post(
  "/send/:id",
  protectMessageRoute,
  upload.single("media"),
  sendMessage,
);

messageRoute.use(errorHandler);

export default messageRoute;
