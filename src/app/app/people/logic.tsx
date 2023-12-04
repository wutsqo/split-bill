"use client";

import useFormState from "@/hooks/useFormState";
import { required, validate } from "@/utils/forms";
import { useAppContext } from "../context";

export default function useLogic() {
  const { data, updateData, isValid, resetData } = useFormState(
    {
      name: "",
    },
    {
      name: validate([required]),
    }
  );
  const { addPerson } = useAppContext();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPerson(data.name);
    resetData();
  };

  return {
    data,
    updateData,
    isValid,
    resetData,
    addPerson,
    onSubmit,
  };
}
