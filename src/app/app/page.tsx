import { Database } from "@/supabase.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import AppContainer from "./container";
import { initialGroupState } from "./constant";
import { Group, Person, Transaction } from "./type";

const supabase = createServerComponentClient<Database>({
  cookies: () => cookies(),
});

async function getOrCreate(user_id: string): Promise<Group> {
  const { data, error } = await supabase
    .from("split_groups")
    .select("*")
    .filter("user_id", "eq", user_id)
    .limit(1);
  if (error) throw new Error(error.message);
  if (data.length === 0) {
    const { data, error } = await supabase
      .from("split_groups")
      .insert({
        id: uuidv4(),
        people: [],
        user_id,
        transactions: [],
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return {
      ...data,
      people: data.people === null ? [] : (data.people as unknown as Person[]),
      transactions:
        data.transactions === null
          ? []
          : (data.transactions as unknown as Transaction[]),
    };
  } else {
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
}

export default async function Page() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session)
    return (
      <AppContainer
        group={{
          ...initialGroupState,
          id: uuidv4(),
        }}
        is_guest
      />
    );
  const group = await getOrCreate(session.user.id);
  return <AppContainer group={group} />;
}
