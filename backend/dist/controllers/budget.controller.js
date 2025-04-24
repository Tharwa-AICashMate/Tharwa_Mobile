"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBudget = exports.createNewBudget = exports.deleteBudgetById = exports.getBudgetById = exports.getAllBudgets = void 0;
const budget_service_js_1 = require("../services/budget.service.js");
const getAllBudgets = async (req, res) => {
    try {
        const budgets = await (0, budget_service_js_1.fetchAllBudgets)();
        res.status(200).json(budgets);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch budgets', error });
    }
};
exports.getAllBudgets = getAllBudgets;
const getBudgetById = async (req, res) => {
    try {
        const { id } = req.params;
        const budget = await (0, budget_service_js_1.getBudgetByIdService)(id);
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(200).json(budget);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch budget', error });
    }
};
exports.getBudgetById = getBudgetById;
const deleteBudgetById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await (0, budget_service_js_1.deleteBudgetByIdService)(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Budget not found or already deleted' });
        }
        res.status(200).json({ message: 'Budget deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete budget', error });
    }
};
exports.deleteBudgetById = deleteBudgetById;
const createNewBudget = async (req, res) => {
    try {
        const { user_id, budget_limit } = req.body;
        if (!user_id || !budget_limit) {
            return res.status(400).json({ message: 'user_id and budget_limit are required' });
        }
        const created_at = new Date().toISOString();
        const updated_at = created_at;
        const newBudget = await (0, budget_service_js_1.createBudgetService)({
            user_id,
            budget_limit,
            created_at,
            updated_at,
        });
        res.status(201).json(newBudget);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create budget', error });
    }
};
exports.createNewBudget = createNewBudget;
const updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { budget_limit } = req.body;
        if (!budget_limit) {
            return res.status(400).json({ message: 'budget_limit is required' });
        }
        const updated_at = new Date().toISOString();
        const updated = await (0, budget_service_js_1.updateBudgetService)(id, { budget_limit, updated_at });
        if (!updated) {
            return res.status(404).json({ message: 'Budget not found or update failed' });
        }
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update budget', error });
    }
};
exports.updateBudget = updateBudget;
