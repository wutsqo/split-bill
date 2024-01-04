"use client";

import { useTabStore } from "@hooks/useTabStore";
import { TAB_IDS } from "./constant";
import BillsContainer from "./bills/container";
import SummaryContainer from "./summary/container";
import PeopleContainer from "./people/container";
import useStore from "@hooks/useStore";
import Navigation from "./navigation";
import { Group } from "./type";
import { useEffect } from "react";
import { useGroupStore } from "@hooks/useGroupStore";

export default function AppContainer({
  group,
  is_guest = false,
}: {
  group: Group;
  is_guest?: boolean;
}) {
  const activeTabId = useStore(useTabStore, (state) => state.activeTabId);
  const { setGroup, setIsGuest } = useGroupStore((state) => state);
  useEffect(() => {
    setGroup(group);
    setIsGuest(is_guest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navigation />
      {activeTabId === TAB_IDS.PEOPLE && <PeopleContainer />}
      {activeTabId === TAB_IDS.BILLS && <BillsContainer />}
      {activeTabId === TAB_IDS.SUMMARY && <SummaryContainer />}
      {!activeTabId && <div className="skeleton w-full h-40 mt-4"></div>}
    </>
  );
}
