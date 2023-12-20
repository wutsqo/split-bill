export interface Person {
  id: string;
  name: string;
  balance: number;
  paysTo: Record<string, number>;
}

export enum SplitType {
  EQUAL = "EQUAL",
  EXACT = "EXACT",
  PERCENT = "PERCENT",
}

export enum SplitTypeLabel {
  EQUAL = "Equally",
  EXACT = "Exact Amount",
  PERCENT = "Percentage",
}

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: Date;
  paidBy: {
    id: string;
    name: string;
  };
  splitType: SplitType;
  split: {
    [key: string]: {
      id: string;
      name: string;
      amount: number;
    };
  };
}

export interface Debt {
  lenderId: string;
  borrowerId: string;
  amount: number;
  transactionId: string;
}

export interface AppContextValue {
  people: Person[];
  addPerson: (name: string) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  debts: Debt[];
  preferSimplified: boolean;
  setPreferSimplified: (preferSimplified: boolean) => void;
  reset: () => void;
}

export interface AppContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
