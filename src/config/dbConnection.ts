import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const URI = process.env.MONGODB_URL as string;
    await mongoose.connect(URI, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
