"use client";

import { ReactNode, useEffect, useRef } from "react";
import { appName } from "./config";
import {
  ArrowRightIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import TrakteerButton from "./trakteer/button";
import { themeChange } from "theme-change";

export default function Drawer({ children }: { readonly children: ReactNode }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useEffect(() => {
    themeChange(false);
    return () => {
      themeChange(false);
    };
  }, []);
  const pathName = usePathname();
  return (
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
                router.push(pathName === "/" ? "/app" : "/");
              }}
            >
              {pathName !== "/" ? (
                <HomeIcon className="w-6 h-6 shrink-0" />
              ) : (
                <ArrowRightIcon className="w-6 h-6 shrink-0" />
              )}
              {pathName === "/" ? "Open App" : "Home"}
            </button>
          </li>

          <li>
            <button
              className="swap justify-start"
              data-toggle-theme="dark,light"
              data-act-class="swap-active"
            >
              <div className="swap-off w-full flex justify-start items-center gap-2">
                <SunIcon className="w-6 h-6 shrink-0" />
                <div className="w-full">Light Mode</div>
              </div>
              <div className="swap-on w-full flex justify-start items-center gap-2">
                <MoonIcon className="w-6 h-6 shrink-0" />
                <div className="w-full">Dark Mode</div>
              </div>
            </button>
          </li>
          <li>
            <TrakteerButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
