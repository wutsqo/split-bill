"use client";

import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "@hooks/useAuthStore";
import { useGroupStore } from "@hooks/useGroupStore";
import Link from "next/link";

export default function NotFound() {
  const logout = useAuthStore((state) => state.logout);
  const resetGroup = useGroupStore((state) => state.reset);
  const resetTab = useGroupStore((state) => state.reset);

  return (
    <div className="grid place-content-center h-[90vh] relative z-10">
      <h1 className="font-taviraj text-6xl">404!</h1>
      <h2 className="font-taviraj mt-4">This page doesn&apos;t exist.</h2>
      <p className="prose mt-4"></p>
      <Link href="/" className="btn btn-outline mt-16">
        <ArrowUturnLeftIcon className="w-4 h-4 mr-2" />
        Return Home
      </Link>
    </div>
  );
}
