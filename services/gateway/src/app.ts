import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import { errorHandler, currentUser } from "@secshop/common";
// import * as jwt from "jsonwebtoken";
// import { NextFunction } from "http-proxy-middleware/dist/types";
const app: Express = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.set("trust proxy", true);

// --- Gateway health check ---
app.get("/health", (_req, res)=>{
  res.status(200).json({status:"gateway server healthy"});
})

// --- debug helper Middleware ---
app.use((req, _res, next) => {
  console.log(`🛰️ Incoming Request → ${req.method} ${req.originalUrl}`)
  next();
})

// --- Auth Service Proxy ---
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://auth:4001",
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "/" },
    logLevel: "debug", // enables proxy-level logs
    onProxyReq(proxyReq, req) {
      console.log(`➡️  Forwarding to Auth Service: ${req.method} ${req.originalUrl}`);
      console.log(`   Headers:`, JSON.stringify(req.headers, null, 2));
    },
    onProxyRes(proxyRes, req, res) {
      console.log(`✅ Auth Service responded with status ${proxyRes.statusCode} for ${req.method} ${req.originalUrl}`);
    },
    onError(err, _req, res) {
      console.error("❌ Auth proxy error:", err.message);
      res.writeHead(502);
      res.end("Bad Gateway");
    },
    } as any)
  //   onError(err, _req, res) {
  //     console.error("Auth proxy error:", err);
  //     res.writeHead(502);
  //     res.end("Bad Gateway");
  //   }
  // } as any)
);

// --- Product Service Proxy ---
app.use(
  "/api/products",
  createProxyMiddleware({
    target: "http://product:4002",
    changeOrigin: true,
    pathRewrite: { "^/api/products": "/" },
    onError(err, _req, res) {
      console.error("Product proxy error:", err);
      res.writeHead(502);
      res.end("Bad Gateway");
    }
  } as any)
);

app.use(currentUser);


// --- JWT Middleware ---

// app.use((req: Request, res: Response, next: NextFunction)) => {
  //     if(req.path.startsWith("/auth")) return next();
  //     const authHeader = req.headers.authorization;
  //     if (!authHeader || !authHeader.startsWith("Bearer")){
    //         throw new NotAuthorizedError();
    //     }
    
    //     const token = authHeader.split(" ")[1];
    //     try {
//         const payload = jwt.verify(token, process.env.JWT_SECRET!);
//         (req as any).user = payload;
//         next();
//     } catch(
  //         throw new NotAuthorizedError();
  //     )
  // }
  
  // --- Fallback ---
  app.use("/", (_req, res) => res.status(404).send({ message: "Route not found" }));
  
  app.use(errorHandler);
  
export { app }