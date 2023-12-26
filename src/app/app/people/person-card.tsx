"use client";

import { createAvatar } from "@dicebear/core";
import { Person } from "../type";
import { funEmoji } from "@dicebear/collection";
import { FC, useRef, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { required, validate } from "@/utils/forms";
import useFormState from "@/hooks/useFormState";
import { usePeopleStore } from "@hooks/usePeopleStore";

interface PersonCardProps {
  person: Person;
  onRemove: (id: string) => void;
}

const PersonCard: FC<PersonCardProps> = ({ person, onRemove }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { data, updateData, isValid } = useFormState(
    {
      name: person.name,
    },
    {
      name: validate([required]),
    }
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const { editPerson } = usePeopleStore();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    editPerson(person.id, {
      name: data.name,
    });
    setEditMode(false);
  };
  const cancelEdit = () => {
    setEditMode(false);
    updateData("name", person.name);
  };

  return (
    <div className="flex flex-row gap-3 items-center join-item p-2 first:rounded-t-lg last:rounded-b-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={createAvatar(funEmoji, {
          seed: person.id,
        }).toDataUriSync()}
        alt={person.name}
        className="mask mask-squircle w-10 h-10 ml-2"
      />
      <div className="w-full truncate shrink-1">
        {editMode ? (
          <form className="w-full join" onSubmit={onSubmit}>
            <input
              type="text"
              className="input input-sm input-bordered w-full join-item"
              value={data.name}
              onChange={(e) => updateData("name", e.target.value)}
              ref={inputRef}
            />
            <button
              className="btn btn-sm btn-error join-item uppercase"
              onClick={cancelEdit}
              type="button"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
            <button
              className="btn btn-sm btn-primary join-item uppercase"
              disabled={!isValid}
              type="submit"
            >
              <CheckIcon className="w-4 h-4" />
            </button>
          </form>
        ) : (
          person.name
        )}
      </div>
      <div className="join shrink-0">
        {editMode ? null : (
          <>
            <button
              className="btn btn-sm btn-ghost join-item"
              onClick={() => {
                setEditMode(true);
                setTimeout(() => inputRef.current?.focus(), 0);
              }}
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              className="btn btn-sm btn-ghost join-item text-error"
              onClick={() => onRemove(person.id)}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
