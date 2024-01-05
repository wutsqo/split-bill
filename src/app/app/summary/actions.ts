"use server";

import { SITE_URL } from "@/app/config";
import { Database } from "@/supabase.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";

export async function generatePDF(
  prevState: {
    message: string;
    path: string;
  },
  formData: FormData
) {
  const groupId = formData.get("group_id") as string;
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");
  try {
    const { data, status } = await axios.get(`${SITE_URL}/api/pdf`, {
      params: {
        user_id: user.id,
        group_id: groupId,
        key: process.env.NEXT_PUBLIC_BYPASS_KEY,
      },
    });
    if (status !== 200) {
      throw new Error(data?.message ?? "Internal server error");
    } else {
      return {
        message: "PDF successfully generated",
        path: data,
      };
    }
  } catch (error) {
    return {
      message: "Internal server error",
      path: "",
    };
  }
}
