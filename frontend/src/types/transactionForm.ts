import { Category} from "@/types/category";
import {Goal as SavingsGoal} from "@/types/goal"

export interface DescriptionItem {
  name: string;
  unitPrice: string;
  quantity?: string;
}

export interface FormErrors {
  date: string;
  category: string;
  // amount: string;
  // title: string;
  // descriptionItems: string[];
}

export interface TransactionFormProps {
  title: string;
  buttonText: string;
  onSubmit: (data: {
    category: string;
    amount: string;
    title: string;
    type: "expense" | "income" | "savings";
    message: string;
    created_at: Date;
    descriptionItems?: DescriptionItem[];
    store?: string;
  }) => void;
  initialCategory?: string;
  initialAmount?: string;
  initialTitle?: string;
  initialMessage?: string;
  initialDate?: Date;
  initialStore?: string;
  resetAfterSubmit?: boolean;
  isIncome?: boolean;
  isSavings?: boolean;
}

export interface CommonFieldProps {
  inputRefs: React.RefObject<{[key: string]: any}>;
  setCurrentFocusedInput: (input: string | null) => void;
}

export interface DateFieldProps extends CommonFieldProps {
  date: Date;
  setDate: (date: Date) => void;
  validateDate: (date?: Date) => boolean;
  errorMessage: string;
}

export interface CategoryFieldProps extends CommonFieldProps {
  category: string;
  setCategory: (category: string) => void;
  categories: Category[] | SavingsGoal[];
  validateCategory: () => boolean;
  errorMessage: string;
  isSavings?: boolean;
}

export interface AmountFieldProps extends CommonFieldProps {
  amount: string;
  title: string;
  descriptionItems: string[];
  // setAmount: (amount: string) => void;
  // validateAmount: () => boolean;
  // errorMessage: string;
  // isValidNumber: (value: string) => boolean;
}

export interface FormFieldProps {
  value: any;
  onChange: (value: any) => void;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  inputRef?: React.Ref<any>;
  isIncome?: boolean;
  isSavings?: boolean;
}
// export interface TitleFieldProps extends CommonFieldProps {
//   titleValue: string;
//   setTitleValue: (title: string) => void;
//   validateTitle: () => boolean;
//   errorMessage: string;
//   formTitle: string;
//   isIncome?: boolean;
//   isSavings?: boolean;
// }

// export interface ItemsFieldProps extends CommonFieldProps {
//   descriptionItems: DescriptionItem[];
//   updateDescriptionItem: (
//     index: number,
//     field: keyof DescriptionItem,
//     value: string
//   ) => void;
//   addDescriptionItem: () => void;
//   removeDescriptionItem: (index: number) => void;
//   errors: string[];
//   validateDescriptionItems: () => boolean;
//   isValidNumber: (value: string) => boolean;
// }

// export interface NoteFieldProps extends CommonFieldProps {
//   message: string;
//   setMessage: (message: string) => void;
// }

// export interface SubmitButtonProps {
//   isSubmitting: boolean;
//   buttonText: string;
//   handleSubmit: () => void;
//   disabled?: boolean;
// }
