import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const REDIRECT_LOGGED_IN_PATHS = ["/login"];
const REDIRECT_LOGGED_OUT_PATHS = ["/account"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user)
    if (REDIRECT_LOGGED_IN_PATHS.includes(req.nextUrl.pathname))
      return NextResponse.redirect(new URL("/app", req.url));

  if (!user)
    if (REDIRECT_LOGGED_OUT_PATHS.includes(req.nextUrl.pathname))
      return NextResponse.redirect(new URL("/login", req.url));

  return res;
}

export const config = {
  matcher: ["/login", "/account"],
};
