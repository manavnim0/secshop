import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Auth service connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => console.log(`Auth service running on port: ${PORT}`));
};

start();