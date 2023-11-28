"use client";

import { SummaryContainer } from "@/containers/summary";
import { useAppContext } from "./context";
import { PeopleContainer } from "@/containers/people";
import { BillsContainer } from "@/containers/bills";
import { TAB_IDS } from "./constant";

export default function Dashboard() {
  const { activeTab } = useAppContext();

  const renderActiveTab = () => {
    switch (activeTab) {
      case TAB_IDS.SUMMARY:
        return <SummaryContainer />;
      case TAB_IDS.PEOPLE:
        return <PeopleContainer />;
      case TAB_IDS.BILLS:
        return <BillsContainer />;
      default:
        return null;
    }
  };

  return renderActiveTab();
}
