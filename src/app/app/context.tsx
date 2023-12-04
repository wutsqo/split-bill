"use client";

import { createContext, FC, useContext, useState, useMemo } from "react";
import {
  AppContextProviderProps,
  AppContextValue,
  Debt,
  Person,
  Transaction,
} from "./type";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { LOCALSTORAGE_KEYS } from "./constant";
import { generateDebtFromTransaction } from "@/utils/core";

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const [people, setPeople] = useLocalStorageState<Person[]>(
    LOCALSTORAGE_KEYS.PEOPLE,
    []
  );
  const [transactions, setTransactions] = useLocalStorageState<Transaction[]>(
    LOCALSTORAGE_KEYS.TRANSACTIONS,
    []
  );
  const [debts, setDebts] = useLocalStorageState<Debt[]>(
    LOCALSTORAGE_KEYS.DEBTS,
    []
  );
  const [preferSimplified, setPreferSimplified] = useState<boolean>(false);

  const addPerson = (name: string) => {
    const newPerson: Person = {
      id: new Date().getTime().toString(),
      name,
    };
    setPeople([...people, newPerson]);
  };

  const removePerson = (id: string) => {
    setPeople(people.filter((person) => person.id !== id));
  };

  const addTransaction = (trx: Transaction) => {
    setTransactions([...transactions, trx]);
    setDebts((prev) => [...prev, ...generateDebtFromTransaction(trx)]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter((trx) => trx.id !== id));
    setDebts((prev) => prev.filter((debt) => debt.transactionId !== id));
  };

  const reset = () => {
    setPeople([]);
    setTransactions([]);
    setDebts([]);
  };

  const value: AppContextValue = {
    people,
    addPerson,
    removePerson,
    transactions,
    addTransaction,
    removeTransaction,
    preferSimplified,
    setPreferSimplified,
    debts,
    reset,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
