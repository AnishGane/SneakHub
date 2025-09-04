import { requireAuth } from "@clerk/express";

const baseRequireAuth = requireAuth();

const clerkAuthMiddleware = (req, res, next) => {
  baseRequireAuth(req, res, (err) => {
    if (err) return; // requireAuth already handled response
    // Mirror into req.user for existing controller usage
    const userId = req.auth?.userId;
    const sessionId = req.auth?.sessionId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = { userId, sessionId };
    next();
  });
};

export default clerkAuthMiddleware;
