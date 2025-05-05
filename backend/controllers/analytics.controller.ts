import { Request, Response } from "express";
import {
  getSpendingAnalytics,
  getIncomeAnalytics,
  getFinancialSummary,
  getFinancialTrends,
  generateFinancialReports,
} from "../services/analytics.service.js";

export const getSpendingAnalyticsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getSpendingAnalytics();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch spending analytics" });
  }
};

export const getIncomeAnalyticsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getIncomeAnalytics();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch income analytics" });
  }
};

export const getFinancialSummaryHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getFinancialSummary();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch financial summary" });
  }
};

export const getFinancialTrendsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getFinancialTrends();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch financial trends" });
  }
};

export const generateFinancialReportsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await generateFinancialReports();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate financial reports" });
  }
};
