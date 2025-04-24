import { Request, Response } from 'express';
import { fetchIncome, setIncome ,createIncomeRecord  } from '../services/income.service.js';

export const getIncome = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { data, error } = await fetchIncome(user_id);

  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: 'Income not found' });

  res.status(200).json(data);
};

export const updateIncome = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { income } = req.body;

  const { data, error } = await setIncome(user_id, income);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
};


export const createIncome = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { income } = req.body;
  
    const { data, error } = await createIncomeRecord(user_id, income);
  
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  };