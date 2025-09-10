import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    // const = req.user?.userId;
    const { userId, productId, size, color, quantity = 1 } = req.body || {};
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "Missing productId" });

    // optional: validate color against product
    let normalizedColor = (color || "").toString().trim();
    if (normalizedColor) {
      try {
        const product = await Product.findById(productId).select("colors");
        if (
          product &&
          Array.isArray(product.colors) &&
          product.colors.length > 0
        ) {
          const lowerColors = product.colors.map((c) =>
            (c || "").toString().trim().toLowerCase()
          );
          const match = lowerColors.find(
            (c) => c === normalizedColor.toLowerCase()
          );
          if (!match) {
            return res.status(400).json({
              success: false,
              message: "Selected color not available for this product",
            });
          }
          normalizedColor = match; // store normalized
        }
      } catch (_) {
        // if validation fails silently, proceed without blocking add-to-cart
      }
    }

    const qty = Math.max(1, Number(quantity) || 1);
    const keyParts = [productId];
    if (size) keyParts.push(size);
    if (normalizedColor) keyParts.push(normalizedColor);
    const key = keyParts.join("_");

    const update = { $inc: {} };
    update.$inc[`cartData.${key}`] = qty;

    const user = await User.findByIdAndUpdate(userId, update, {
      new: true,
      upsert: false,
    }).select("cartData");

    return res.json({ success: true, cart: user?.cartData || {} });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add to cart" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body?.userId;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    const user = await User.findById(userId).select("cartData");
    return res.json({ success: true, cart: user?.cartData || {} });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to get cart" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body?.userId;
    const { productId, size, color, quantity } = req.body || {};
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "Missing productId" });

    const normalizedColor = (color || "").toString().trim().toLowerCase();
    const key = [productId, size, normalizedColor].filter(Boolean).join("_");

    let update;
    if (quantity === 0) {
      update = { $unset: {} };
      update.$unset[`cartData.${key}`] = "";
    } else if (typeof quantity !== "undefined") {
      const qty = Math.max(1, Number(quantity) || 1);
      update = { $set: {} };
      update.$set[`cartData.${key}`] = qty;
    } else {
      update = { $inc: {} };
      update.$inc[`cartData.${key}`] = 1;
    }

    const user = await User.findByIdAndUpdate(userId, update, {
      new: true,
      upsert: false,
    }).select("cartData");
    return res.json({ success: true, cart: user?.cartData || {} });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update cart" });
  }
};
