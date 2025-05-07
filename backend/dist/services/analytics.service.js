import { supabase } from "../config/supabase.js";
// Spending Analytics
export const getSpendingAnalytics = async () => {
    const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("type", "expense");
    if (error) {
        console.log("Error fetching spending analytics:", error);
        return null;
    }
    return data;
};
// Income Analytics
export const getIncomeAnalytics = async () => {
    const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("type", "income");
    if (error) {
        console.log("Error fetching income analytics:", error);
        return null;
    }
    return data;
};
// Financial Summary
export const getFinancialSummary = async () => {
    const { data: incomeData } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "income");
    const { data: expenseData } = await supabase
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
// Financial Trends
export const getFinancialTrends = async () => {
    const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: false });
    if (error) {
        console.log("Error fetching financial trends:", error);
        return null;
    }
    return data;
};
// Financial Reports
export const generateFinancialReports = async () => {
    const summary = await getFinancialSummary();
    const trends = await getFinancialTrends();
    return {
        title: "Financial Report",
        data: {
            summary,
            trends,
        },
        generatedAt: new Date(),
    };
};
