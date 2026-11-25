import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import dotenv from "dotenv";
import { ENV_VARS } from "../library/env.js";
dotenv.config();

console.log(`Arcjet API Key Loaded: ${Boolean(ENV_VARS.ARCJET_KEY)}`);

export const aj = arcjet({
  key: ENV_VARS.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
  ],
});

export const messageRateLimiter = arcjet({
  key: ENV_VARS.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: "10s",
      capacity: 10,
    }),
  ],
});
