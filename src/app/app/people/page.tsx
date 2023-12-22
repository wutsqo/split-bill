"use client";

import { TrashIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";
import Link from "next/link";
import useLogic from "./logic";
import { useAppContext } from "../context";
import { useRouter } from "next/navigation";
import { isInIframe } from "@/utils/common";

export default function Page() {
  const { data, isValid, onSubmit, updateData } = useLogic();
  const { reset, people } = useAppContext();
  const router = useRouter();

  return (
    <div className="py-4 flex flex-col gap-4">
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Add New Person</h2>
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
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div className="card-title">People</div>
            <div className="">
              <button
                className="btn btn-ghost btn-sm text-error"
                onClick={reset}
              >
                <TrashIcon className="w-4 h-4" />
                Reset All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {people.map((person) => (
              <div key={person.id} className="card card-compact bg-base-100">
                <div className="card-body flex flex-row gap-4 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={createAvatar(funEmoji, {
                      seed: person.name,
                    }).toDataUriSync()}
                    alt={person.name}
                    className="mask mask-squircle w-12 h-12"
                  />
                  <div className="w-full">{person.name}</div>
                </div>
              </div>
            ))}
          </div>
          {people.length === 0 ? (
            <div className="flex flex-col items-center">
              <LightBulbIcon className="w-12 h-12 text-gray-500" />
              <div className="text-center text-sm text-gray-500">
                Add people to start adding transactions
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {people.length > 0 ? (
        <button
          className="btn"
          onClick={() => {
            if (isInIframe()) {
              if (window.top) {
                window.top.location.href = "/app/bills";
              } else {
                router.push("/app/bills");
              }
            } else {
              router.push("/app/bills");
            }
          }}
        >
          Next
        </button>
      ) : null}
    </div>
  );
}
