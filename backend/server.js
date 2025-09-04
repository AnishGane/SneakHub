import express from "express";
import "dotenv/config";
import connectDB from "./config/MongoDB.js";
import connectCloudinary from "./config/Cloudinary.js";
import clerkWebHooks from "./controllers/WebHook.js";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT;

// JSON for normal routes
app.use(express.json());
connectDB();
connectCloudinary();

// Webhook must receive the raw body for signature verification
app.post("/webhooks", bodyParser.raw({ type: "*/*" }), clerkWebHooks);

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
