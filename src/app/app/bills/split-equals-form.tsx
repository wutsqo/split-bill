import { FC } from "react";
import { SplitFormProps } from "./type";
import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";

export const SplitEqualForm: FC<SplitFormProps> = ({
  split,
  updateSplit,
  people,
}) => {
  return (
    <div className="form-control w-full">
      <div className="join w-full mb-4">
        <button
          type="button"
          className="join-item btn w-1/2 btn-outline"
          onClick={() =>
            updateSplit(
              Object.fromEntries(
                people.map((person) => [person.id, 0])
              ) as Record<string, number>
            )
          }
        >
          Clear
        </button>
        <button
          type="button"
          className="join-item btn w-1/2 btn-outline"
          onClick={() =>
            updateSplit(
              Object.fromEntries(
                people.map((person) => [person.id, 1])
              ) as Record<string, number>
            )
          }
        >
          Everyone
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {people.map((person) => (
          <label className="label cursor-pointer" key={person.id}>
            <span className="label-text flex gap-2 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={createAvatar(funEmoji, {
                  seed: person.id,
                }).toDataUriSync()}
                alt={person.name}
                className="mask mask-squircle w-8 h-8"
              />
              {person.name}
            </span>
            <input
              type="checkbox"
              checked={split[person.id] === 1}
              onChange={(e) =>
                updateSplit({
                  ...split,
                  [person.id]: e.target.checked ? 1 : 0,
                })
              }
              className="checkbox checkbox-primary"
            />
          </label>
        ))}
      </div>
    </div>
  );
};
