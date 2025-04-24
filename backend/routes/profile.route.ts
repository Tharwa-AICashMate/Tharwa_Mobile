import express from 'express';
import * as profileController from '../controllers/profile.controller';

const router = express.Router();

router.get('/users', profileController.getAllUsers);
router.get('/users/:id', profileController.getUserById);
router.put('/users/:id', profileController.updateUserById);


export default router;
