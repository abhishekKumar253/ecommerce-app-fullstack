import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(config.databaseUrl);
    console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
