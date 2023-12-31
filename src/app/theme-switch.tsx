"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function ThemeSwitch() {
  useEffect(() => {
    themeChange(false);
    return () => {
      themeChange(false);
    };
  }, []);
  return (
    <button
      className=" btn btn-square btn-ghost swap swap-rotate "
      data-toggle-theme="dark,light"
      data-act-class="swap-active"
    >
      <SunIcon className="swap-on w-5 h-5" />
      <MoonIcon className="swap-off w-5 h-5" />
    </button>
  );
}
