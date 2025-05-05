"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTransaction = exports.deleteTransaction = exports.getTransactionsByCategory = exports.getAllTransactions = exports.createTransaction = void 0;
const supabase_js_1 = require("../config/supabase.js");
const createTransaction = async (transaction) => {
    console.log(transaction);
    if (transaction.type === "income") {
        const { data, error } = await supabase_js_1.supabase
            .from("categories")
            .select("id")
            .eq("name", "Income")
            .eq("user_id", transaction.user_id)
            .limit(1)
            .single();
        if (error) {
            console.log("Error fetching Income category:", error);
        }
        else if (data) {
            transaction.category_id = data.id;
        }
        console.log(data);
    }
    // delete transaction.user_id
    const { user_id, storeId, ...Transaction } = transaction;
    console.log(user_id);
    const transactionToInsert = {
        ...Transaction,
        details: Transaction.details ? JSON.stringify(Transaction.details) : null,
    };
    const { data, error } = await supabase_js_1.supabase
        .from("transactions")
        .insert([transactionToInsert])
        .select();
    console.log(error);
    if (error)
        throw new Error(error.message);
    const { data: storeData, error: storeError } = await supabase_js_1.supabase
        .from("items_store")
        .insert([{ item_id: data[0].id, store_id: storeId }]);
    return data?.[0]
        ? {
            ...data[0],
            details: data[0].details ? JSON.parse(data[0].details) : undefined,
        }
        : null;
};
exports.createTransaction = createTransaction;
// Update other functions to handle details parsing
const getAllTransactions = async (userId, page = 1) => {
    const from = (page - 1) * 20;
    const to = from + 20 - 1;
    const { data, error } = await supabase_js_1.supabase
        .from("transaction_with_category")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .range(from, to);
    const formated = data?.map(tx => ({
        ...tx,
        details: parseTransactionDetails(tx?.details)
    }));
    if (error)
        throw new Error(error.message);
    return formated;
};
exports.getAllTransactions = getAllTransactions;
const parseTransactionDetails = (details) => {
    if (!details || typeof details !== "string")
        return [];
    try {
        let rawDetails = details.trim();
        // If it's a malformed JSON string without an opening bracket
        if (!rawDetails.startsWith("[") && rawDetails.endsWith("]")) {
            rawDetails = `[${rawDetails}`; // Add missing opening bracket
        }
        // Parse the corrected JSON string
        const parsedDetails = JSON.parse(rawDetails);
        // Ensure the result is an array and map it to a proper format
        return Array.isArray(parsedDetails)
            ? parsedDetails.map((item, index) => ({
                key: `item-${index}`,
                name: String(item.name ?? ""),
                unitPrice: String(item.unitPrice ?? ""),
                quantity: String(item.quantity ?? ""),
            }))
            : [];
    }
    catch (error) {
        console.log("Error parsing details:", error);
        return [];
    }
};
const getTransactionsByCategory = async (userId, categoryId, page = 1) => {
    const from = (page - 1) * 20;
    const to = from + 20 - 1;
    const { data, error } = await supabase_js_1.supabase
        .from("transaction_with_category")
        .select("*")
        .eq("user_id", userId)
        .eq("category_id", categoryId)
        .order("created_at", { ascending: false })
        .range(from, to);
    const formated = data?.map(tx => ({
        ...tx,
        details: parseTransactionDetails(tx?.details)
    }));
    if (error)
        throw new Error(error.message);
    return formated;
};
exports.getTransactionsByCategory = getTransactionsByCategory;
const deleteTransaction = async (transactionId) => {
    const { data, error } = await supabase_js_1.supabase
        .from("transactions")
        .delete()
        .eq("id", transactionId);
    if (error)
        throw new Error(error.message);
    return;
};
exports.deleteTransaction = deleteTransaction;
const editTransaction = async (transaction) => {
    const { user_id, storeId, ...Transaction } = transaction;
    console.log('---------', Transaction);
    // Prepare transaction object for DB
    const transactionToUpdate = {
        ...Transaction,
        details: Transaction.details ? JSON.stringify(Transaction.details) : null,
    };
    // Update transaction
    const { data, error } = await supabase_js_1.supabase
        .from("transactions")
        .update(transactionToUpdate)
        .eq("id", Transaction.id)
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    // Handle store upsert
    if (storeId) {
        const { error: storeError } = await supabase_js_1.supabase
            .from("items_store")
            .upsert([{ item_id: Transaction.id, store_id: storeId }], {
            onConflict: "item_id",
        });
        if (storeError)
            console.log("Store upsert error:", storeError);
    }
    // Merge storeId and parse `details` for return
    return {
        ...transactionToUpdate,
        store_id: storeId,
    };
};
exports.editTransaction = editTransaction;
