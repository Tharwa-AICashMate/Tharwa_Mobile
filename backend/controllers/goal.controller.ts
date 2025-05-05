import { Request, Response } from "express";
import { GoalService } from "../services/goal.service.js";

export class GoalController {
  static async getGoalsByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.userId; 
      if (!userId) {
        return res.status(400).json({ message: "user_id is required" });
      }

      const goals = await GoalService.fetchGoalsByUserId(userId);

      if (!goals || goals.length === 0) {
        return res.status(201).json({ message: "No goals found for this user." });
      }

      return res.json(goals);
    } catch (error) {
      console.log("Error fetching goals:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
