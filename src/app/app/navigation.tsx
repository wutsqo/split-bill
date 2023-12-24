"use client";

import { TABS } from "./constant";
import { mergeClassname } from "@/utils/merge-classname";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";
import { useTabStore } from "@hooks/useTabStore";

export default function Navigation() {
  const activeTabId = useTabStore((state) => state.activeTabId);
  const setActiveTabId = useTabStore((state) => state.setActiveTabId);
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      setSession(res.data.session);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    useTabStore.persist.rehydrate();
  }, []);

  const email = session?.user.email;

  return (
    <div className="flex flex-row justify-between gap-2 items-stretch">
      <div role="tablist" className="tabs tabs-boxed w-full h-10">
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
      <button
        className="btn btn-square btn-sm shadow-none drawer-button h-10 w-10"
        onClick={() => {
          const modal = document.getElementById(
            "account_modal"
          ) as HTMLDialogElement;
          modal?.showModal();
        }}
      >
        {loading ? (
          <div className="loading loading-spinner loading-sm"></div>
        ) : null}

        {!loading && email ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={createAvatar(funEmoji, {
              seed: session.user.id,
            }).toDataUriSync()}
            alt={email}
            className={"mask mask-squircle h-6 w-6"}
          />
        ) : null}

        {!loading && !email ? <UserCircleIcon className="w-6 h-6" /> : null}
      </button>
    </div>
  );
}
