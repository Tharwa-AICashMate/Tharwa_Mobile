"use strict";
// controllers/deposit.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeposit = exports.updateDeposit = exports.getDepositsByGoal = exports.getDepositById = exports.createDeposit = void 0;
const depositService_js_1 = require("../services/depositService.js");
// Create Deposit
const createDeposit = async (req, res) => {
    try {
        const depositData = req.body;
        const deposit = await depositService_js_1.depositService.createDeposit(depositData);
        res.status(201).json(deposit);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createDeposit = createDeposit;
// Get Deposit by ID
const getDepositById = async (req, res) => {
    const { id } = req.params;
    try {
        const deposit = await depositService_js_1.depositService.getDepositById(id);
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
exports.getDepositById = getDepositById;
// Get Deposits by Goal ID
const getDepositsByGoal = async (req, res) => {
    const { goalId } = req.params;
    try {
        const deposits = await depositService_js_1.depositService.getDepositsByGoal(goalId);
        res.status(200).json(deposits);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getDepositsByGoal = getDepositsByGoal;
// Update Deposit
const updateDeposit = async (req, res) => {
    const { id } = req.params;
    const depositData = req.body;
    try {
        const updatedDeposit = await depositService_js_1.depositService.updateDeposit(id, depositData);
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
exports.updateDeposit = updateDeposit;
// Delete Deposit
const deleteDeposit = async (req, res) => {
    const { id } = req.params;
    try {
        const success = await depositService_js_1.depositService.deleteDeposit(id);
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
exports.deleteDeposit = deleteDeposit;
