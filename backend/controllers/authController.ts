import { Request, Response } from "express";
import AuthService from "../services/authService";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const user = req.body;
  try {
    const result = await AuthService.signup(user.user);
    res.status(200).json({ message: "Signup successful", data: result });
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  try {
    const result = await AuthService.login(req.body.userId);
    res.status(200).json({ message: "Login successful", data: result });
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const forgetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  try {
    const result = await AuthService.forgetPassword(email);
    res.status(200).json({ message: "Password reset link sent", data: result });
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;
  try {
    const result = await AuthService.verifyOtp(email, otp);
    res.status(200).json({ message: "OTP verified", data: result });
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const result = await AuthService.resetPassword(email, password);
    res.status(200).json({ message: "Password reset successfully", data: result });
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
};


