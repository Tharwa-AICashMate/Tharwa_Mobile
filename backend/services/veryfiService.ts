import axios from 'axios';

// Define the expected response type for Veryfi API
export interface InvoiceResult {
  supplier_name: string;
  total_amount: string;
  invoice_date: string;
  category: string;
  line_items?: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
  }>;
}

interface VeryfiDocumentResponse {
  category?: string;
  vendor?: { name: string };
  total: number;
  date: string;
  line_items: Array<{
    description?: string;
    quantity?: number;
    price?: number;
  }>;
  categories: string[];
}

// Update the getVeryfiCategories function to use the correct type
async function getVeryfiCategories(): Promise<string[]> {
  try {
    const response = await axios.get<VeryfiDocumentResponse>(
      'https://api.veryfi.com/api/v8/partner/categories',
      {
        headers: {
          'Client-Id': process.env.VERYFI_CLIENT_ID,
          'Authorization': `apikey ${process.env.VERYFI_USERNAME}:${process.env.VERYFI_API_KEY}`
        }
      }
    );
    return response.data.categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [
      "Advertising & Marketing", "Automotive", "Bank Charges",
      "Insurance", "Legal & Professional Services", "Meals & Entertainment",
      "Office Supplies", "Utilities", "Travel"
    ];
  }
}

// Refine the category based on line items
function refineCategory(supplier: string, validCategories: string[]): string {
  const text = [supplier].join(' ').toLowerCase();
  return validCategories.find(cat => text.includes(cat.toLowerCase())) || "Uncategorized";
}

// Format the currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Format the date
function formatDate(dateString?: string): string {
  return dateString ? new Date(dateString).toISOString().split('T')[0] : "Unknown";
}

// Update the processInvoice function with the correct type for the response
export async function processInvoice(imageBase64: string, fileName?: string): Promise<InvoiceResult> {
  try {
    const validCategories = await getVeryfiCategories();
    const tags = fileName ? fileName.split(/[\s_\-.]/).filter(Boolean) : [];

    const response = await axios.post<VeryfiDocumentResponse>(
      'https://api.veryfi.com/api/v8/partner/documents',
      {
        file_data: imageBase64,
        categories: validCategories,
        auto_delete: true,
        boost_mode: 1,
        document_type: "invoice",
        tags
      },
      {
        headers: {
          'Client-Id': process.env.VERYFI_CLIENT_ID,
          'Authorization': `apikey ${process.env.VERYFI_USERNAME}:${process.env.VERYFI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const data = response.data;

    const rawCategory = data.category || "Uncategorized";
    const refinedCategory = rawCategory === "Uncategorized"
      ? refineCategory(data.vendor?.name || '', validCategories)
      : rawCategory;

    return {
      supplier_name: data.vendor?.name || "Unknown Supplier",
      total_amount: formatCurrency(data.total || 0),
      invoice_date: formatDate(data.date),
      category: refinedCategory,
      line_items: data.line_items?.map((item: { description?: string; quantity?: number; price?: number }) => ({
        description: item.description || "Unspecified Item",
        quantity: item.quantity || 1,
        unit_price: item.price || 0,
        total: (item.quantity || 1) * (item.price || 0)
      }))
    };
  } catch (error) {
    console.error("Processing error:", error instanceof Error ? error.message : error);
    throw new Error("Invoice processing failed");
  }
}
