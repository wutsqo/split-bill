import { ZUSTAND_PERSIST_KEYS } from "@/app/app/constant";
import { Debt, Transaction } from "@/app/app/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { generateDebtFromTransaction } from "@/utils/core";
import { usePeopleStore } from "./usePeopleStore";

interface State {
  transactions: Transaction[];
  debts: Debt[];
}

interface Action {
  addTransaction: (data: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, data: Partial<Transaction>) => void;
  removeTransaction: (id: string) => void;
  reset: () => void;
}

const initialState: State = {
  transactions: [],
  debts: [],
};

export const useTransactionStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      addTransaction: (data) => {
        const id = uuidv4();
        const newDebts = generateDebtFromTransaction({ ...data, id });
        set((state) => ({
          transactions: [...state.transactions, { ...data, id }],
          debts: [...state.debts, ...newDebts],
        }));
        usePeopleStore.getState().recalculateBalances(get().debts);
      },
      editTransaction: (id, data) => {
        const newTransaction = {
          ...get().transactions.find((transaction) => transaction.id === id)!,
          ...data,
        };
        const newDebts = generateDebtFromTransaction(newTransaction);
        set((state) => ({
          transactions: state.transactions.map((transaction) =>
            transaction.id === id ? newTransaction : transaction
          ),
          debts: [
            ...state.debts.filter((debt) => debt.transactionId !== id),
            ...newDebts,
          ],
        }));
        usePeopleStore.getState().recalculateBalances(get().debts);
      },
      removeTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== id
          ),
          debts: state.debts.filter((debt) => debt.transactionId !== id),
        }));
        usePeopleStore.getState().recalculateBalances(get().debts);
      },
      reset: () => set(initialState),
    }),
    { name: ZUSTAND_PERSIST_KEYS.TRANSACTIONS }
  )
);
