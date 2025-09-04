import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected");
    });
    await mongoose.connect(`${process.env.MONGO_URI}db-sneakhub`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
