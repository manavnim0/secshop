import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { router as authRouter } from "./routes/auth";
import { router as productRouter } from "./routes/product";


const app = express();

// core middleware
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));

app.use(rateLimit({windowMs: 60 * 1000, limit: 100 }));

app.use("/auth",authRouter);
app.use("/product",productRouter);

app.get("/health", (_, res) => res.status(200).json({status: "ok"}));

const PORT  = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Gateway is running on ${PORT}`))