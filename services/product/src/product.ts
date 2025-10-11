import express, { Express } from "express";
import cors from "cors";

const app: Express = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000

type Product = { id: string; name: string; price: number; };

const products: Product[] = [
  { id: "p1", name: "Secure T-shirt", price: 29.99 },
  { id: "p2", name: "Dev Mug", price: 12.99 },
]


app.get('/health', (_req, res) => res.json({ status: "ok" }));

app.get('/products', (_req, res) => res.json({ data: products }));


if (require.main === module) {
  app.listen(PORT, () => console.log(`Product service listeing on ${PORT}`))

}

export default app;
