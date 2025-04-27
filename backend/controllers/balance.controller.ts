import { Request, Response } from 'express';
import {
  fetchAllBalances,
  getBalanceByUserIdService,
  deleteBalanceByUserIdService,
  createBalanceService,
  updateBalanceByUserIdService,
} from '../services/balance.service.js';

export const getAllBalances = async (req: Request, res: Response) => {
  try {
    const balances = await fetchAllBalances();
    res.status(200).json(balances);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch balances', error });
  }
};

export const getBalanceByUserId = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const balance = await getBalanceByUserIdService(user_id);

    if (!balance) {
      return res.status(200).json(0);
    }

    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch balance', error });
  }
};

export const deleteBalanceByUserId = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const deleted = await deleteBalanceByUserIdService(user_id);

    if (!deleted) {
      return res.status(404).json({ message: 'Balance not found or already deleted' });
    }

    res.status(200).json({ message: 'Balance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete balance', error });
  }
};

export const createNewBalance = async (req: Request, res: Response) => {
  try {
    const { user_id, balance_limit } = req.body;

    if (!user_id || !balance_limit) {
      return res.status(400).json({ message: 'user_id and balance_limit are required' });
    }

    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const newBalance = await createBalanceService({
      user_id,
      balance_limit,
      created_at,
      updated_at,
    });

    res.status(201).json(newBalance);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create balance', error });
  }
};

export const updateBalanceByUserId = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { balance_limit } = req.body;

    if (!balance_limit) {
      return res.status(400).json({ message: 'balance_limit is required' });
    }

    const updated_at = new Date().toISOString();

    const updated = await updateBalanceByUserIdService(user_id, { balance_limit, updated_at });

    if (!updated) {
      return res.status(404).json({ message: 'Balance not found or update failed' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update balance', error });
  }
};
