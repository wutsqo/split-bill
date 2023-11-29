"use client";

import { useAppContext } from "../context";
import { SummaryCard } from "./summary-card";

export default function Page() {
  const { setSimplifyDebts, simplifyDebts, transactions, people } =
    useAppContext();

  return (
    <div className="py-4 flex flex-col gap-4">
      <div className="card card-compact bg-base-200">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="card-title">Simplify Debt</h2>
            <input
              type="checkbox"
              className="toggle toggle-accent"
              checked={simplifyDebts}
              onChange={(e) => setSimplifyDebts(e.target.checked)}
            />
          </div>
        </div>
      </div>

      {people.map((person) => (
        <SummaryCard key={person.id} personId={person.id} />
      ))}

      {transactions.length === 0 ? (
        <div className="card">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">No Transactions</h2>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
