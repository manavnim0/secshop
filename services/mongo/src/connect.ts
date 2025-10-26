import mongoose from "mongoose";
import { NotFoundError } from "@secshop/common"; 
import { config }from "./config"; 

export const connectDB = async () => {
  const mongoUri = config.mongoURI;
  if (!mongoUri) {
    throw new Error("Mongo URI must be defined");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw new NotFoundError(); // Optional: replace with a DB-specific error
  }
};
