import express from "express";
import {
    analyzeData,
    findData
} from "../controllers/ragController.js";

const aiRouter = express.Router();;
aiRouter.get("/find", findData);
aiRouter.get("/analyze", analyzeData);


export default aiRouter;