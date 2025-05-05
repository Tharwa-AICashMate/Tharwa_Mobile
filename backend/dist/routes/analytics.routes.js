import { Router } from "express";
import { getSpendingAnalyticsHandler, getIncomeAnalyticsHandler, getFinancialSummaryHandler, getFinancialTrendsHandler, generateFinancialReportsHandler, } from "../controllers/analytics.controller.js";
const router = Router();
// Analytics routes
router.get("/analytics/spending", getSpendingAnalyticsHandler);
router.get("/analytics/income", getIncomeAnalyticsHandler);
router.get("/analytics/summary", getFinancialSummaryHandler);
router.get("/analytics/trends", getFinancialTrendsHandler);
// Reports route
router.get("/reports", generateFinancialReportsHandler);
export default router;
