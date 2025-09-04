import { requireAuth } from "@clerk/express";

const clerkAuthMiddleware = (req, res, next) => {
  // Require valid Clerk auth and mirror to req.user
  requireAuth()(req, res, (err) => {
    if (err) {
      // If Clerk rejected, return 401
      return res
        .status(401)
        .json({ error: "Unauthorized", details: err.message });
    }

    const { userId, sessionId } = req.auth || {};
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach to req.user for controllers
    req.user = { userId, sessionId };
    next();
  });
};

export default clerkAuthMiddleware;
