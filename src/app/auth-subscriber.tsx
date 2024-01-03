"use client";

import { useAuthStore } from "@hooks/useAuthStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export function AuthSubscriber() {
  const supabase = createClientComponentClient();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser]);

  return null;
}
