"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_js_1 = require("../controllers/analytics.controller.js");
const router = (0, express_1.Router)();
// Analytics routes
router.get("/analytics/spending", analytics_controller_js_1.getSpendingAnalyticsHandler);
router.get("/analytics/income", analytics_controller_js_1.getIncomeAnalyticsHandler);
router.get("/analytics/summary", analytics_controller_js_1.getFinancialSummaryHandler);
router.get("/analytics/trends", analytics_controller_js_1.getFinancialTrendsHandler);
// Reports route
router.get("/reports", analytics_controller_js_1.generateFinancialReportsHandler);
exports.default = router;
