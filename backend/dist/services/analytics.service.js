"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFinancialReports = exports.getFinancialTrends = exports.getFinancialSummary = exports.getIncomeAnalytics = exports.getSpendingAnalytics = void 0;
const supabase_1 = require("../config/supabase");
// Spending Analytics
const getSpendingAnalytics = async () => {
    const { data, error } = await supabase_1.supabase
        .from("transactions")
        .select("*")
        .eq("type", "expense");
    if (error) {
        console.error("Error fetching spending analytics:", error);
        return null;
    }
    return data;
};
exports.getSpendingAnalytics = getSpendingAnalytics;
// Income Analytics
const getIncomeAnalytics = async () => {
    const { data, error } = await supabase_1.supabase
        .from("transactions")
        .select("*")
        .eq("type", "income");
    if (error) {
        console.error("Error fetching income analytics:", error);
        return null;
    }
    return data;
};
exports.getIncomeAnalytics = getIncomeAnalytics;
// Financial Summary
const getFinancialSummary = async () => {
    const { data: incomeData } = await supabase_1.supabase
        .from("transactions")
        .select("amount")
        .eq("type", "income");
    const { data: expenseData } = await supabase_1.supabase
        .from("transactions")
        .select("amount")
        .eq("type", "expense");
    const totalIncome = incomeData?.reduce((sum, item) => sum + item.amount, 0) || 0;
    const totalExpense = expenseData?.reduce((sum, item) => sum + item.amount, 0) || 0;
    return {
        totalIncome,
        totalExpense,
        net: totalIncome - totalExpense,
    };
};
exports.getFinancialSummary = getFinancialSummary;
// Financial Trends
const getFinancialTrends = async () => {
    const { data, error } = await supabase_1.supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: false });
    if (error) {
        console.error("Error fetching financial trends:", error);
        return null;
    }
    return data;
};
exports.getFinancialTrends = getFinancialTrends;
// Financial Reports
const generateFinancialReports = async () => {
    const summary = await (0, exports.getFinancialSummary)();
    const trends = await (0, exports.getFinancialTrends)();
    return {
        title: "Financial Report",
        data: {
            summary,
            trends,
        },
        generatedAt: new Date(),
    };
};
exports.generateFinancialReports = generateFinancialReports;
