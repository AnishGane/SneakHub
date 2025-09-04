import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected");
    });
    const base = process.env.MONGO_URI || "";
    if (!base) {
      console.log("Missing MONGO_URI env var");
      process.exit(1);
    }
    const uri = base.endsWith("/")
      ? `${base}db-sneakhub`
      : `${base}/db-sneakhub`;
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
