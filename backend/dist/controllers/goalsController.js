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
exports.fetchCurrentAmount = exports.deleteGoal = exports.updateGoal = exports.getUserGoals = exports.getGoal = exports.createGoal = void 0;
const goalService = __importStar(require("../services/goalService.js"));
const createGoal = async (req, res) => {
    try {
        const goalData = req.body;
        const newGoal = await goalService.createGoal(goalData);
        res.status(201).json(newGoal);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating goal" });
    }
};
exports.createGoal = createGoal;
const getGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await goalService.getGoal(id);
        if (!goal) {
            res.status(404).json({ message: "Goal not found" });
            return;
        }
        res.status(200).json(goal);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching goal" });
    }
};
exports.getGoal = getGoal;
const getUserGoals = async (req, res) => {
    try {
        const { userId } = req.params;
        const goals = await goalService.getUserGoals(userId);
        res.status(200).json(goals);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user goals" });
    }
};
exports.getUserGoals = getUserGoals;
const updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const goalData = req.body;
        const updatedGoal = await goalService.updateGoal(id, goalData);
        if (!updatedGoal) {
            res.status(404).json({ message: "Goal not found" });
            return;
        }
        res.status(200).json(updatedGoal);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating goal" });
    }
};
exports.updateGoal = updateGoal;
const deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await goalService.deleteGoal(id);
        if (!success) {
            res.status(404).json({ message: "Goal not found" });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting goal" });
    }
};
exports.deleteGoal = deleteGoal;
const fetchCurrentAmount = async (req, res) => {
    const { id } = req.params;
    try {
        const currentAmount = await goalService.getCurrentAmountByGoalId(Number(id));
        res.json({ current_amount: currentAmount });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
exports.fetchCurrentAmount = fetchCurrentAmount;
