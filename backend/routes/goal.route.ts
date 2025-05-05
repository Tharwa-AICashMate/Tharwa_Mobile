import { Router, RequestHandler } from "express";
import { GoalController } from "../controllers/goal.controller.js";

const router = Router();


router.get("/goal/progress/:userId", GoalController.getGoalsByUserId as RequestHandler);

export default router;
