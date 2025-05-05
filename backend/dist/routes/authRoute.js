"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_js_1 = require("../controllers/authController.js");
const authRouter = express_1.default.Router();
;
authRouter.post("/signup", authController_js_1.signup);
authRouter.post("/login", authController_js_1.login);
authRouter.post("/forgetPassword", authController_js_1.forgetPassword);
authRouter.post("/resetPassword", authController_js_1.resetPassword);
authRouter.post("/verifyotp", authController_js_1.verifyOtp);
exports.default = authRouter;
