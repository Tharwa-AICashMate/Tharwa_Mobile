import { Request, Response } from "express";
import RagService from "../services/ragService";

// export const askQuestion = async (req: Request, res: Response): Promise<void> => {
//   const { question, userId, coordinates } = req.body;
//   try {
//     const result = await RagService.askQuestion(question, userId, coordinates);
//     res.status(200).json({ message: "Signup successful", data: result });
//   } catch (error: any) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// };

export const findData = async (req: Request, res: Response): Promise<void> => {
  const { question, userId, coordinates } = req.body;
  try {
    const result = await RagService.findData(question, userId, coordinates);
    res.status(200).json({ message: "Signup successful", data: result });
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

// r:export const analyzeData = async (req: Request, res: Response): Promise<void> => {
//   const { question, userId, coordinates } = req.body;
//   try {
//     const result = await RagService.analyzeData(question, userId, coordinates);
//     res.status(200).json({ message: "Signup successful", data: result });
//   } catch (error: any) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// };
export const analyzeData = async (req: Request, res: Response): Promise<void> => {
  const { inputs, userId, coordinates } = req.body; 
  
if (!inputs || !userId || !coordinates) {
  res.status(400).json({ error: "Missing required fields" });
  return;
}

try {
  const result = await RagService.analyzeData(inputs, userId, coordinates);
  res.status(200).json(result);
} catch (error: any) {
  console.error("Server Error:", error); // تسجيل الخطأ في السجلات
  res.status(500).json({ 
    error: "Internal server error",
    details: error.message 
  });
}}