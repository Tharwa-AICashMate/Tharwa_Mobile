import express from 'express';
import { verifyPassword, deleteAccount, getEmailByUserId, updatePassword } from '../controllers/deleteAccount.controller';

const router = express.Router();

// Route to verify password
router.post('/verify-password/:userId', verifyPassword as any);

// Route to delete account
router.delete('/:userId', deleteAccount as any);

router.get('/get-email/:userId', getEmailByUserId as any);

// Route to update password
router.post('/update-password/:userId', updatePassword as any);


export default router;

