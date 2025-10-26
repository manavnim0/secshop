import { Router } from "express";
import axios from "axios";

export const router: Router = Router();

router.get('/', (_req, _res) => console.log("Auth Router"))

router.post("/login", async (req, res) => {
    try {
        const response = await axios.post("/http://auth:4001/login", req.body);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Auth service unreachable" });
        console.log(err)
    }

});
