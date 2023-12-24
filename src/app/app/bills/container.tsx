"use client";

import { useEffect, useRef, useState } from "react";
import { PlusIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import useFormState from "@/hooks/useFormState";
import { isGreaterThan, isNumber, required, validate } from "@/utils/forms";
import { SplitType, SplitTypeLabel } from "../type";
import { SplitEqualForm } from "./split-equals-form";
import { SplitExactForm } from "./split-exact-form";
import { SplitPercentForm } from "./split-percent-form";
import { TrxCard } from "./trx-card";
import axios from "axios";
import { mergeClassname } from "@/utils/merge-classname";
import { usePeopleStore } from "@hooks/usePeopleStore";
import { SplitFormProps } from "./type";
import { useTransactionStore } from "@hooks/useTransactionStore";
import RemoveModal from "./remove-modal";
import EmptyState from "./empty-state";

const STEPS = [
  {
    id: 0,
    name: "Bills",
  },
  {
    id: 1,
    name: "Payers",
  },
  {
    id: 2,
    name: "Split",
  },
];

export default function BillsContainer() {
  const { addTransaction, transactions, removeTransaction } =
    useTransactionStore();
  const { people, getPerson } = usePeopleStore();
  const newTrxModal = useRef<HTMLDialogElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const { data, updateData, isValid, resetData, errors } = useFormState(
    {
      name: "",
      amount: 0,
      paidBy: people[0]?.id ?? "",
      date: new Date().toISOString().split("T")[0],
      splitType: SplitType.EQUAL,
      split: Object.fromEntries(
        people.map((person) => [person.id, 0])
      ) as Record<string, number>,
    },
    {
      name: validate([required]),
      amount: validate([required, isNumber, isGreaterThan(0)]),
      paidBy: validate([required]),
      date: validate([required]),
    }
  );

  const isSplitValid = () => {
    switch (data.splitType) {
      case SplitType.EQUAL:
        return Object.values(data.split).includes(1);
      case SplitType.PERCENT:
        return Object.values(data.split).reduce((a, b) => a + b, 0) === 100;
      case SplitType.EXACT:
        return (
          Object.values(data.split).reduce((a, b) => a + b, 0) === data.amount
        );
    }
  };

  const onChangeSplitType = (splitType: SplitType) => {
    updateData(
      "split",
      Object.fromEntries(people.map((person) => [person.id, 0]))
    );
    updateData("splitType", splitType);
  };

  const [toRemove, setToRemove] = useState<string>("");
  const removeModalRef = useRef<HTMLDialogElement>(null);

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

  const splitFormProps: SplitFormProps = {
    amount: data.amount,
    split: data.split,
    updateSplit: (split: Record<string, number>) => updateData("split", split),
    people,
  };

  const renderSplitForm = () => {
    switch (data.splitType) {
      case SplitType.EQUAL:
        return <SplitEqualForm {...splitFormProps} />;
      case SplitType.PERCENT:
        return <SplitPercentForm {...splitFormProps} />;
      case SplitType.EXACT:
        return <SplitExactForm {...splitFormProps} />;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || !isSplitValid()) return;
    const split = Object.keys(data.split).reduce(
      (acc, key) => {
        if (data.split[key] === 0) return acc;
        return {
          ...acc,
          [key]: {
            amount: data.split[key],
            id: key,
            name: getPerson(key)!.name,
          },
        };
      },
      {} as Record<
        string,
        {
          amount: number;
          id: string;
          name: string;
        }
      >
    );

    addTransaction({
      date: new Date(data.date),
      amount: data.amount,
      name: data.name,
      paidBy: {
        id: data.paidBy,
        name: getPerson(data.paidBy)!.name,
      },
      splitType: data.splitType,
      split,
    });
    newTrxModal.current?.close();
    setCurrentStep(0);
    resetData();
  };

  const onExport = () => {
    axios
      .post("/api/trx/csv", {
        transactions,
        people,
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
      });
  };

  const onRemoveModalOpen = (id: string) => {
    setToRemove(id);
    removeModalRef.current?.showModal();
  };

  const onRemoveTransaction = (id: string) => {
    removeTransaction(id);
    removeModalRef.current?.close();
  };

  return (
    <div className="py-4 flex flex-col gap-4">
      <div className="join w-full">
        <button
          type="button"
          className="btn text-xs join-item w-1/2 "
          onClick={() => newTrxModal.current?.showModal()}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Transaction
        </button>
        <button
          type="button"
          className="btn text-xs join-item w-1/2 "
          onClick={onExport}
          disabled={transactions.length === 0}
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Export CSV
        </button>
      </div>

      {transactions.length === 0 ? <EmptyState /> : null}

      {transactions.map((trx) => (
        <TrxCard
          person={getPerson(trx.paidBy.id)!}
          trx={trx}
          key={trx.id}
          onRemoveModalOpen={() => onRemoveModalOpen(trx.id)}
        />
      ))}

      <dialog ref={newTrxModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">New Transaction</h3>
          <form className="flex flex-col gap-2" onSubmit={onSubmit}>
            <ul className="steps text-sm">
              {STEPS.map((step) => (
                <li
                  key={step.id}
                  className={mergeClassname(
                    "step text-xs",
                    currentStep >= step.id && "step-primary"
                  )}
                >
                  {step.name}
                </li>
              ))}
            </ul>

            {currentStep === 0 ? (
              <>
                <div className="form-control w-full">
                  <label className="label" htmlFor="bills-name-input">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    id="bills-name-input"
                    placeholder="What's the title of this transaction?"
                    className="input input-bordered w-full"
                    value={data.name}
                    onChange={(e) => updateData("name", e.target.value)}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label" htmlFor="bills-amount-input">
                    <span className="label-text">Amount</span>
                  </label>
                  <div className="join">
                    <span className="join-item flex items-center px-4 border border-base-300">
                      Rp
                    </span>
                    <input
                      type="number"
                      id="bills-amount-input"
                      placeholder="What's the amount?"
                      className="input input-bordered w-full join-item"
                      value={data.amount}
                      onChange={(e) =>
                        updateData("amount", e.target.valueAsNumber)
                      }
                    />
                  </div>
                </div>
                <div className="form-control w-full">
                  <label className="label" htmlFor="bills-date-input">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    type="date"
                    id="bills-date-input"
                    className="input input-bordered w-full"
                    value={data.date}
                    onChange={(e) => updateData("date", e.target.value)}
                  />
                </div>
              </>
            ) : null}

            {currentStep === 1 ? (
              <div className="form-control w-full">
                <label className="label" htmlFor="bills-paid-by-input">
                  <span className="label-text">Paid By</span>
                </label>
                <select
                  id="bills-paid-by-input"
                  className="select select-bordered w-full"
                  value={data.paidBy}
                  onChange={(e) => updateData("paidBy", e.target.value)}
                >
                  {people.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {currentStep === 2 ? (
              <>
                <div className="form-control w-full">
                  <label className="label" htmlFor="bills-split-type-input">
                    <span className="label-text">Split</span>
                  </label>
                  <select
                    id="bills-split-type-input"
                    className="select select-bordered w-full"
                    value={data.splitType}
                    onChange={(e) =>
                      onChangeSplitType(e.target.value as SplitType)
                    }
                  >
                    {Object.values(SplitType).map((splitType) => (
                      <option key={splitType} value={splitType}>
                        {SplitTypeLabel[splitType]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="divider">Split Between</div>

                {renderSplitForm()}
              </>
            ) : null}

            <div className="modal-action">
              {currentStep === 0 ? (
                <button
                  className="btn"
                  onClick={() => {
                    newTrxModal.current?.close();
                    resetData();
                  }}
                  type="button"
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  type="button"
                >
                  Back
                </button>
              )}

              {currentStep < STEPS.length - 1 ? (
                <button
                  className="btn btn-primary"
                  disabled={
                    currentStep === 0
                      ? !!errors.name || !!errors.amount || !!errors.date
                      : !!errors.paidBy
                  }
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </button>
              ) : null}

              {currentStep === 2 ? (
                <button
                  className="btn btn-primary"
                  disabled={!isValid || !isSplitValid()}
                  type="submit"
                >
                  Add
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </dialog>

      <RemoveModal
        onRemove={onRemoveTransaction}
        ref={removeModalRef}
        trxId={toRemove}
        trxName={transactions.find((trx) => trx.id === toRemove)?.name ?? ""}
      />
    </div>
  );
}
