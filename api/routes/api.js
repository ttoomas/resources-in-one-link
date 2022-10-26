import express from "express";
import dotenv from "dotenv";
import { createRes } from "../resControllers/createRes.js";
import { loginRes } from "../resControllers/loginRes.js";
import { checkRes } from "../resControllers/checkRes.js";
import { createSource } from "../sourceControllers/createSource.js";
import { logoutRes } from "../resControllers/logoutRes.js";
import { deleteSource } from "../sourceControllers/deleteSource.js";

dotenv.config();


const router = express.Router();

router.post('/createres', createRes);
router.post('/loginres', loginRes);
router.post('/checkres', checkRes);
router.get('/logoutres', logoutRes);

router.post('/createsource', createSource);
router.post('/deletesource', deleteSource);


export default router;