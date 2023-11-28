"use client";

import { createContext, FC, useState, useContext } from "react";
import { AppContextProviderProps, AppContextValue } from "./type";
import { TAB_IDS } from "./constant";

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState<TAB_IDS>(TAB_IDS.PEOPLE);

  const value: AppContextValue = {
    activeTab,
    setActiveTab,
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
