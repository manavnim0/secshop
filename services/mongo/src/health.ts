import  { Router } from "express";
import mongoose from "mongoose";

const router: Router = Router();


router.get("/health", (_req, res) =>{  
    const ready = mongoose.connection.readyState === 1;
    res.status(ready ? 200 : 500).send({
    status: ready ? "Database healthy" : "Database not connected",
  });
})


export { router as healthRouter};