"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyOtp = exports.forgetPassword = exports.login = exports.signup = void 0;
const authService_1 = __importDefault(require("../services/authService"));
const signup = async (req, res) => {
    const user = req.body;
    try {
        const result = await authService_1.default.signup(user.user);
        res.status(200).json({ message: "Signup successful", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    console.log(req.body);
    try {
        const result = await authService_1.default.login(req.body.userId);
        res.status(200).json({ message: "Login successful", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
exports.login = login;
const forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await authService_1.default.forgetPassword(email);
        res.status(200).json({ message: "Password reset link sent", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
exports.forgetPassword = forgetPassword;
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const result = await authService_1.default.verifyOtp(email, otp);
        res.status(200).json({ message: "OTP verified", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
exports.verifyOtp = verifyOtp;
const resetPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await authService_1.default.resetPassword(email, password);
        res.status(200).json({ message: "Password reset successfully", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
exports.resetPassword = resetPassword;
