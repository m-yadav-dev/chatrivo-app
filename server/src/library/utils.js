import jwt from "jsonwebtoken";
import { ENV_VARS } from "./env.js";

export const generateToken = (userId, response) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
    expiresIn: "7d",
  });

  response.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "none",
    // secure: ENV_VARS.NODE_ENV === "production",
    secure: true,
    path: "/",
  });

  return token;
};
