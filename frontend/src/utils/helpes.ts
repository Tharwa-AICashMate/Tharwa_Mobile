import { Transaction, TransactionSummary, TransactionsByMonth } from '@/types/transactionTypes';

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

;
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = getMonthAbbreviation(date.getMonth());

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  hours = hours % 12 || 12; 

  return `${hours}:${minutes} - ${month} ${day}   ` ;
};
export const getMonthAbbreviation = (month: number): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month];
};

export const getMonthName = (month: number): string => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
};

export const groupTransactionsByMonth = (transactions: Transaction[]): TransactionsByMonth => {
  const sorted = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return sorted.reduce((acc: TransactionsByMonth, transaction) => {
    const date = new Date(transaction.date);
    // const monthYear = `${getMonthName(date.getMonth())} ${date.getFullYear()}`;
        const monthYear = `${getMonthName(date.getMonth())} `;
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(transaction);
    return acc;
  }, {});
};

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
