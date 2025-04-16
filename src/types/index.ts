<<<<<<< Updated upstream
=======
// export type navigationProps = {
//     navigation: {
//       navigate: (screen: string) => void;
//       replace:(screen: string) => void;
//     };
//   };
// export interface Transaction {
//   id: string;
//   category: string;
//   amount: number;
//   time: string;
//   date: Date;
//   icon: string;
//   iconBgColor: string;
// }

// export interface BudgetSummary {
//   totalExpenses: number;
//   totalIncome: number;
//   budgetLimit: number;
//   percentageUsed: number;
// }

// export interface Category {
//   id: string;
//   name: string;
//   icon: string;
  
// }

// export interface ExpenseState {
//   budget: BudgetSummary;
//   transactions: Transaction[];
//   categories: Category[];
// }


// export interface FAQItem {
//     id: string;
//     question: string;
//     answer: string;
//     category: 'general' | 'account' | 'services';
//   }
  
//   export interface SupportChannel {
//     id: string;
//     name: string;
//     icon: string;
//     link: string;
//   }


// types/index.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  CreateAccount: undefined;
  Fingerprint: undefined;
  MainApp: {
    screen?: string;
    state?: {
      routes: { name: string }[];
    };
  };
  Profile: undefined;
};

// Proper navigation prop typing for the Login screen
export type navigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

// Transaction type
export interface Transaction {
  type: string;
  id: string;
  category: string;
  amount: number;
  time: string;
  date: Date;
  icon: string;
  iconBgColor: string;
}

// Budget summary type
export interface BudgetSummary {
  totalExpenses: number;
  totalIncome: number;
  budgetLimit: number;
  percentageUsed: number;
}

// Category type
export interface Category {
  id: string;
  name: string;
  icon: string;
}

// State slice for expenses
export interface ExpenseState {
  budget: BudgetSummary;
  transactions: Transaction[];
  categories: Category[];
}

// FAQ and support
>>>>>>> Stashed changes
export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: 'general' | 'account' | 'services';
  }
  
  export interface SupportChannel {
    id: string;
    name: string;
    icon: string;
    link: string;
  }