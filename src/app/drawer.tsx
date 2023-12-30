"use client";

import React from "react";
import { appName } from "./config";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { TrakteerProvider } from "./trakteer/provider";
import TrakteerButton from "./trakteer/button";
import TrakteerModal from "./trakteer/modal";

export default function Drawer({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <TrakteerProvider>
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          ref={inputRef}
        />
        <div className="drawer-content">{children}</div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <h1>{appName}</h1>
            </li>
            <li className="mt-4">
              <button
                onClick={() => {
                  if (inputRef.current) inputRef.current.checked = false;
                  router.push("/");
                }}
              >
                <HomeIcon className="w-6 h-6" />
                Home
              </button>
            </li>
            <li>
              <TrakteerButton />
            </li>
          </ul>
        </div>
      </div>
      <TrakteerModal />
    </TrakteerProvider>
  );
}
