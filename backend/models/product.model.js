import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
    date: { type: String, required: true },
  },
  { _id: false }
);

const ratingSchema = new mongoose.Schema(
  {
    average: { type: Number, required: true, min: 0, max: 5 },
    count: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    gender: {
      type: String,
      enum: ["men", "women", "unisex", "kids"],
      required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    discountPercent: { type: Number, min: 0, max: 100 },
    currency: { type: String, required: true },
    sizes: { type: [Number], default: [] },
    colors: { type: [String], default: [] },
    isBestSeller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    stock: { type: Number, required: true, min: 0 },
    sku: { type: String, required: true, unique: true },
    tags: { type: [String], default: [] },
    image: { type: String, required: true },
    rating: { type: ratingSchema, required: true },
    reviews: { type: [reviewSchema], default: [] },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
