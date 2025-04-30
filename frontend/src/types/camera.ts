// Add or update these interfaces in your types directory or in the component file

// Interface for the line item from OCR
interface LineItem {
  name: string;
  unitPrice: string;
  quantity?: string;
}

interface InvoiceResult {
  supplier_name: string;
  total_amount: string;
  invoice_date: string;
  category: string;
  line_items: {
    description: string;
    quantity: number;
    price: number;
    total: number;
  }[];
}

// Interface for the description item in transaction details
interface DescriptionItem {
  name: string;
  unitPrice: number;
  quantity?: number;
}

// Interface for transaction with details
interface TransactionWithDetails {
  category_id: number;
  amount: number;
  type: "expense" | "income";
  title: string;
  description?: string;
  user_id: string;
  created_at: Date;
  details?: DescriptionItem[];
}