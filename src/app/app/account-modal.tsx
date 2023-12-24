import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Login from "../login/container";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

export default async function AccountModal() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isLoggedIn = session !== null;

  const LoggedIn = () => (
    <div className="grid grid-cols-1 gap-4">
      <p>
        You&apos;re currently logged in as{" "}
        <strong>{session?.user.email}</strong>.
      </p>
      <form action="/auth/logout" method="post">
        <button className="btn btn-error btn-outline" type="submit">
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          Sign out
        </button>
      </form>
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
