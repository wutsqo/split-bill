"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";

export async function generatePDF(
  prevState: {
    message: string;
    id: string | undefined;
  },
  formData: FormData
) {
  const people = formData.get("people") as string;
  const transactions = formData.get("transactions") as string;
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");
  const { data, error } = await supabase
    .from("workspace")
    .upsert({
      user: user.id,
      people: people,
      transactions: transactions,
    })
    .select();
  if (error) throw error;
  return { message: "PDF generated successfully", id: data[0].id.toString() };
}
