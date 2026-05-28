import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { errorHandler } from "../middlewares/errorHandler.middleware.js";
import { transcribeAudio } from "../controllers/audio-to-text.controller.js";
import { authRouteMiddleware } from "../middlewares/auth.middleware.js";
const audioToTextRouter = express.Router();

audioToTextRouter.post(
  "/audio-to-text/:id",
  authRouteMiddleware, // Ensure the user is authenticated before allowing access to this route
  upload.single("audio"), // Use multer middleware to handle single file upload with the field name "audio"
  transcribeAudio, // Controller function to handle the transcription logic
);

audioToTextRouter.use(errorHandler);

export { audioToTextRouter };
