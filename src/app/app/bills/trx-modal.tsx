"use client";

import { forwardRef, useEffect } from "react";
import { STEPS } from "./constant";
import { mergeClassname } from "@/utils/merge-classname";
import { SplitType, SplitTypeLabel, Transaction } from "../type";
import useLogic from "./trx-modal.logic";

interface RemoveModalProps {
  onClose: () => void;
  mode: "add" | "edit";
  transaction?: Transaction;
}

type Ref = HTMLDialogElement;

const TrxModal = forwardRef<Ref, RemoveModalProps>(
  ({ onClose, mode, transaction }, ref) => {
    const {
      onSubmit,
      formData,
      updateFormData,
      isFormValid,
      isSplitValid,
      formErrors,
      resetFormData,
      people,
      currentStep,
      setCurrentStep,
      onChangeSplitType,
      renderSplitForm,
    } = useLogic({
      transaction,
      mode,
    });

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      onSubmit(e);
      onClose();
    };

    useEffect(() => {
      if (mode === "add" || !transaction) {
        resetFormData();
        setCurrentStep(0);
        return;
      }
      updateFormData("name", transaction.name);
      updateFormData("amount", transaction.amount);
      updateFormData(
        "date",
        new Date(transaction.date).toISOString().split("T")[0]
      );
      updateFormData("paidBy", transaction.paidBy.id);
      updateFormData("splitType", transaction.splitType);
      updateFormData(
        "split",
        Object.keys(transaction.split).reduce(
          (acc, key) => ({
            ...acc,
            [key]: transaction.split[key].fraction,
          }),
          {} as Record<string, number>
        )
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, transaction]);

    return (
      <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {mode === "add" ? "New Transaction" : `Edit ${transaction?.name}`}
          </h3>
          <form className="flex flex-col gap-2" onSubmit={onFormSubmit}>
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
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
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
                      value={formData.amount}
                      onChange={(e) =>
                        updateFormData("amount", e.target.valueAsNumber)
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
                    value={formData.date}
                    onChange={(e) => updateFormData("date", e.target.value)}
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
                  value={formData.paidBy}
                  onChange={(e) => updateFormData("paidBy", e.target.value)}
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
                    value={formData.splitType}
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
                  className="btn uppercase"
                  onClick={() => {
                    onClose();
                    if (mode === "add") resetFormData();
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
                  className="btn btn-primary uppercase"
                  disabled={
                    currentStep === 0
                      ? !!formErrors.name ||
                        !!formErrors.amount ||
                        !!formErrors.date
                      : !!formErrors.paidBy
                  }
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </button>
              ) : null}

              {currentStep === 2 ? (
                <button
                  className="btn btn-primary uppercase"
                  disabled={!isFormValid || !isSplitValid()}
                  type="submit"
                >
                  {mode === "add" ? "Add" : "Save"}
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </dialog>
    );
  }
);

TrxModal.displayName = "TrxModal";

export default TrxModal;
