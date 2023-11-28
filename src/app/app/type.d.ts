import { TAB_IDS } from "./constant";

export interface Person {
  id: string;
  name: string;
}

export interface AppContextValue {
  people: Person[];
  addPerson: (name: string) => void;
  removePerson: (id: string) => void;
}

export interface AppContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
