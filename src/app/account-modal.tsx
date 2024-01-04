"use client";

import Login from "./login/container";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "@hooks/useAuthStore";

export default function AccountModal() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = user !== null;
  const logout = useAuthStore((state) => state.logout);

  const LoggedIn = () => (
    <div className="grid grid-cols-1 gap-4">
      <p>
        You&apos;re currently logged in as <strong>{user?.email}</strong>.
      </p>
      <button
        className="btn btn-error btn-outline"
        type="button"
        onClick={logout}
      >
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
        Sign out
      </button>
    </div>
  );

  return (
    <dialog id="account_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="mt-4">{isLoggedIn ? <LoggedIn /> : <Login />}</div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
