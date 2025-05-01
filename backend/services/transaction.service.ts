import { supabase } from "../config/supabase.js";

interface DescriptionItem {
  name: string;
  unitPrice: number;
  quantity?: number;
}

interface Transaction {
  id?: number;
  user_id?: string;
  category_id: number;
  amount: number;
  type: "income" | "expense";
  title: string;
  created_at: Date;
  details?: DescriptionItem[];
  storeId?: string;
}

export const createTransaction = async (transaction: Transaction) => {
  console.log(transaction);
  if (transaction.type === "income") {
    const { data, error } = await supabase
      .from("categories")
      .select("id")
      .eq("name", "Income")
      .eq("user_id", transaction.user_id)
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching Income category:", error);
    } else if (data) {
      transaction.category_id = data.id;
    }
  }
  // delete transaction.user_id
  const { user_id, storeId, ...Transaction } = transaction;

  const transactionToInsert = {
    ...Transaction,
    details: Transaction.details ? JSON.stringify(Transaction.details) : null,
  };
  const { data, error } = await supabase
    .from("transactions")
    .insert([transactionToInsert])
    .select();
  console.log(error);
  if (error) throw new Error(error.message);

  const { storeData, storeError } = await supabase
    .from("items_store")
    .insert([{ item_id: data[0].id, store_id: storeId }]);

  return data?.[0]
    ? {
        ...data[0],
        details: data[0].details ? JSON.parse(data[0].details) : undefined,
      }
    : null;
};

// Update other functions to handle details parsing
export const getAllTransactions = async (userId: string, page = 1) => {
  const from = (page - 1) * 20;
  const to = from + 20 - 1;

  const { data, error } = await supabase
    .from("transaction_with_category")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

    const transactionIds = data?.map(tx => tx.transaction_id);

    const { data: txDetails, error: detailsError } = await supabase
      .from("transactions")
      .select("id, details")
      .in("id", transactionIds);
    
    if (detailsError) {
      console.error("Error fetching details:", detailsError);
      return;
    }

    const merged = data?.map(tx => {
      const match = txDetails.find(detail => detail.id === tx.transaction_id);
      const parsedDetails = parseTransactionDetails(match?.details);
      return {
        ...tx,
        details: parsedDetails
      };
    });
  if (error) throw new Error(error.message);
  return merged;
};

const parseTransactionDetails = (details: string | null) => {
  if (!details || typeof details !== "string" ) return [];

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
  } catch (error) {
    console.error("Error parsing details:", error);
    return [];
  }
};

export const getTransactionsByCategory = async (
  userId: string,
  categoryId: number,
  page = 1
) => {
  const from = (page - 1) * 20;
  const to = from + 20 - 1;

  const { data, error } = await supabase
    .from("transaction_with_category")
    .select("*")
    .eq("user_id", userId)
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false })
    .range(from, to);

    const transactionIds = data?.map(tx => tx.transaction_id);

    const { data: txDetails, error: detailsError } = await supabase
      .from("transactions")
      .select("id, details")
      .in("id", transactionIds);
    
    if (detailsError) {
      console.error("Error fetching details:", detailsError);
      return;
    }

    const merged = data?.map(tx => {
      const match = txDetails.find(detail => detail.id === tx.transaction_id);
      const parsedDetails = parseTransactionDetails(match?.details);
      return {
        ...tx,
        details: parsedDetails
      };
    });
  if (error) throw new Error(error.message);
  return merged;
};

export const deleteTransaction = async (transactionId: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId);

  if (error) throw new Error(error.message);
  return;
};

export const editTransaction = async (transaction: {
  user_id: string;
  storeId: string;
  category_id: number;
  amount: number;
  type: string;
  title: string;
  created_at: Date;
  id: string;
  details?: any;
}) => {
  const { user_id, storeId, ...Transaction } = transaction;
console.log('---------',Transaction)
  // Prepare transaction object for DB
  const transactionToUpdate = {
    ...Transaction,
    details: Transaction.details ? JSON.stringify(Transaction.details) : null,
  };

  // Update transaction
  const { data, error } = await supabase
    .from("transactions")
    .update(transactionToUpdate)
    .eq("id", Transaction.id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  // Handle store upsert
  if (storeId) {
    const { error: storeError } = await supabase
      .from("items_store")
      .upsert([{ item_id: Transaction.id, store_id: storeId }], {
        onConflict: "item_id",
      });
    if (storeError) console.error("Store upsert error:", storeError);
  }

  // Merge storeId and parse `details` for return
  return {
    ...transactionToUpdate,
    store_id: storeId,
  };
};
