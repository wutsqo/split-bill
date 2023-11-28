"use client";

import { createContext, FC, useContext, useState } from "react";
import { AppContextProviderProps, AppContextValue, Person } from "./type";

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const [people, setPeople] = useState<Person[]>([]);

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

  const value: AppContextValue = {
    people,
    addPerson,
    removePerson,
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
