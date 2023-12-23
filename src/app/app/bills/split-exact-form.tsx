"use client";

import { FC } from "react";
import { SplitFormProps } from "./type";
import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";

export const SplitExactForm: FC<SplitFormProps> = ({
  amount,
  split,
  updateSplit,
  people,
}) => {
  const total = Object.values(split)
    .filter((value) => value > 0)
    .reduce((a, b) => a + b, 0);
  const diff = Math.abs(total - amount).toLocaleString("id-ID");
  const isOver = total > amount;

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      {people.map((person) => (
        <div className="form-control w-full" key={person.id}>
          <div className="join">
            <label className="label w-1/2 border border-base-300 join-item">
              <span className="label-text flex gap-2 items-center pl-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={createAvatar(funEmoji, {
                    seed: person.id,
                  }).toDataUriSync()}
                  alt={person.name}
                  className="mask mask-squircle w-7 h-7"
                />
                {person.name}
              </span>
            </label>
            <span className="join-item flex items-center px-4 border border-base-300">
              Rp
            </span>
            <input
              type="number"
              placeholder="What's the amount?"
              className="input input-bordered w-1/2 join-item"
              value={split[person.id] ?? 0}
              onChange={(e) =>
                updateSplit({
                  ...split,
                  [person.id]: e.target.valueAsNumber,
                })
              }
            />
          </div>
        </div>
      ))}
      <div className="text-sm text-error">
        {total !== amount ? (
          <span>
            Rp{diff} {isOver ? "over" : "left"}
          </span>
        ) : null}
      </div>
    </div>
  );
};
