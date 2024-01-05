"use client";

import { Database, Json } from "@/supabase.types";
import { useGroupStore } from "@hooks/useGroupStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { Group, PdfQuota } from "./type";
import { useAuthStore } from "@hooks/useAuthStore";
import toast from "react-hot-toast";

export default function GroupSubscriber({
  groupFromServer,
  quota,
}: {
  groupFromServer?: Group;
  quota?: PdfQuota;
}) {
  const supabase = createClientComponentClient<Database>();
  const localGroupId = useGroupStore((state) => state.id);
  const setGroup = useGroupStore((state) => state.setGroup);
  const setQuota = useGroupStore((state) => state.setQuota);
  const transactions = useGroupStore((state) => state.transactions);
  const people = useGroupStore((state) => state.people);
  const name = useGroupStore((state) => state.name);
  const user = useAuthStore((state) => state.user);

  const supabaseUpdate = (
    group: Partial<Database["public"]["Tables"]["split_groups"]["Row"]>
  ) => {
    supabase
      .from("split_groups")
      .update(group)
      .eq("id", localGroupId)
      .then((res) => {
        if (res.error) {
          toast.error("Failed to sync with server");
          console.error(res.error);
        }
      });
  };

  useEffect(() => {
    if (!groupFromServer) {
      if (user?.id) {
        supabase
          .from("split_groups")
          .insert({
            id: localGroupId,
            name: name,
            people: people as unknown as Json,
            transactions: transactions as unknown as Json,
            user_id: user.id,
          })
          .select()
          .then((res) => {
            console.log(res);
          });
      }
    } else {
      setGroup(groupFromServer);
      setQuota(quota as PdfQuota);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localGroupId, user?.id]);

  useEffect(() => {
    if (!user) return;
    supabaseUpdate({ name });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localGroupId, name]);

  useEffect(() => {
    if (!user) return;
    supabaseUpdate({
      people: people as unknown as Json,
      transactions: transactions as unknown as Json,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localGroupId, people]);

  useEffect(() => {}, []);

  return null;
}
