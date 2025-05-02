import express from "express";
import {
    analyzeData,
    findData
} from "../controllers/ragController.js";

const aiRouter = express.Router();;
aiRouter.post("/find", findData);
// aiRouter.get("/analyze", analyzeData);
aiRouter.post("/analyze", analyzeData);

export default aiRouter;