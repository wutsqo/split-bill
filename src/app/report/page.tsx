"use client";

import { PersonLabel } from "../app/person";
import { TrxCard } from "../app/bills/trx-card";
import { SummaryCard } from "../app/summary/summary-card";
import { usePeopleStore } from "@hooks/usePeopleStore";
import { useTransactionStore } from "@hooks/useTransactionStore";
import { useEffect } from "react";

export default function Page() {
  const { people } = usePeopleStore();
  const { transactions } = useTransactionStore();
  useEffect(() => {
    usePeopleStore.persist.rehydrate();
    useTransactionStore.persist.rehydrate();
  }, []);
  return (
    <div className="bg-white min-h-screen relative">
      <div className="container mx-auto max-w-screen-md p-4 print:p-0">
        <h2>People</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 border p-4">
          {people.map((person) => (
            <li
              key={person.id}
              className="bg-base-200 rounded-lg p-2 break-inside-avoid"
            >
              <PersonLabel person={person} />
            </li>
          ))}
        </ul>
        <h2 className="mt-8">Transactions</h2>
        <ul className="grid grid-cols-1 gap-2 mt-4">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="border break-inside-avoid">
              <TrxCard trx={transaction} hideActions />
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-2 mt-8">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 mb-4 items-center">
              <h2 className="">Summary</h2>
              <div className="badge badge-outline mt-1">default</div>
            </div>
            {people.map((person) => (
              <div
                className="border break-inside-avoid"
                key={`summary-card-${person.id}`}
              >
                <SummaryCard person={person} preferSimplified={false} />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 mb-4 items-center">
              <h2 className="">Summary</h2>
              <div className="badge badge-primary mt-1">simplified</div>
            </div>
            {people.map((person) => (
              <div
                className="border break-inside-avoid"
                key={`summary-card-${person.id}`}
              >
                <SummaryCard person={person} preferSimplified={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
