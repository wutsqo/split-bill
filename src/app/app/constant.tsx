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
    label: "Summary",
  },
];

export const LOCALSTORAGE_KEYS = {
  PEOPLE: "people",
  TRANSACTIONS: "transactions",
};

export const DELETED_USER = {
  id: "deleted",
  name: "Deleted Person",
};
