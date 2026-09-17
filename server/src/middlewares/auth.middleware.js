import { User } from "../models/user.model.js";
import { ENV_VARS } from "../library/env.js";
import jwt from "jsonwebtoken";

export const authRouteMiddleware = async (request, response, next) => {
  try {
    const token = request.cookies.token;
    if (!token) {
      return response.status(401).json({
        error: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decoded) {
      return response.status(401).json({
        message: "Unauthorized - Invalid token",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return response.status(401).json({
        message: "Unauthorized - User not found",
      });
    }
    request.user = user;
    next();
  } catch (error) {
    console.log(`Error in authRouteMiddleware: ${error.message}`);
    response.status(500).json({ error: "Internal server error" });
  }
};
