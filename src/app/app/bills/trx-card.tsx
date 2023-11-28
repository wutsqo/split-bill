import { FC } from "react";
import { Person, Transaction } from "../type";
import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";

interface TrxCardProps {
  trx: Transaction;
  person: Person;
}

export const TrxCard: FC<TrxCardProps> = ({ trx, person }) => {
  return (
    <div className="card card-compact bg-base-200">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div className="card-title">{trx.name}</div>
          <div>
            {new Date(trx.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={createAvatar(funEmoji, {
                seed: person.name,
              }).toDataUriSync()}
              alt={person.name}
              className="mask mask-squircle w-5 h-5"
            />
            Paid by {person.name}
          </div>
          <div>
            {trx.amount.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
