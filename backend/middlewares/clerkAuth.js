import { requireAuth } from "@clerk/express";

// Clerk auth middleware: validates Bearer JWT, exposes req.auth and mirrors to req.user
const clerkAuthMiddleware = (req, res, next) => {
  requireAuth()(req, res, (err) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { userId, sessionId } = req.auth || {};
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = { userId, sessionId };
    next();
  });
};

export default clerkAuthMiddleware;
