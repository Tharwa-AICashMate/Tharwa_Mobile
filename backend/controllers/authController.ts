// import { Request, Response } from "express";
// import AuthService from "../services/authService.js";

// export const signup = async (req: Request, res: Response): Promise<void> => {
//   const { email, password } = req.body;

//   try {
//     const result = await AuthService.signup(email, password);
//     res.status(200).json({ message: "Signup successful", data: result });
//   } catch (error: any) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// };

// export const signinWithProvider = async (req: Request, res: Response): Promise<void> => {
//   const { provider } = req.body;

//   try {
//     const result = await AuthService.signupWithProvider(provider);
//     res.status(200).json({ message: "Signup with provider successful", data: result });
//   } catch (error: any) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// };

// export const login = async (req: Request, res: Response): Promise<void> => {
//   const { email, password } = req.body;

//   try {
//     const result = await AuthService.login(email, password);
//     res.status(200).json({ message: "Login successful", data: result });
//   } catch (error: any) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// };

// export const logout = async (_req: Request, res: Response): Promise<void> => {
//   try {
//     await AuthService.logout();
//     res.status(200).json({ message: "Logout successful" });
//   } catch (error: any) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// };
