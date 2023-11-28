export interface AppContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface AppContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
