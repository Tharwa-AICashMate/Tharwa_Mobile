import { supabase } from "../config/supabase.js";

interface DescriptionItem {
  name: string;
  unitPrice: number;
  quantity?: number;
}

interface Transaction {
  id?:number,
  user_id?: string;
  category_id: number;
  amount: number;
  type: "income" | "expense";
  title: string;
  created_at: Date;
  details?: DescriptionItem[]; 
  storeId?:string
}

export const createTransaction = async (transaction: Transaction) => {
  console.log(transaction)
  if (transaction.type === 'income') {
    const { data, error } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Income')
      .eq('user_id', transaction.user_id) 
      .limit(1)
      .single();
  
    if (error) {
      console.error('Error fetching Income category:', error);
    } else if (data) {
      transaction.category_id = data.id;
    }
  }
  // delete transaction.user_id
  const {user_id,storeId,...Transaction}=transaction

  const transactionToInsert = {
    ...Transaction,
    details: Transaction.details ? JSON.stringify(Transaction.details) : null
  };
  const { data, error } = await supabase
    .from('transactions')
    .insert([transactionToInsert])
    .select();
  console.log(error)
  if (error) throw new Error(error.message);

  const { storeData, storeError } = await supabase
    .from('items_store')
    .insert([
      { item_id: data[0].id, store_id: storeId }
    ]);

  return data?.[0] ? {
    ...data[0],
    details: data[0].details ? JSON.parse(data[0].details) : undefined,
  } : null;
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

  if (error) throw new Error(error.message);
  
  return data?.map(transaction => ({
    ...transaction,
    details: transaction.details ? JSON.parse(transaction.details) : undefined
  }));
};



export const getTransactionsByCategory = async (
  userId: string,
  categoryId: number,
  page = 1,
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

  if (error) throw new Error(error.message);
  
  return data?.map(transaction => ({
    ...transaction,
    details: transaction.details ? JSON.parse(transaction.details) : undefined
  }));
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
  category_id: number;
  amount: number;
  type: string;
  title: string;
  created_at: Date;
  id: string;
}) => {

  console.log(transaction)

  const { data, error } = await supabase
    .from("transactions")
    .update(transaction)
    .eq("id", transaction.id)
    .select()
    .single();
  console.log(transaction, data,error);
  if (error) throw new Error(error.message);
  return data?.[0];
};
