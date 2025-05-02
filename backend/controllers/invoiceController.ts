import { Request, Response } from 'express';
import { processInvoice } from '../services/veryfiService';

export const processReceipt = async (req: Request, res: Response) => {
  try {
    const { imageBase64, fileName } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "No image data provided" });
    }

    const result = await processInvoice(imageBase64, fileName);
    res.json(result);
  } catch (error) {
    console.log("API error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error occurred"
    });
  }
};
