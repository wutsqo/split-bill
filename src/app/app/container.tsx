"use client";

import { useTabStore } from "@hooks/useTabStore";
import { TAB_IDS } from "./constant";
import BillsContainer from "./bills/container";
import SummaryContainer from "./summary/container";
import PeopleContainer from "./people/container";
import useStore from "@hooks/useStore";
import Navigation from "./navigation";
import { Group, PdfQuota } from "./type";
import GroupSubscriber from "./group-subscriber";

export default function AppContainer({
  group,
  quota,
}: {
  readonly group?: Group;
  readonly quota?: PdfQuota;
}) {
  const activeTabId = useStore(useTabStore, (state) => state.activeTabId);
  return (
    <>
      <Navigation />
      {activeTabId === TAB_IDS.PEOPLE && <PeopleContainer />}
      {activeTabId === TAB_IDS.BILLS && <BillsContainer />}
      {activeTabId === TAB_IDS.SUMMARY && <SummaryContainer />}
      {!activeTabId && <div className="skeleton w-full h-40 mt-4"></div>}
      <GroupSubscriber groupFromServer={group} quota={quota} />
    </>
  );
}
