"use client";

import { useTabStore } from "@hooks/useTabStore";
import { TAB_IDS } from "./constant";
import BillsContainer from "./bills/container";
import SummaryContainer from "./summary/container";
import PeopleContainer from "./people/container";

export default function Page() {
  const activeTabId = useTabStore((state) => state.activeTabId);

  if (activeTabId === TAB_IDS.PEOPLE) {
    return <PeopleContainer />;
  }

  if (activeTabId === TAB_IDS.BILLS) {
    return <BillsContainer />;
  }

  if (activeTabId === TAB_IDS.SUMMARY) {
    return <SummaryContainer />;
  }

  return null;
}
