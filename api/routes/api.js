import express from "express";
import dotenv from "dotenv";
import { createRes } from "../resControllers/createRes.js";
import { loginRes } from "../resControllers/loginRes.js";
import { checkRes } from "../resControllers/checkRes.js";
import { createSource } from "../sourceControllers/createSource.js";

dotenv.config();


const router = express.Router();

router.post('/createres', createRes);
router.post('/loginres', loginRes);
router.post('/checkres', checkRes);

router.post('/createsource', createSource);


export default router;