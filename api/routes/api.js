import express from "express";
import { createRes } from "../controllers/createRes.js";
import { loginRes } from "../controllers/loginRes.js";


const router = express.Router();

router.post('/createres', createRes);
router.post('/loginres', loginRes);


export default router;