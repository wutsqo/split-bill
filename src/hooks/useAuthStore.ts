import { showModal } from "@/utils/common";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { create } from "zustand";

interface State {
  user: SupabaseUser | null;
  loginTitle: string;
  loginSubtitle?: string;
}

interface Action {
  setUser: (user: SupabaseUser | null) => void;
  showAuthModal: ({
    loginTitle,
    loginSubtitle,
  }: {
    loginTitle?: string;
    loginSubtitle?: string;
  }) => void;
  logout: () => void;
}

const initialState = {
  user: null,
  loginTitle: "Login to sync your data",
  loginSubtitle: "",
};
const supabase = createClientComponentClient();

export const useAuthStore = create<Action & State>((set) => {
  return {
    ...initialState,
    setUser: (user) => set({ user }),
    showAuthModal: ({
      loginTitle = initialState.loginTitle,
      loginSubtitle = initialState.loginSubtitle,
    }) => {
      set({ loginTitle, loginSubtitle });
      showModal("account_modal");
    },
    logout: () => {
      supabase.auth.signOut().then(() => {
        window.location.replace("/");
        window.localStorage.clear();
      });
    },
  };
});
