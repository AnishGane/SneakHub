import express from "express";
import "dotenv/config";
import connectDB from "./config/MongoDB.js";
import connectCloudinary from "./config/Cloudinary.js";
import clerkWebHooks from "./controllers/WebHook.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
connectDB();
connectCloudinary();

app.use("/", (req, res) => {
  res.send("Hello World");
});
// from controller
app.post("/webhooks", clerkWebHooks);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
