"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/deposit.routes.ts
const express_1 = __importDefault(require("express"));
const depositController_js_1 = require("../controllers/depositController.js");
const router = express_1.default.Router();
// Define routes for Deposit CRUD operations
router.post('/', depositController_js_1.createDeposit);
router.get('/:id', depositController_js_1.getDepositById);
router.get('/goal/:goalId', depositController_js_1.getDepositsByGoal);
router.put('/:id', depositController_js_1.updateDeposit);
router.delete('/:id', depositController_js_1.deleteDeposit);
exports.default = router;
