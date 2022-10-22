import express from "express";
import dotenv from "dotenv";
import { createRes } from "../controllers/createRes.js";
import { loginRes } from "../controllers/loginRes.js";
import { checkRes } from "../controllers/checkRes.js";

dotenv.config();


const router = express.Router();

router.post('/createres', createRes);
router.post('/loginres', loginRes);
router.post('/checkres', checkRes);


export default router;