"use client";

import { usePathname } from "next/navigation";
import { TABS } from "./constant";
import { mergeClassname } from "@/utils/common";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";

export default function Navigation() {
  const pathName = usePathname();
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

  const email = session?.user.email;

  return (
    <div className="flex flex-row justify-between gap-2 items-stretch">
      <div role="tablist" className="tabs tabs-boxed w-full h-10">
        {TABS.map((tab) => (
          <Link
            role="tab"
            className={mergeClassname(
              "tab",
              pathName.split("/").pop() === tab.id && "tab-active"
            )}
            key={tab.id}
            href={`/app/${tab.id}`}
          >
            {tab.label}
          </Link>
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
              seed: email,
            }).toDataUriSync()}
            alt={email}
            className={"mask mask-squircle h-5 w-5"}
          />
        ) : null}

        {!loading && !email ? <UserCircleIcon className="w-5 h-5" /> : null}
      </button>
    </div>
  );
}
