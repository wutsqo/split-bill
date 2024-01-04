"use client";

import { Database, Json } from "@/supabase.types";
import { useAuthStore } from "@hooks/useAuthStore";
import { useGroupStore } from "@hooks/useGroupStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export default function GroupSubscriber() {
  const supabase = createClientComponentClient<Database>();
  const id = useGroupStore((state) => state.id);
  const transactions = useGroupStore((state) => state.transactions);
  const people = useGroupStore((state) => state.people);
  const name = useGroupStore((state) => state.name);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user || !id || !name) return;
    supabase
      .from("split_groups")
      .update({ name })
      .eq("id", id)
      .then((res) => {
        if (res.error) console.error(res.error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, id, user]);

  useEffect(() => {
    if (!user || !id || !people) return;
    supabase
      .from("split_groups")
      .update({
        people: people as unknown as Json,
        transactions: transactions as unknown as Json,
      })
      .eq("id", id)
      .then((res) => {
        if (res.error) console.error(res.error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people, id, user]);

  return null;
}
