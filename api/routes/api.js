import express from "express";
import { createRes } from "../controllers/createRes.js";


const router = express.Router();

router.post('/createres', createRes);


export default router;