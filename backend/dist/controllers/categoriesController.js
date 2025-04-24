"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getCategories = exports.createCategory = void 0;
const categoryService = __importStar(require("../services/categoriesService.js"));
const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const newCategory = await categoryService.createCategory(categoryData);
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createCategory = createCategory;
const getCategories = async (req, res) => {
    try {
        const userId = req.query.user_id;
        const categories = await categoryService.getCategories(userId);
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCategories = getCategories;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await categoryService.deleteCategory(Number(id));
        if (!success) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteCategory = deleteCategory;
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
