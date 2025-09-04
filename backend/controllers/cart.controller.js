import User from "../models/user.model.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { productId, size, quantity = 1 } = req.body || {};
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "Missing productId" });

    const qty = Math.max(1, Number(quantity) || 1);
    const key = size ? `${productId}_${size}` : `${productId}`;

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
    const userId = req.user?.userId;
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
    const userId = req.user?.userId;
    const { productId, size, quantity } = req.body || {};
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "Missing productId" });

    const key = size ? `${productId}_${size}` : `${productId}`;

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
