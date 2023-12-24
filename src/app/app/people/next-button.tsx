"use client";

import { useRouter } from "next/navigation";
import { usePeopleStore } from "@hooks/usePeopleStore";

export default function NextButton() {
  const router = useRouter();
  const { people } = usePeopleStore();

  if (people.length <= 1) return null;

  return (
    <button className="btn" onClick={() => router.push("/app/bills")}>
      Next
    </button>
  );
}
