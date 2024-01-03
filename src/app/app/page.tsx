"use client";

import { useTabStore } from "@hooks/useTabStore";
import { TAB_IDS } from "./constant";
import BillsContainer from "./bills/container";
import SummaryContainer from "./summary/container";
import PeopleContainer from "./people/container";
import useStore from "@hooks/useStore";

export default function Page() {
  const activeTabId = useStore(useTabStore, (state) => state.activeTabId);

  if (activeTabId === TAB_IDS.PEOPLE) {
    return <PeopleContainer />;
  }

  if (activeTabId === TAB_IDS.BILLS) {
    return <BillsContainer />;
  }

  if (activeTabId === TAB_IDS.SUMMARY) {
    return <SummaryContainer />;
  }

  return <div className="skeleton w-full h-32 mt-4"></div>;
}
