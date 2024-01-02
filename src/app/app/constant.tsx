export enum TAB_IDS {
  PEOPLE = "people",
  BILLS = "bills",
  SUMMARY = "summary",
}

export interface Tab {
  id: TAB_IDS;
  label: string;
}

export const TABS: Tab[] = [
  {
    id: TAB_IDS.PEOPLE,
    label: "People",
  },
  {
    id: TAB_IDS.BILLS,
    label: "Transactions",
  },
  {
    id: TAB_IDS.SUMMARY,
    label: "Settle Up",
  },
];

export const LOCALSTORAGE_KEYS = {
  PEOPLE: "people",
  TRANSACTIONS: "transactions",
  DEBTS: "debts",
};

export const ZUSTAND_PERSIST_KEYS = {
  PEOPLE: "ps_v3",
  TRANSACTIONS: "ts_v3",
};

export const DELETED_USER = {
  id: "deleted",
  name: "Deleted Person",
  balance: 0,
};
