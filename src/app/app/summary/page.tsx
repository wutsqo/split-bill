"use client";

import { SummaryCard } from "./summary-card";
import { usePeopleStore } from "@hooks/usePeopleStore";

export default function Page() {
  const { people } = usePeopleStore();

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
