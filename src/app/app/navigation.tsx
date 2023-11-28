"use client";

import React, { FC } from "react";
import Tabs from "../../components/tabs";
import { TABS } from "./constant";
import { useAppContext } from "./context";

export const Navigation: FC = () => {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <div>
      <Tabs tabs={TABS} activeTabId={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
