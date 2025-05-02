import { Request, Response } from 'express';
import { supabase } from '../utils/supabase'; // Import Supabase client from utils
import * as deleteAccountService from '../services/deleteAccount.service';

// Verify user password
export const verifyPassword = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      const isPasswordValid = await deleteAccountService.verifyPassword(supabase, email, password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      return res.status(200).json({ message: 'Password verified successfully' });
    } catch (error) {
      console.log('Error verifying password:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
// Delete account
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await deleteAccountService.deleteAccount(supabase, userId);

    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.log('Error deleting account:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



// Get email by userId
export const getEmailByUserId = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const email = await deleteAccountService.getEmailByUserId(supabase, userId);
  
      if (!email) {
        return res.status(404).json({ error: 'User not found or email not available' });
      }
  
      return res.status(200).json({ email });
    } catch (error) {
      console.log('Error fetching email:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  // Update user password
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ error: 'New password is required' });
    }

    const success = await deleteAccountService.updatePassword(supabase, userId, newPassword);

    if (!success) {
      return res.status(400).json({ error: 'Failed to update password' });
    }

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.log('Error updating password:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
