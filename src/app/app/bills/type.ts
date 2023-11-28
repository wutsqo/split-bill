import { Person } from "../type";

export interface SplitFormProps {
  amount: number;
  split: Record<string, number>;
  people: Person[];
  updateSplit: (split: Record<string, number>) => void;
}
