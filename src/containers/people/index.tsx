"use client";

import useFormState, { required, validate } from "@/hooks/useFormState";
import { FC } from "react";

export const PeopleContainer: FC = () => {
  const { data, updateData, isValid } = useFormState(
    {
      name: "",
    },
    {
      name: validate([required]),
    }
  );

  return (
    <div className="py-4 flex flex-col gap-4">
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Add New Person</h2>
          <div className="join">
            <input
              className="input w-full input-bordered join-item"
              placeholder="Enter name"
              value={data.name}
              onChange={(e) => updateData("name", e.target.value)}
            />
            <button className="btn btn-primary join-item" disabled={!isValid}>
              ADD
            </button>
          </div>
        </div>
      </div>
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="card-title">People</div>
        </div>
      </div>
    </div>
  );
};
