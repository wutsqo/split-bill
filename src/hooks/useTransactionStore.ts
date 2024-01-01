import { ZUSTAND_PERSIST_KEYS } from "@/app/app/constant";
import { Transaction } from "@/app/app/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { usePeopleStore } from "./usePeopleStore";
import TransactionService from "@/utils/core/transaction";

interface State {
  transactions: Transaction[];
}

interface Action {
  addTransaction: (data: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, data: Partial<Transaction>) => void;
  removeTransaction: (id: string) => void;
  reset: () => void;
}

const initialState: State = {
  transactions: [],
};

export const useTransactionStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      addTransaction: (data) => {
        const newTransactions = [
          ...get().transactions,
          { ...data, id: uuidv4() },
        ];
        set(() => ({ transactions: newTransactions }));
        usePeopleStore
          .getState()
          .recalculateBalances(
            TransactionService.generateDebtsFromTransactions(newTransactions)
          );
      },
      editTransaction: (id, data) => {
        const newTransaction = {
          ...get().transactions.find((transaction) => transaction.id === id)!,
          ...data,
        };
        const newTransactions = [
          ...get().transactions.map((transaction) =>
            transaction.id === id ? newTransaction : transaction
          ),
        ];
        set(() => ({ transactions: newTransactions }));
        usePeopleStore
          .getState()
          .recalculateBalances(
            TransactionService.generateDebtsFromTransactions(newTransactions)
          );
      },
      removeTransaction: (id) => {
        const newTransactions = [
          ...get().transactions.filter((transaction) => transaction.id !== id),
        ];
        set(() => ({ transactions: newTransactions }));
        usePeopleStore
          .getState()
          .recalculateBalances(
            TransactionService.generateDebtsFromTransactions(newTransactions)
          );
      },
      reset: () => set(initialState),
    }),
    { name: ZUSTAND_PERSIST_KEYS.TRANSACTIONS }
  )
);
