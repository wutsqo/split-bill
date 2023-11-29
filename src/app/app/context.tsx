"use client";

import { createContext, FC, useContext, useState, useMemo } from "react";
import {
  AppContextProviderProps,
  AppContextValue,
  Person,
  Transaction,
} from "./type";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { LOCALSTORAGE_KEYS } from "./constant";

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
  const [simplifyDebts, setSimplifyDebts] = useState<boolean>(false);

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
  };

  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter((trx) => trx.id !== id));
  };

  const value: AppContextValue = {
    people,
    addPerson,
    removePerson,
    transactions,
    addTransaction,
    removeTransaction,
    simplifyDebts,
    setSimplifyDebts,
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
