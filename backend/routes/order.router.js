import express from "express";

import {
  placeOrder,
  //   allOrders,
  userOrders,
  //   updateStatus,
  updateOrderPaymentStatus,
} from "../controllers/order.controller.js";
// import adminAuth from "../middleware/adminAuth.js";
import clerkAuthMiddleware from "../middlewares/clerkAuth.js";

const orderRouter = express.Router();

// For Admin
// orderRouter.post("/list", adminAuth, allOrders);
// orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", clerkAuthMiddleware, placeOrder); //COD Method
// orderRouter.post("/esewa", authUser, placeOrderEsewa);

// For User
orderRouter.post("/userorders", clerkAuthMiddleware, userOrders);
orderRouter.post(
  "/updatePaymentStatus",
  clerkAuthMiddleware,
  updateOrderPaymentStatus
);

export default orderRouter;
