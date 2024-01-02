"use client";

import { useEffect, useState } from "react";
import { SummaryCard } from "./summary-card";
import { usePeopleStore } from "@hooks/usePeopleStore";
import {
  ArrowDownTrayIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useTransactionStore } from "@hooks/useTransactionStore";
import { generatePDF } from "./actions";
import { useFormStatus, useFormState } from "react-dom";
import { useSupabase } from "@hooks/useSupabase";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

function SubmitButton({ disabled }: { readonly disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="btn btn-primary glass bg-primary text-primary-content uppercase w-full"
      disabled={disabled}
    >
      {pending ? (
        <>
          <span className="loading loading-spinner"></span> Generating PDF...
        </>
      ) : (
        <>
          <ArrowDownTrayIcon className="h-5 w-5" />
          Download PDF
        </>
      )}
    </button>
  );
}

const initialState = {
  message: "",
  id: "",
};

export default function SummaryContainer() {
  const { people, preferSimplifiedBalances, setPreferSimplifiedBalances } =
    usePeopleStore();
  const { transactions } = useTransactionStore();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<null | User>(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { showAuthModal } = useSupabase();

  useEffect(() => {
    usePeopleStore.persist.rehydrate();
  }, []);

  const [state, formAction] = useFormState(generatePDF, initialState);
  useEffect(() => {
    if (state.id) {
      window.open(`/api/pdf?id=${state.id}`, "_blank");
    }
  }, [state]);

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
    <div className="py-4 flex flex-col gap-4 pb-20">
      <div className="card card-compact bg-base-100 ">
        <div className="card-body">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-base font-medium">
                Simplify Repayments
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={preferSimplifiedBalances}
                onChange={() =>
                  setPreferSimplifiedBalances(!preferSimplifiedBalances)
                }
              />
            </label>
          </div>
        </div>
      </div>

      <div className="card card-compact bg-base-100">
        <div className="card-body">
          {user ? (
            <form action={formAction}>
              <input
                type="hidden"
                name="people"
                required
                value={JSON.stringify(people)}
              />
              <input
                type="hidden"
                name="transactions"
                required
                value={JSON.stringify(transactions)}
              />
              <SubmitButton disabled={transactions.length < 1} />
            </form>
          ) : (
            <button
              className="btn btn-primary glass bg-primary text-primary-content uppercase w-full"
              type="button"
              onClick={showAuthModal}
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              Login to Generate PDF
            </button>
          )}
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
