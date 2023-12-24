"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "../context";
import { SummaryCard } from "./summary-card";
import { usePeopleStore } from "@hooks/usePeopleStore";

export default function Page() {
  const { setPreferSimplified, preferSimplified } = useAppContext();
  const { people } = usePeopleStore();
  const [activePersonId, setActivePersonId] = useState<string>("");

  useEffect(() => {
    if (people.length) {
      setActivePersonId(people[0].id);
    }
  }, [people]);

  return (
    <div className="py-4 flex flex-col gap-4">
      <div className="card card-compact bg-base-200 hidden">
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

      <div>
        <div role="tablist" className="tabs tabs-boxed">
          {people.map((person) => (
            <>
              <input
                key={`tab-${person.id}`}
                type="radio"
                name="person_tabs"
                role="tab"
                className="tab"
                aria-label={person.name}
                checked={activePersonId === person.id}
                onChange={() => setActivePersonId(person.id)}
              />
              <div
                key={`summary-${person.id}`}
                role="tabpanel"
                className="tab-content rounded-b-box bg-base-200"
              >
                <SummaryCard personId={person.id} />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
