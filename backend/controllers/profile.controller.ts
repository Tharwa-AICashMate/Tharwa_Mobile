import { Request, Response } from 'express';
import * as profileService from '../services/profile.service';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await profileService.getAllUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 
      if (!id) return res.status(400).json({ error: "id is required" });
  
      const user = await profileService.getUserById(id); 
      res.json(user);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };
  
  export const updateUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 
      if (!id) return res.status(400).json({ error: "id is required" });
  
      const updatedUser = await profileService.updateUserById(id, req.body);
      res.json(updatedUser);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
  