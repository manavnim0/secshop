import { app } from "./app";

const start = async ()=> {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET must be defined")
    }
    const PORT = process.env.PORT || 4001
    app.listen(PORT, () => console.log(`Auth service running on port: ${PORT}`))
    app.get("/health", (req, res) => {
        res.status(200).json({ status: "auth service healthy"});
    })
}
start()