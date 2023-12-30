"use client";

import { TABS } from "./constant";
import { mergeClassname } from "@/utils/merge-classname";
import { useEffect, useState } from "react";
import { useTabStore } from "@hooks/useTabStore";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Navigation() {
  const activeTabId = useTabStore((state) => state.activeTabId);
  const setActiveTabId = useTabStore((state) => state.setActiveTabId);
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      setSession(res.data.session);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    useTabStore.persist.rehydrate();
  }, []);

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
