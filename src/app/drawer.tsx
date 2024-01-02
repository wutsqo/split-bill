"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { appName } from "./config";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import TrakteerButton from "./trakteer/button";
import { themeChange } from "theme-change";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

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
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<null | User>(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <button
              onClick={() => {
                (
                  document.getElementById("account_modal") as HTMLDialogElement
                )?.showModal();
              }}
            >
              {user ? (
                <>
                  <UserCircleIcon className="h-6 w-6 shrink-0" />
                  Account
                </>
              ) : (
                <>
                  <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" />
                  Login
                </>
              )}
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
