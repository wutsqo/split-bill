"use client";

import { createContext, FC, useContext, useState, useEffect } from "react";
import {
  AppContextProviderProps,
  AppContextValue,
  Debt,
  Transaction,
} from "./type";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { LOCALSTORAGE_KEYS } from "./constant";
import {
  calculateNewBalances,
  generateDebtFromTransaction,
} from "@/utils/core";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePeopleStore } from "@hooks/usePeopleStore";

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const supabase = createClientComponentClient();
  const { people, addPerson, editPerson, removeEveryone } = usePeopleStore();

  const [transactions, setTransactions] = useLocalStorageState<Transaction[]>(
    LOCALSTORAGE_KEYS.TRANSACTIONS,
    []
  );
  const [debts, setDebts] = useLocalStorageState<Debt[]>(
    LOCALSTORAGE_KEYS.DEBTS,
    []
  );
  const [preferSimplified, setPreferSimplified] = useState<boolean>(false);

  const addTransaction = (trx: Transaction) => {
    setTransactions([...transactions, trx]);
    setDebts((prev) => [...prev, ...generateDebtFromTransaction(trx)]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter((trx) => trx.id !== id));
    setDebts((prev) => prev.filter((debt) => debt.transactionId !== id));
  };

  const reset = () => {
    removeEveryone();
    setTransactions([]);
    setDebts([]);
  };

  useEffect(() => {
    calculateNewBalances(people, debts).forEach((person) => {
      editPerson(person.id, person);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debts]);

  // useEffect(() => {
  //   if (people.length !== 0) return;
  //   supabase.auth.getSession().then((res) => {
  //     if (res.data.session !== null) {
  //       const user = res.data.session.user;
  //       addPerson({
  //         id: user.id,
  //         name: user.user_metadata.full_name,
  //       });
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [people]);

  const value: AppContextValue = {
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
