import  { app } from "./app";

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`✅ Gateway Service running on port ${PORT}`))
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "gateway server healthy"})
})