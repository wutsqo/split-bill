"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import PersonForm from "./person-form";
import PersonCard from "./person-card";
import { useEffect, useRef, useState } from "react";
import RemoveModal from "./remove-modal";
import ResetModal from "./reset-modal";
import { usePeopleStore } from "@hooks/usePeopleStore";
import { useResetEverything } from "@hooks/useResetEverything";
import dynamic from "next/dynamic";
import { mergeClassname } from "@/utils/merge-classname";

const NextButton = dynamic(() => import("./next-button"), { ssr: false });

export default function PeopleContainer() {
  const { removePerson, people } = usePeopleStore();
  const resetEverything = useResetEverything();
  const removeModalRef = useRef<HTMLDialogElement>(null);
  const resetModalRef = useRef<HTMLDialogElement>(null);
  const [toRemove, setToRemove] = useState<string>("");
  const onRemove = (id: string) => {
    removePerson(id);
    removeModalRef.current?.close();
  };
  const onReset = () => {
    resetEverything();
    resetModalRef.current?.close();
  };

  useEffect(() => {
    usePeopleStore.persist.rehydrate();
  }, []);

  const onRemoveModalOpen = (id: string) => {
    setToRemove(id);
    removeModalRef.current?.showModal();
  };

  return (
    <div className="py-4 flex flex-col gap-4">
      <PersonForm />

      <div
        className={mergeClassname(
          "card card-compact sm:card-normal bg-base-200",
          people.length === 0 ? "hidden" : "block"
        )}
      >
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
                onRemove={() => onRemoveModalOpen(person.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <RemoveModal
        toRemove={toRemove}
        ref={removeModalRef}
        onRemove={onRemove}
      />
      <ResetModal ref={resetModalRef} onReset={onReset} />
      <NextButton disabled={people.length < 2} numberOfPeople={people.length} />
    </div>
  );
}
