"use client";

import useFormState from "@/hooks/useFormState";
import { required, validate } from "@/utils/forms";
import { useGroupStore } from "@hooks/useGroupStore";
import { useState } from "react";

export default function useLogic() {
  const personFormState = useFormState(
    {
      name: "",
    },
    {
      name: validate([required]),
    }
  );

  const [editGroupMode, setEditGroupMode] = useState<boolean>(false);
  const addPerson = useGroupStore((state) => state.addPerson);
  const onPersonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPerson({ name: personFormState.data.name });
    personFormState.resetData();
  };

  return {
    personFormState,
    addPerson,
    onPersonSubmit,
    editGroupMode,
    setEditGroupMode,
  };
}
