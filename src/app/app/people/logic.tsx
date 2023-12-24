"use client";

import useFormState from "@/hooks/useFormState";
import { required, validate } from "@/utils/forms";
import { usePeopleStore } from "@hooks/usePeopleStore";

export default function useLogic() {
  const { data, updateData, isValid, resetData } = useFormState(
    {
      name: "",
    },
    {
      name: validate([required]),
    }
  );
  const { addPerson } = usePeopleStore();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPerson({ name: data.name });
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
