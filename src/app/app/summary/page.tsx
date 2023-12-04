"use client";

import { useAppContext } from "../context";
import { SummaryCard } from "./summary-card";

export default function Page() {
  const { setPreferSimplified, preferSimplified, people } = useAppContext();

  return (
    <div className="py-4 flex flex-col gap-4">
      <div className="card card-compact bg-base-200">
        <div className="card-body">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-lg font-medium">
                Simplify Debt
              </span>
              <input
                type="checkbox"
                className="toggle"
                checked={preferSimplified}
                onChange={(e) => setPreferSimplified(e.target.checked)}
              />
            </label>
          </div>
        </div>
      </div>

      {people.map((person) => (
        <SummaryCard key={person.id} personId={person.id} />
      ))}
    </div>
  );
}
