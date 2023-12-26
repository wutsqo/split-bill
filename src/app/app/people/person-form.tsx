"use client";

import useLogic from "./logic";

export default function PersonForm() {
  const { data, isValid, onSubmit, updateData } = useLogic();

  return (
    <div className="card-compact sm:card-normal card bg-base-100">
      <div className="card-body">
        <h2 className="card-title text-base">Add New Person</h2>
        <form className="join" onSubmit={onSubmit}>
          <input
            className="input w-full input-bordered join-item"
            placeholder="Enter name"
            value={data.name}
            onChange={(e) => updateData("name", e.target.value)}
          />
          <button
            className="btn btn-primary join-item"
            disabled={!isValid}
            type="submit"
          >
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}
