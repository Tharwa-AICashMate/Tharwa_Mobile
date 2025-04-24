import express from 'express';
import { verifyPassword, deleteAccount, getEmailByUserId, updatePassword } from '../controllers/deleteAccount.controller';

const router = express.Router();

// Route to verify password
router.post('/verify-password/:userId', verifyPassword);

// Route to delete account
router.delete('/:userId', deleteAccount);

router.get('/get-email/:userId', getEmailByUserId);

// Route to update password
router.post('/update-password/:userId', updatePassword);


export default router;

