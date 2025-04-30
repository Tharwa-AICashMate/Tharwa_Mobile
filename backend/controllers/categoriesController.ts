// import { Request, Response } from "express";
// import { getAllCategories, createCategory, deleteCategory } from "../services/categoriesService.js";
import { Request, Response } from 'express';
import * as categoryService from '../services/categoriesService.js';
import { ICategoryCreate } from '../types/categoryType.js';

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryData: ICategoryCreate = req.body;
        const newCategory = await categoryService.createCategory(categoryData);
        res.status(201).json(newCategory);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.query.user_id as string | undefined;
        const categories = await categoryService.getCategories(userId);
        res.status(200).json(categories);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const success = await categoryService.deleteCategory(Number(id));
        
        if (!success) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        
        res.status(204).send();
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};


export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedCategory = await categoryService.updateCategory(Number(id), updates);
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error:any) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};
// // Get all categories
// const getCategories = async (req: Request, res: Response) => {
//   try {
//     const categories = await getAllCategories();
//     res.status(200).json(categories);
//   } catch (error:any) {
//     res.status(500).json({ message: "Error fetching categories", error: error.message });
//   }
// };

// // Create a new category
// const addCategory = async (req: Request, res: Response) => {
//   const { user_id, name, icon } = req.body;
//   try {
//     const newCategory = await createCategory({ user_id, name, icon });
//     res.status(201).json(newCategory);
//   } catch (error:any) {
//     res.status(500).json({ message: "Error creating category", error: error.message });
//   }
// };

// // Delete a category
// const removeCategory = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     await deleteCategory(id);
//     res.status(200).json({ message: "Category deleted successfully" });
//   } catch (error:any) {
//     res.status(500).json({ message: "Error deleting category", error: error.message });
//   }
// };

// export { getCategories, addCategory, removeCategory };