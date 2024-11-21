export interface Group {
  people: Person[];
  transactions: Transaction[];
  created_at: string;
  updated_at: string;
  id: string;
  name: string;
}

export interface PaysToData {
  amount: number;
  id: string;
  name: string;
}

export interface Person {
  id: string;
  name: string;
  balance: number;
  paysTo: Record<string, PaysToData>;
  simplifiedPaysTo: Record<string, PaysToData>;
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

export interface SplitData {
  id: string;
  name: string;
  fraction: number;
  amount: number;
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
  split: Record<string, SplitData>;
}

export interface Debt {
  lender: {
    id: string;
    name: string;
  };
  borrower: {
    id: string;
    name: string;
  };
  amount: number;
  transactionId: string;
}
