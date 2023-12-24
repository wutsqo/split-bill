"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useAppContext } from "../context";
import PersonForm from "./person-form";
import PersonCard from "./person-card";
import EmptyState from "./empty-state";
import NextButton from "./next-button";
import { useRef, useState } from "react";
import RemoveModal from "./remove-modal";
import ResetModal from "./reset-modal";
import { usePeopleStore } from "@hooks/usePeopleStore";

export default function Page() {
  const { reset } = useAppContext();
  const { removePerson, people } = usePeopleStore();
  const removeModalRef = useRef<HTMLDialogElement>(null);
  const resetModalRef = useRef<HTMLDialogElement>(null);
  const [toRemove, setToRemove] = useState<string | null>(null);
  const onRemove = (id: string) => {
    removePerson(id);
    removeModalRef.current?.close();
  };
  const onReset = () => {
    reset();
    resetModalRef.current?.close();
  };

  return (
    <div className="py-4 flex flex-col gap-4">
      <PersonForm />

      {people.length > 0 ? (
        <div className="card card-compact sm:card-normal bg-base-200">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div className="card-title text-base">People</div>
              <div className="">
                <button
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => resetModalRef.current?.showModal()}
                >
                  <TrashIcon className="w-4 h-4" />
                  Reset All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 divide-y">
              {people.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onRemove={() => {
                    setToRemove(person.id);
                    removeModalRef.current?.showModal();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {people.length <= 1 ? <EmptyState /> : null}

      <RemoveModal
        toRemove={toRemove}
        ref={removeModalRef}
        onRemove={onRemove}
      />
      <ResetModal ref={resetModalRef} onReset={onReset} />
      <NextButton />
    </div>
  );
}
