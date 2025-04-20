
import * as goalsController from "../controllers/goalsController.js";
import express from "express";
const router = express.Router();

router.post("/", goalsController.createGoal);
router.get("/:id", goalsController.getGoal);
router.get("/user/:userId", goalsController.getUserGoals);
router.put("/:id", goalsController.updateGoal);
router.delete("/:id", goalsController.deleteGoal);

export default router;