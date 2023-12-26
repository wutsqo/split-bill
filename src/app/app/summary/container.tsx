"use client";

import { useEffect } from "react";
import { SummaryCard } from "./summary-card";
import { usePeopleStore } from "@hooks/usePeopleStore";

export default function SummaryContainer() {
  const { people, preferSimplifiedBalances, setPreferSimplifiedBalances } =
    usePeopleStore();

  useEffect(() => {
    usePeopleStore.persist.rehydrate();
  }, []);

  if (people.length <= 1) {
    return (
      <div className="min-h-[calc(100vh-14.5rem)]">
        <div role="alert" className="alert mt-4">
          <div className="w-full flex justify-center gap-3 items-center text-sm text-center sm:col-span-2 sm:text-base">
            <span>💡</span>
            <span>Add at least 2 people to get started</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 flex flex-col gap-4">
      <div className="card card-compact bg-base-100 ">
        <div className="card-body">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-base font-medium">
                Simplify Debts
              </span>
              <input
                type="checkbox"
                className="toggle"
                checked={preferSimplifiedBalances}
                onChange={() =>
                  setPreferSimplifiedBalances(!preferSimplifiedBalances)
                }
              />
            </label>
          </div>
        </div>
      </div>

      {people.map((person) => (
        <SummaryCard
          key={`summary-card-${person.id}`}
          person={person}
          preferSimplified={preferSimplifiedBalances}
        />
      ))}

      {/* <input
        type="checkbox"
        id="simplify-modal-debt"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Simplify Debt</h3>
          <p className="py-4">
            It will minimize the number of transactions required to settle all
            debts.
          </p>
          <p className="text-center">NORMAL</p>
          <div className="flex justify-center mt-2 px-4">
            <Image src={Normal} alt="normal" width={400} height={200} />
          </div>
          <p className="pt-6 text-center">SIMPLIFIED</p>
          <div className="flex justify-center mt-2 px-4">
            <Image src={Simplified} alt="normal" width={400} height={200} />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost uppercase">Nevermind</button>
            </form>
            <button className="btn btn-error uppercase" onClick={() => {}}>
              Reset
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="simplify-modal-debt">
          Close
        </label>
      </div> */}
    </div>
  );
}
