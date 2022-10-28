import express from "express";
import dotenv from "dotenv";
import { createRes } from "../resControllers/createRes.js";
import { loginRes } from "../resControllers/loginRes.js";
import { checkRes } from "../resControllers/checkRes.js";
import { createSource } from "../sourceControllers/createSource.js";
import { logoutRes } from "../resControllers/logoutRes.js";
import { deleteSource } from "../sourceControllers/deleteSource.js";
import { updateSource } from "../sourceControllers/updateSource.js";
import { getSources } from "../sourceControllers/getSources.js";

dotenv.config();


const router = express.Router();

router.post('/createres', createRes);
router.post('/loginres', loginRes);
router.post('/checkres', checkRes);
router.get('/logoutres', logoutRes);

router.post('/getsources', getSources);
router.post('/createsource', createSource);
router.post('/deletesource', deleteSource);
router.post('/updatesource', updateSource);


export default router;