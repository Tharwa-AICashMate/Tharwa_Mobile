import { Router } from 'express';
import * as categoriesController from '../controllers/categoriesController.js';
const router = Router();
router.post('/', categoriesController.createCategory);
router.get('/', categoriesController.getCategories);
router.delete('/:id', categoriesController.deleteCategory);
router.put('/:id', categoriesController.updateCategory);
export default router;
