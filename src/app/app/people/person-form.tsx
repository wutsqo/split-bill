"use client";

import {
  CheckIcon,
  PencilIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import useLogic from "./logic";
import { useGroupStore } from "@hooks/useGroupStore";
import useStore from "@hooks/useStore";
import useFormState from "@hooks/useFormState";
import { required, validate } from "@/utils/forms";
import { useEffect, useRef } from "react";

export default function PersonForm() {
  const { personFormState, onPersonSubmit, editGroupMode, setEditGroupMode } =
    useLogic();
  const inputRef = useRef<HTMLInputElement>(null);
  const groupName = useStore(useGroupStore, (state) => state.name) ?? "";
  const { updateGroup } = useGroupStore((state) => state);
  const groupFormState = useFormState(
    {
      name: "",
    },
    {
      name: validate([required]),
    }
  );
  useEffect(() => {
    groupFormState.updateData("name", groupName as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupName]);
  const onCancelEditGroup = () => {
    setEditGroupMode(false);
    groupFormState.updateData("name", groupName);
  };
  const onEditGroupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditGroupMode(false);
    updateGroup({ name: groupFormState.data.name });
  };
  const onEnableEditGroup = () => {
    setEditGroupMode(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="card-compact sm:card-normal card bg-base-100">
      <div className="card-body">
        <div className="flex items-center gap-2 mb-2">
          <div className="btn btn-sm btn-ghost btn-square shrink-0">
            <UserGroupIcon className="w-6 h-6" />
          </div>
          {editGroupMode ? (
            <form className="join w-full" onSubmit={onEditGroupSubmit}>
              <input
                className="input input-sm w-full input-bordered join-item"
                placeholder="Add group name"
                name="name"
                type="text"
                value={groupFormState.data.name}
                onChange={(e) =>
                  groupFormState.updateData("name", e.target.value)
                }
                ref={inputRef}
                required
              />
              <button
                className="btn btn-square btn-sm btn-error join-item uppercase"
                type="button"
                onClick={onCancelEditGroup}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
              <button
                className="btn btn-square btn-sm btn-primary join-item uppercase"
                type="submit"
                disabled={!groupFormState.isValid}
              >
                <CheckIcon className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="flex justify-between items-center w-full">
              <div className="text-lg w-full">{groupName}</div>
              <div className="join shrink-0">
                <button
                  className="btn btn-square btn-sm btn-ghost join-item"
                  onClick={onEnableEditGroup}
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
        <form className="join" onSubmit={onPersonSubmit}>
          <input
            className="input w-full input-bordered join-item"
            placeholder="Add new person"
            value={personFormState.data.name}
            onChange={(e) => personFormState.updateData("name", e.target.value)}
          />
          <button
            className="btn btn-primary join-item"
            disabled={!personFormState.isValid}
            type="submit"
          >
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}
