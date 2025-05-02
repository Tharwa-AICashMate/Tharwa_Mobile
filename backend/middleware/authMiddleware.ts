// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { supabase } from '../utils/supabaseClient';

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authorization token required' });
        }

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log('Authentication error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}