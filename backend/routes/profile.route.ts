import express from 'express';
import * as profileController from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/users', profileController.getAllUsers);
router.get('/users/:id', profileController.getUserById as any );
router.put('/users/:id', profileController.updateUserById as any );


export default router;
