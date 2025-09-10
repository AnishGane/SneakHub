import express from "express";
import {
  addProduct,
  removeProduct,
  listProducts,
  singleProduct,
  searchProducts,
} from "../controllers/product.controller.js";
import upload from "../middlewares/multer.js";
// import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Route to add a new product (single image upload or pass image URL)
productRouter.post("/add", upload.single("image"), addProduct);
// Route to remove a product
productRouter.delete("/remove/:id", removeProduct);
productRouter.post("/remove", removeProduct);
// Route to list all products to all user
productRouter.get("/list", listProducts);
// Route to get a single product by ID
productRouter.get("/single/:id", singleProduct);
// productRouter.post("/single", singleProduct);

// Search products
productRouter.get("/search", searchProducts);

export default productRouter;
