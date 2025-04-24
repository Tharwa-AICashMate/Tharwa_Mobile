"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFinancialReportsHandler = exports.getFinancialTrendsHandler = exports.getFinancialSummaryHandler = exports.getIncomeAnalyticsHandler = exports.getSpendingAnalyticsHandler = void 0;
const analytics_service_1 = require("../services/analytics.service");
const getSpendingAnalyticsHandler = async (req, res) => {
    try {
        const data = await (0, analytics_service_1.getSpendingAnalytics)();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch spending analytics" });
    }
};
exports.getSpendingAnalyticsHandler = getSpendingAnalyticsHandler;
const getIncomeAnalyticsHandler = async (req, res) => {
    try {
        const data = await (0, analytics_service_1.getIncomeAnalytics)();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch income analytics" });
    }
};
exports.getIncomeAnalyticsHandler = getIncomeAnalyticsHandler;
const getFinancialSummaryHandler = async (req, res) => {
    try {
        const data = await (0, analytics_service_1.getFinancialSummary)();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch financial summary" });
    }
};
exports.getFinancialSummaryHandler = getFinancialSummaryHandler;
const getFinancialTrendsHandler = async (req, res) => {
    try {
        const data = await (0, analytics_service_1.getFinancialTrends)();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch financial trends" });
    }
};
exports.getFinancialTrendsHandler = getFinancialTrendsHandler;
const generateFinancialReportsHandler = async (req, res) => {
    try {
        const data = await (0, analytics_service_1.generateFinancialReports)();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to generate financial reports" });
    }
};
exports.generateFinancialReportsHandler = generateFinancialReportsHandler;
