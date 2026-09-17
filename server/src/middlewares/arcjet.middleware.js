import { aj, messageRateLimiter } from "../services/arcjet.service.js";

const isDeniedDecision = (decision) => {
  if (typeof decision?.isDenied === "function") {
    return decision.isDenied();
  }
  return decision?.conclusion === "DENY";
};

export const protectedAuthRoute = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 5 });

    if (isDeniedDecision(decision)) {
      if (typeof decision?.reason?.isRateLimit === "function" && decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ error: "Too many attempts. Try again later." });
      }
      if (typeof decision?.reason?.isBot === "function" && decision.reason.isBot()) {
        return res.status(403).json({ error: "Bot detected. Access denied." });
      }
      return res.status(403).json({ error: "Access denied." });
    }
    next();
  } catch (error) {
    console.error(`Arcjet Auth Protection Error: ${error}`);
    res
      .status(500)
      .json({ error: "Internal Server Error during security check" });
  }
};

export const protectMessageRoute = async (request, response, next) => {
  try {
    const decision = await messageRateLimiter.protect(request, { requested: 1 });
    if (isDeniedDecision(decision)) {
      return response.status(429).json({
        error: "You are sending messages too fast. Slow down, friend!",
      });
    }
    next();
  } catch (error) {
    console.error(`Arcjet message protection error: ${error}`);
    response
      .status(500)
      .json({ error: "Internal Server Error during security check" });
  }
};
