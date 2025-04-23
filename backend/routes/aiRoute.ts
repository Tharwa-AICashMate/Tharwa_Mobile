import express from "express";
import {
    askQuestion
} from "../controllers/ragController.js";

const aiRouter = express.Router();;
aiRouter.get("/askai", askQuestion);


export default aiRouter;