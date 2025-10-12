import express, {Express} from "express";

export const router: Express = express.Router();

router.get('/', (req, res) => console.log("Auth Router"))