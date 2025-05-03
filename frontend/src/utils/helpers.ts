import { Transaction, TransactionSummary } from '@/types/transactionTypes';

/**
 * Format a number as a currency using compact notation (e.g., $1K, $1.5M).
 */
export const formatCurrency = (amount: number | undefined | null): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(0);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a date string into a localized short date-time string.
 * Example: "3:05 PM - Apr 2" (EN), "٣:٠٥ م - أبريل ٢" (AR)
 */
export const formatDate = (dateString: string, locale: string = 'en'): string => {
  const date = new Date(dateString);
  const time = date.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const month = date.toLocaleString(locale, { month: 'short' });
  const day = date.getDate();

  return `${time} - ${month} ${day}`;
};


export const formatArabicDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // Format time in Arabic (2:30 PM → ٢:٣٠ م)
  const time = date.toLocaleTimeString('ar-EG', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });


  const month = date.toLocaleString('ar-EG', { month: 'short' });

  const day = new Intl.NumberFormat('ar-EG').format(date.getDate());

  return `${time} - ${day} ${month}`;
};

export const groupTransactionsByMonth = (
  transactions: Transaction[],
  locale: string = 'en'
): Record<string, Transaction[]> => {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return sorted.reduce((acc, transaction) => {
    const date = new Date(transaction.created_at);

    const monthName = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
    }).format(date);

    if (!acc[monthName]) {
      acc[monthName] = [];
    }

    acc[monthName].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);
};

/**
 * Calculate a summary (income, expense, total balance) from a list of transactions.
 */
export const calculateTransactionSummary = (transactions: Transaction[]): TransactionSummary => {
  return transactions.reduce(
    (summary: TransactionSummary, transaction) => {
      if (transaction.type === 'income') {
        summary.income += transaction.amount;
        summary.totalBalance += transaction.amount;
      } else {
        summary.expense += transaction.amount;
        summary.totalBalance -= transaction.amount;
      }
      return summary;
    },
    { totalBalance: 0, income: 0, expense: 0 }
  );
};


// utils/helpers.ts
export const formatArabicNumber = (num: number) => {
  return new Intl.NumberFormat('ar-EG').format(num);
};
