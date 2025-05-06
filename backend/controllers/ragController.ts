import { Request, Response } from "express";
import ragService from "../services/ragService.js";

/**
 * Language detection utility function
 * @param text Input text to analyze
 * @returns Whether the text is primarily in Arabic
 */
const isArabicText = (text: string): boolean => {
  const arabicPattern = /[\u0600-\u06FF]/;
  // Check if the text contains Arabic characters
  return arabicPattern.test(text);
};

/**
 * Find stores that sell specific items and provide price information
 */
export const findData = async (req: Request, res: Response): Promise<void> => {
  const { userId, lat, lng, items, searchRadius } = req.body;
  
  try {
    // Construct question with highlighted items between && for extraction
    const question = `find at least 5 stores to buy :&${items}& from considering price, quality, and distance is ${searchRadius}. order them based on the best options to save on price and distance`;
    
    
    let result = await ragService.findData(
      question, 
      userId, 
      { latitude: lat, longitude: lng },
    );
    console.log(result)
    res.status(200).json({ data: result });
  } catch (error: any) {
    console.error("Error in findData:", error);
    res.status(error.status || 500).json({ error: error.message });
  }
};

/**
 * Analyze data based on user input
 */
export const analyzeData = async (req: Request, res: Response): Promise<void> => {
  const { inputs, userId, coordinates } = req.body;

  if (!inputs || !userId || !coordinates) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    // Check if the input contains Arabic text
    const isArabic = isArabicText(inputs);
    const result = await ragService.query(
      inputs, 
      userId, 
      coordinates,
      { isArabic } // Pass Arabic detection as an option
    );

    res.status(200).json(result);
  } catch (error: any) {
    console.error("Server Error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

/**
 * Generic query endpoint that handles both Arabic and non-Arabic requests
 */
export const query = async (req: Request, res: Response): Promise<void> => {
  const { question, userId, coordinates } = req.body;

  if (!question || !userId || !coordinates) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    // Check if the input contains Arabic text
    const isArabic = isArabicText(question);
    
    const result = await ragService.query(
      question, 
      userId, 
      coordinates,
      { isArabic } // Pass Arabic detection as an option
    );

    res.status(200).json({ answer: result });
  } catch (error: any) {
    console.error("Query Error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};