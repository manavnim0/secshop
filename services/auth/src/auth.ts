import { NotFoundError } from "@secshop/common";
import { app } from "./app";
import mongoose from "mongoose";

const start = async ()=> {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET must be defined")
    }

    if (!process.env.MONGO_URI) {
        throw new NotFoundError();
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error)
    }

    const PORT = process.env.PORT || 4001
      
    app.listen(PORT, () => console.log(`Auth service running on port: ${PORT}`))
}
start()