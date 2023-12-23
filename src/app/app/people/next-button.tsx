"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "../context";

export default function NextButton() {
  const router = useRouter();
  const { people } = useAppContext();

  if (people.length === 0) return null;

  return (
    <button className="btn" onClick={() => router.push("/app/bills")}>
      Next
    </button>
  );
}
