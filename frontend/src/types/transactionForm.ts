export interface DescriptionItem {
  name: string;
  unitPrice: string;
  quantity?: string;
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

export interface FormErrors {
  date: string;
  category: string;
  amount: string;
  title: string;
  descriptionItems: string[];
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