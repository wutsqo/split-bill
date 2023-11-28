import { ITab } from "@/components/tabs/type";

export enum TAB_IDS {
  PEOPLE = "tab-people",
  BILLS = "tab-bills",
  SUMMARY = "tab-summary",
}

export const TABS: ITab[] = [
  {
    id: TAB_IDS.PEOPLE,
    label: "People",
  },
  {
    id: TAB_IDS.BILLS,
    label: "Bills",
  },
  {
    id: TAB_IDS.SUMMARY,
    label: "Summary",
  },
];
