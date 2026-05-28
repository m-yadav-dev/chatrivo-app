import express from "express";
import {
  signUp,
  login,
  logout,
  updateProfile,
  checkAuth,
  guestLogin,
} from "../controllers/auth.controller.js";
import { protectedAuthRoute } from "../middlewares/arcjet.middleware.js";
import { authRouteMiddleware } from "../middlewares/auth.middleware.js";
import { errorHandler } from "../middlewares/errorHandler.middleware.js";
const authRoute = express.Router();

authRoute.post("/guest-login", protectedAuthRoute, guestLogin);

authRoute.post("/sign-up", protectedAuthRoute, signUp);
authRoute.post("/login", protectedAuthRoute, login);
authRoute.post("/logout", logout);
authRoute.put("/update-profile", authRouteMiddleware, updateProfile);
authRoute.get("/check", authRouteMiddleware, checkAuth);

authRoute.use(errorHandler);

export default authRoute;
