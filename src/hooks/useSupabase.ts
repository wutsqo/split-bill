import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  user: User | null;
}

interface Action {
  setUser: (session: User | null) => void;
  showAuthModal: () => void;
}

const supabase = createClientComponentClient();

export const useSupabase = create<State & Action>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({
          user: user,
        });
      },
      showAuthModal: () => {
        const dialog = document.getElementById(
          "account_modal"
        ) as HTMLDialogElement;
        dialog.showModal();
      },
    }),
    {
      name: "session",
      onRehydrateStorage: () => (state) => {
        supabase.auth.getSession().then((res) => {
          if (res.data.session?.user) {
            state?.setUser(res.data.session.user);
          }
        });
      },
    }
  )
);
