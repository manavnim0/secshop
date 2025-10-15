import express from 'express';
import { signToken, verifyToken } from "@secshop/common";

const app = express()
app.use(express.json());

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Auth service running on port: ${PORT}`))
app.get("/health", (req, res) => {
    res.status(200).json({ status: "auth service healthy"});
})

