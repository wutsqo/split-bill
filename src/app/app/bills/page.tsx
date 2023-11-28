"use client";

import { useAppContext } from "../context";
import { useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import useFormState from "@/hooks/useFormState";
import { required, validate } from "@/utils/forms";

import { SplitType, SplitTypeLabel } from "../type";
import { SplitEqualForm } from "./split-equals-form";
import { SplitExactForm } from "./split-exact-form";
import { SplitPercentForm } from "./split-percent-form";

export default function Page() {
  const { people } = useAppContext();
  const newTrxModal = useRef<HTMLDialogElement>(null);

  const { data, updateData, isValid, resetData } = useFormState(
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
      amount: validate([required]),
      paidBy: validate([required]),
      date: validate([required]),
    }
  );

  const onChangeSplitType = (splitType: SplitType) => {
    updateData(
      "split",
      Object.fromEntries(people.map((person) => [person.id, 0]))
    );
    updateData("splitType", splitType);
  };

  if (people.length === 0) {
    return (
      <div className="py-4 flex flex-col gap-4">
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">No people yet</h2>
            <p className="text-base-content">Add some people to get started.</p>
          </div>
        </div>
      </div>
    );
  }

  const splitFormProps = {
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

  console.log(data);

  return (
    <div className="py-4 flex flex-col gap-4">
      <button
        type="button"
        className="btn"
        onClick={() => newTrxModal.current?.showModal()}
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add Transaction
      </button>

      <dialog ref={newTrxModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">New Transaction</h3>
          <form className="flex flex-col gap-2" onSubmit={() => {}}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="What's the title of this transaction?"
                className="input input-bordered w-full"
                value={data.name}
                onChange={(e) => updateData("name", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Amount</span>
                </label>
                <div className="join">
                  <span className="join-item flex items-center px-4 border border-base-300">
                    Rp
                  </span>
                  <input
                    type="number"
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
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={data.date}
                  onChange={(e) => updateData("date", e.target.value)}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Paid By</span>
              </label>
              <select
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

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Split</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={data.splitType}
                onChange={(e) => onChangeSplitType(e.target.value as SplitType)}
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
          </form>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                newTrxModal.current?.close();
                resetData();
              }}
            >
              Cancel
            </button>
            <button className="btn btn-primary" disabled={!isValid}>
              Add
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
