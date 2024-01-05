import { ZUSTAND_PERSIST_KEYS } from "@/app/app/constant";
import { Debt, Group, PdfQuota, Person, Transaction } from "@/app/app/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { calculateNewBalances } from "@/utils/core";
import TransactionService from "@/utils/core/transaction";

interface State extends Group {
  preferSimplifiedBalances: boolean;
  quota: PdfQuota;
}

interface GroupAction {
  setGroup: (group: Group) => void;
  setQuota: (quota: PdfQuota) => void;
  updateGroup: (update: Partial<Group>) => void;
  updateQuota: (update: Partial<Omit<PdfQuota, "user_id">>) => void;
  reset: () => void;
}

interface PeopleAction {
  getPerson: (id: string) => Person | undefined;
  addPerson: (data: Pick<Person, "name"> & Partial<Pick<Person, "id">>) => void;
  editPerson: (id: string, update: Partial<Person>) => void;
  recalculateBalances: (debts: Debt[]) => void;
  removePerson: (id: string) => void;
  setPreferSimplifiedBalances: (value: boolean) => void;
}

interface TransactionAction {
  addTransaction: (data: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, data: Partial<Transaction>) => void;
  removeTransaction: (id: string) => void;
}

const initialState: Omit<State, "id"> = {
  name: "Unnamed Group",
  created_at: "",
  is_public: false,
  updated_at: "",
  user_id: "",
  people: [],
  transactions: [],
  preferSimplifiedBalances: false,
  password: "",
  quota: {
    current: 0,
    limit: 0,
    user_id: "",
  },
};

export const useGroupStore = create<
  State & GroupAction & PeopleAction & TransactionAction
>()(
  persist(
    (set, get) => ({
      ...initialState,
      id: uuidv4(),
      setGroup: (group) => set(group),
      setQuota: (quota) => set({ quota }),
      updateGroup: (update) => set((state) => ({ ...state, ...update })),
      updateQuota: (update) =>
        set((state) => ({ quota: { ...state.quota, ...update } })),
      reset: () =>
        set({
          ...initialState,
          id: uuidv4(),
        }),
      getPerson: (id) => get().people.find((person) => person.id === id),
      addPerson: ({ id, name }) => {
        const newPerson = {
          id: id ?? uuidv4(),
          name,
          balance: 0,
          paysTo: {},
          simplifiedPaysTo: {},
        };
        set((state) => ({
          people: [...state.people, newPerson],
        }));
      },
      editPerson: (id, update) => {
        set((state) => ({
          people: state.people.map((person) =>
            person.id === id ? { ...person, ...update } : person
          ),
        }));
      },
      recalculateBalances: (debts) => {
        set((state) => ({
          people: calculateNewBalances(state.people, debts),
        }));
      },
      removePerson: (id) => {
        set((state) => ({
          people: state.people.filter((person) => person.id !== id),
        }));
      },
      resetPeople: () => set({ people: [] }),
      setPreferSimplifiedBalances: (value) => {
        set({ preferSimplifiedBalances: value });
      },
      addTransaction: (data) => {
        const newTransactions = [
          ...get().transactions,
          { ...data, id: uuidv4() },
        ];
        set(() => ({ transactions: newTransactions }));
        get().recalculateBalances(
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
        get().recalculateBalances(
          TransactionService.generateDebtsFromTransactions(newTransactions)
        );
      },
      removeTransaction: (id) => {
        const newTransactions = [
          ...get().transactions.filter((transaction) => transaction.id !== id),
        ];
        set(() => ({ transactions: newTransactions }));
        get().recalculateBalances(
          TransactionService.generateDebtsFromTransactions(newTransactions)
        );
      },
    }),
    { name: ZUSTAND_PERSIST_KEYS.SPLIT_GROUPS }
  )
);
