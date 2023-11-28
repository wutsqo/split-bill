"use client";

import { mergeClassname } from "@/utils/common";
import { FC } from "react";
import { TabsProps } from "./type";

const Tabs: FC<TabsProps> = ({
  tabs,
  activeTabId,
  setActiveTab = () => {},
}) => {
  return (
    <div role="tablist" className="tabs tabs-boxed">
      {tabs.map((tab) => (
        <a
          role="tab"
          className={mergeClassname(
            "tab",
            activeTabId === tab.id && "tab-active"
          )}
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          onKeyDown={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </a>
      ))}
    </div>
  );
};

export default Tabs;
