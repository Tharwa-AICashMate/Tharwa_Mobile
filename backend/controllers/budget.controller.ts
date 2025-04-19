import { Request, Response } from 'express';
import { fetchAllBudgets, getBudgetByIdService ,deleteBudgetByIdService, createBudgetService, updateBudgetService } from '../services/budget.service.js';

export const getAllBudgets = async (req: Request, res: Response) => {
  try {
    const budgets = await fetchAllBudgets();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch budgets', error });
  }
};

export const getBudgetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const budget = await getBudgetByIdService(id);

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch budget', error });
  }
};


export const deleteBudgetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteBudgetByIdService(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Budget not found or already deleted' });
    }
    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete budget', error });
  }
};


export const createNewBudget = async (req: Request, res: Response) => {
  try {
    const { user_id, budget_limit } = req.body;

    if (!user_id || !budget_limit) {
      return res.status(400).json({ message: 'user_id and budget_limit are required' });
    }

    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const newBudget = await createBudgetService({
      user_id,
      budget_limit,
      created_at,
      updated_at,
    });

    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create budget', error });
  }
};


export const updateBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { budget_limit } = req.body;

    if (!budget_limit) {
      return res.status(400).json({ message: 'budget_limit is required' });
    }

    const updated_at = new Date().toISOString();

    const updated = await updateBudgetService(id, { budget_limit, updated_at });

    if (!updated) {
      return res.status(404).json({ message: 'Budget not found or update failed' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update budget', error });
  }
};