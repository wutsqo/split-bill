"use client";

import { useEffect } from "react";
import { SummaryCard } from "./summary-card";
import { usePeopleStore } from "@hooks/usePeopleStore";

export default function SummaryContainer() {
  const { people } = usePeopleStore();

  useEffect(() => {
    usePeopleStore.persist.rehydrate();
  }, []);

  if (people.length <= 1) {
    return (
      <div role="alert" className="alert mt-4">
        <div className="w-full flex justify-center gap-3 items-center text-sm text-center sm:col-span-2 sm:text-base">
          <span>💡</span>
          <span>Add at least 2 people to get started</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 flex flex-col gap-4">
      <div className="card card-compact bg-base-200 hidden">
        <div className="card-body">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-lg font-medium">
                Simplify Debt
              </span>
              <input type="checkbox" className="toggle" />
            </label>
          </div>
        </div>
      </div>

      {people.map((person) => (
        <SummaryCard key={person.id} person={person} />
      ))}
    </div>
  );
}
