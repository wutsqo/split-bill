export interface Person {
  id: string;
  name: string;
  balance: number;
  paysTo: Record<string, number>;
  simplifiedPaysTo: Record<string, number>;
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
  lenderId: string;
  borrowerId: string;
  amount: number;
  transactionId: string;
}
