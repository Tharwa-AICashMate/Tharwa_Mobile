import { Request, Response } from "express";
import * as goalService from "../services/goalService.js";
import { IGoalCreate, IGoalUpdate } from "../types/goalsType.js";

export const createGoal = async (req: Request, res: Response): Promise<void> => {
    try {
        const goalData: IGoalCreate = req.body;
        const newGoal = await goalService.createGoal(goalData);
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({ message: "Error creating goal" });
    }
};

export const getGoal = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const goal = await goalService.getGoal(id);
        
        if (!goal) {
            res.status(404).json({ message: "Goal not found" });
            return;
        }
        
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ message: "Error fetching goal" });
    }
};

export const getUserGoals = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const goals = await goalService.getUserGoals(userId);
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user goals" });
    }
};

export const updateGoal = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const goalData: IGoalUpdate = req.body;
        
        const updatedGoal = await goalService.updateGoal(id, goalData);
        
        if (!updatedGoal) {
            res.status(404).json({ message: "Goal not found" });
            return;
        }
        
        res.status(200).json(updatedGoal);
    } catch (error) {
        res.status(500).json({ message: "Error updating goal" });
    }
};

export const deleteGoal = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const success = await goalService.deleteGoal(id);
        
        if (!success) {
            res.status(404).json({ message: "Goal not found" });
            return;
        }
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting goal" });
    }
};


export const fetchCurrentAmount = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const currentAmount = await goalService.getCurrentAmountByGoalId(Number(id));
    res.json({ current_amount: currentAmount });
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};