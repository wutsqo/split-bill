import { Database } from "@/supabase.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AppContainer from "./container";
import { Group, PdfQuota, Person, Transaction } from "./type";

const supabase = createServerComponentClient<Database>({
  cookies: () => cookies(),
});

async function getQuota(user_id: string): Promise<PdfQuota> {
  const { data, error } = await supabase
    .from("pdf_quota")
    .select("*")
    .filter("user_id", "eq", user_id)
    .limit(1);
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) {
    const { data, error } = await supabase
      .from("pdf_quota")
      .insert({ user_id })
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  }
  return data[0];
}

async function getGroup(user_id: string): Promise<Group | undefined> {
  const { data, error } = await supabase
    .from("split_groups")
    .select("*")
    .filter("user_id", "eq", user_id)
    .limit(1);
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) return;
  return {
    ...data[0],
    people:
      data[0].people === null ? [] : (data[0].people as unknown as Person[]),
    transactions:
      data[0].transactions === null
        ? []
        : (data[0].transactions as unknown as Transaction[]),
  };
}

export default async function Page() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return <AppContainer />;
  const [group, quota] = await Promise.all([
    getGroup(session.user.id),
    getQuota(session.user.id),
  ]);
  return <AppContainer group={group} quota={quota} />;
}
