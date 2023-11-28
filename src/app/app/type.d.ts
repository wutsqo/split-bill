import { TAB_IDS } from "./constant";

export interface AppContextValue {
  activeTab: TAB_IDS;
  setActiveTab: (tab: TAB_IDS) => void;
}

export interface AppContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
