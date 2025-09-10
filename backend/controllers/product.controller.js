import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model.js";

// helpers
const toArray = (val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {}
    return val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

// Function to add products aligned to Product schema (Working fine in postman till now)
const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      gender,
      description,
      price,
      originalPrice,
      discountPercent,
      currency,
      sizes,
      colors,
      isBestSeller,
      isNewArrival,
      stock,
      sku,
      tags,
      image: imageUrlFromBody,
      rating,
      reviews,
    } = req.body || {};

    // Determine image: either uploaded (req.file) or provided URL
    let imageUrl = imageUrlFromBody;
    const uploaded = req.file;
    if (uploaded) {
      const uploadRes = await cloudinary.uploader.upload(uploaded.path, {
        resource_type: "image",
      });
      imageUrl = uploadRes.secure_url;
    }
    if (!imageUrl) {
      return res.json({ success: false, message: "Image is required" });
    }

    const productData = {
      name,
      brand,
      gender,
      description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      discountPercent: discountPercent ? Number(discountPercent) : undefined,
      currency,
      sizes: toArray(sizes).map((n) => Number(n)),
      colors: toArray(colors),
      isBestSeller: isBestSeller === "true" || isBestSeller === true,
      isNewArrival: isNewArrival === "true" || isNewArrival === true,
      stock: Number(stock ?? 0),
      sku,
      tags: toArray(tags),
      image: imageUrl,
      rating: rating
        ? {
            average: Number(rating.average) || 0,
            count: Number(rating.count) || 0,
          }
        : { average: 0, count: 0 },
      reviews: Array.isArray(reviews) ? reviews : [],
    };

    // Remove undefined keys
    Object.keys(productData).forEach(
      (k) => productData[k] === undefined && delete productData[k]
    );

    const product = new Product(productData);
    await product.save();

    res.json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log("Error in adding product:", error);
    res.json({
      message: `Error in adding product: ${error.message}`,
      success: false,
    });
  }
};

// Function to remove products (Working fine in postman)
const removeProduct = async (req, res) => {
  try {
    const id = req.params?.id || req.body?.id;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.json({
        message: "Product not found",
        success: false,
      });
    }

    res.json({
      message: "Product removed successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in removing product:", error);
    res.json({
      message: `Error in removing product: ${error.message}`,
      success: false,
    });
  }
};

// Function to list the products (Working fine)
const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return res.json({
        success: false,
        message: "No products found",
        products: [],
      });
    }
    res.json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log("Error in listing products:", error);
    res.json({
      message: `Error in listing products: ${error.message}`,
      success: false,
    });
  }
};

// Function for single products info (Working fine)
const singleProduct = async (req, res) => {
  try {
    const productId = req.params?.id || req.body?.productId;
    const product = await Product.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.json({
      message: `Error in listing product: ${error.message}`,
      success: false,
    });
  }
};

export { addProduct, removeProduct, listProducts, singleProduct };

// Search products by name/brand/tags using case-insensitive regex (Working fine)
export const searchProducts = async (req, res) => {
  try {
    const q = (req.query?.q || "").toString().trim();
    if (!q) {
      return res.json({ success: true, products: [] });
    }
    const regex = new RegExp(q, "i");
    const products = await Product.find({
      $or: [{ name: regex }, { brand: regex }, { tags: regex }],
    });
    return res.json({ success: true, products });
  } catch (error) {
    console.log("Error in searching products:", error);
    return res.status(500).json({
      success: false,
      message: `Error in searching products: ${error.message}`,
    });
  }
};
