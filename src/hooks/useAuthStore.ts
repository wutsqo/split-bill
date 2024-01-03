import { User as SupabaseUser } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { create } from "zustand";

type User = SupabaseUser | null;

interface State {
  user: User;
}

interface Action {
  setUser: (user: User) => void;
}

export const useAuthStore = create<Action & State>((set) => {
  return {
    user: null,
    setUser: (user) => {
      set({ user });
    },
  };
});
