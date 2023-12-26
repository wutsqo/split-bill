import { Debt, Person } from "@/app/app/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { ZUSTAND_PERSIST_KEYS } from "@/app/app/constant";
import { calculateNewBalances } from "@/utils/core";

interface State {
  people: Person[];
  preferSimplifiedBalances: boolean;
}

interface Action {
  getPerson: (id: string) => Person | undefined;
  addPerson: (data: Pick<Person, "name"> & Partial<Pick<Person, "id">>) => void;
  editPerson: (id: string, update: Partial<Person>) => void;
  recalculateBalances: (debts: Debt[]) => void;
  removePerson: (id: string) => void;
  resetPeople: () => void;
  setPreferSimplifiedBalances: (value: boolean) => void;
}

export const usePeopleStore = create<State & Action>()(
  persist(
    (set, get) => ({
      people: [] as Person[],
      preferSimplifiedBalances: false,
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
    }),
    { name: ZUSTAND_PERSIST_KEYS.PEOPLE, skipHydration: true }
  )
);
