import express , { Express } from "express";
import { connectDB } from  "./connect"; 
import { config } from "./config";
import { healthRouter } from "./health.js";
export * from "./models/user";

const app: Express =  express();
app.use(express.json());
app.use("/health",healthRouter);

const start = async () => {
    await connectDB
    app.listen(config.port, ()=>{console.log(`✅ DB Service running on port ${config.port}`);});
}

start();