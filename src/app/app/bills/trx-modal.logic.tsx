import useFormState from "@hooks/useFormState";
import { usePeopleStore } from "@hooks/usePeopleStore";
import { SplitData, SplitType, Transaction } from "../type";
import { isGreaterThan, isNumber, required, validate } from "@/utils/forms";
import { useTransactionStore } from "@hooks/useTransactionStore";
import { useState } from "react";
import { SplitFormProps } from "./type";
import { SplitEqualForm } from "./split-equals-form";
import { SplitPercentForm } from "./split-percent-form";
import { SplitExactForm } from "./split-exact-form";
import TransactionService from "@/utils/core/transaction";

const formInitialData = {
  name: "",
  amount: 0,
  date: new Date().toISOString().split("T")[0],
  splitType: SplitType.EQUAL,
};

const formValidators = {
  name: validate([required]),
  amount: validate([required, isNumber, isGreaterThan(0)]),
  paidBy: validate([required]),
  date: validate([required]),
};

export default function useLogic({
  transaction,
  mode = "add",
}: {
  transaction?: Transaction;
  mode: "add" | "edit";
}) {
  const { people, getPerson } = usePeopleStore();
  const { addTransaction, editTransaction } = useTransactionStore();
  const [currentStep, setCurrentStep] = useState(0);
  const {
    data: formData,
    updateData: updateFormData,
    isValid: isFormValid,
    resetData: resetFormData,
    errors: formErrors,
  } = useFormState(
    {
      ...formInitialData,
      paidBy: people[0].id,
      split: Object.fromEntries(
        people.map((person) => [person.id, 0])
      ) as Record<string, number>,
    },
    formValidators
  );

  const isSplitValid = () => {
    switch (formData.splitType) {
      case SplitType.EQUAL:
        return Object.values(formData.split).includes(1);
      case SplitType.PERCENT:
        return Object.values(formData.split).reduce((a, b) => a + b, 0) === 100;
      case SplitType.EXACT:
        return (
          Object.values(formData.split).reduce((a, b) => a + b, 0) ===
          formData.amount
        );
    }
  };

  const onChangeSplitType = (splitType: SplitType) => {
    updateFormData(
      "split",
      Object.fromEntries(people.map((person) => [person.id, 0]))
    );
    updateFormData("splitType", splitType);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || !isSplitValid()) return;
    const split = Object.keys(formData.split).reduce((acc, key) => {
      if (formData.split[key] === 0) return acc;
      return {
        ...acc,
        [key]: {
          fraction: formData.split[key],
          id: key,
          name: getPerson(key)!.name,
        },
      };
    }, {} as Record<string, Omit<SplitData, "amount">>);
    const newTransaction: Omit<Transaction, "id"> = {
      date: new Date(formData.date),
      amount: formData.amount,
      name: formData.name,
      paidBy: {
        id: formData.paidBy,
        name: getPerson(formData.paidBy)!.name,
      },
      splitType: formData.splitType,
      split: TransactionService.calculateSplitAmount(
        formData.amount,
        split,
        formData.splitType
      ),
    };
    if (mode === "add") {
      addTransaction(newTransaction);
    } else {
      editTransaction(transaction?.id!, newTransaction);
    }
    setCurrentStep(0);
    resetFormData();
  };

  const splitFormProps: SplitFormProps = {
    amount: formData.amount,
    split: formData.split,
    updateSplit: (split: Record<string, number>) =>
      updateFormData("split", split),
    people,
  };

  const renderSplitForm = () => {
    switch (formData.splitType) {
      case SplitType.EQUAL:
        return <SplitEqualForm {...splitFormProps} />;
      case SplitType.PERCENT:
        return <SplitPercentForm {...splitFormProps} />;
      case SplitType.EXACT:
        return <SplitExactForm {...splitFormProps} />;
    }
  };

  return {
    onSubmit,
    formData,
    updateFormData,
    formErrors,
    isFormValid,
    isSplitValid,
    onChangeSplitType,
    resetFormData,
    currentStep,
    setCurrentStep,
    people,
    renderSplitForm,
  };
}
