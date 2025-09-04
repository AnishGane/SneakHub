import express from "express";
import clerkAuthMiddleware from "../middlewares/clerkAuth.js";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();
cartRouter.post("/add", clerkAuthMiddleware, addToCart);
cartRouter.post("/get", clerkAuthMiddleware, getUserCart);
cartRouter.post("/update", clerkAuthMiddleware, updateCart);

export default cartRouter;
