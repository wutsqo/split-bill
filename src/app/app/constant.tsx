import { ITab } from "@/components/tabs/type";

export enum TAB_IDS {
  PEOPLE = "people",
  BILLS = "bills",
  SUMMARY = "summary",
}

export const TABS: ITab[] = [
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
