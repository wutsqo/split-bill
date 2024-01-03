"use client";

import { TABS } from "./constant";
import { mergeClassname } from "@/utils/merge-classname";
import { useTabStore } from "@hooks/useTabStore";
import { Bars3Icon } from "@heroicons/react/24/outline";
import useStore from "@hooks/useStore";

export default function Navigation() {
  const activeTabId = useStore(useTabStore, (state) => state.activeTabId);
  const setActiveTabId = useTabStore((state) => state.setActiveTabId);

  return (
    <div className="flex flex-row justify-between gap-2 items-stretch">
      <div role="tablist" className="tabs tabs-boxed w-full h-10 bg-base-100">
        {TABS.map((tab) => (
          <button
            role="tab"
            className={mergeClassname(
              "tab",
              activeTabId === tab.id && "tab-active"
            )}
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="dropdown dropdown-end">
        <label
          htmlFor="my-drawer"
          className="btn btn-square btn-ghost btn-sm shadow-none drawer-button h-10 w-10 bg-base-100"
        >
          <Bars3Icon className="w-6 h-6" />
        </label>
      </div>
    </div>
  );
}
