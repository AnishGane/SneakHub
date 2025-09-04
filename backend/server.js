import express from "express";
import "dotenv/config";
import connectDB from "./config/MongoDB.js";
import connectCloudinary from "./config/Cloudinary.js";
import clerkWebHooks from "./controllers/WebHook.js";
import bodyParser from "body-parser";
import cartRouter from "./routes/cart.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.router.js";

const app = express();
const PORT = process.env.PORT;

connectDB();
connectCloudinary();

// Webhook must receive the raw body for signature verification
app.post(
  "/webhooks",
  bodyParser.raw({ type: "application/json" }),
  clerkWebHooks
);

// JSON for normal routes (registered AFTER webhook so it doesn't consume raw body)
app.use(express.json());

app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

app.use("/", (req, res) => {
  res.send("Hello World");
});

// On Vercel, export the app instead of listening
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
