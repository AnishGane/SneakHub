import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected");
    });
    const uri = process.env.MONGO_URI || "";
    if (!uri) {
      console.log("Missing MONGO_URI env var");
      process.exit(1);
    }
    console.log(
      "Connecting to MongoDB...",
      uri.replace(/(:)([^@]*)(@)/, "$1****$3")
    );
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
