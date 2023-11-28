"use client";

import { usePathname } from "next/navigation";
import { TABS } from "./constant";
import { mergeClassname } from "@/utils/common";
import Link from "next/link";

export default function Navigation() {
  const pathName = usePathname();

  return (
    <div role="tablist" className="tabs tabs-boxed">
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
  );
}
