// controllers/deposit.controller.ts
import { depositService } from '../services/depositService.js';
// Create Deposit
export const createDeposit = async (req, res) => {
    try {
        const depositData = req.body;
        const deposit = await depositService.createDeposit(depositData);
        res.status(201).json(deposit);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get Deposit by ID
export const getDepositById = async (req, res) => {
    const { id } = req.params;
    try {
        const deposit = await depositService.getDepositById(id);
        if (deposit) {
            res.status(200).json(deposit);
        }
        else {
            res.status(404).json({ message: 'Deposit not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get Deposits by Goal ID
export const getDepositsByGoal = async (req, res) => {
    const { goalId } = req.params;
    try {
        const deposits = await depositService.getDepositsByGoal(goalId);
        res.status(200).json(deposits);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Update Deposit
export const updateDeposit = async (req, res) => {
    const { id } = req.params;
    const depositData = req.body;
    try {
        const updatedDeposit = await depositService.updateDeposit(id, depositData);
        if (updatedDeposit) {
            res.status(200).json(updatedDeposit);
        }
        else {
            res.status(404).json({ message: 'Deposit not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Delete Deposit
export const deleteDeposit = async (req, res) => {
    const { id } = req.params;
    try {
        const success = await depositService.deleteDeposit(id);
        if (success) {
            res.status(200).json({ message: 'Deposit deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Deposit not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
