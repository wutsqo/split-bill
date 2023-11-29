import { FC } from "react";
import { Person, SplitType, Transaction } from "../type";
import { DELETED_USER } from "../constant";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useAppContext } from "../context";
import { PersonLabel } from "../person";
import { formatMoney } from "@/utils/common";

interface TrxCardProps {
  trx: Transaction;
  person: Person;
}

const calculateOwed = (trx: Transaction, personId: string) => {
  switch (trx.splitType) {
    case SplitType.EQUAL:
      return trx.amount / Object.keys(trx.split).length;
    case SplitType.PERCENT:
      return (trx.amount * trx.split[personId]) / 100;
    case SplitType.EXACT:
      return trx.split[personId];
  }
};

export const TrxCard: FC<TrxCardProps> = ({ trx, person = DELETED_USER }) => {
  const { people } = useAppContext();

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
          <PersonLabel name={person.name} prefix="Paid by" size="sm" />
          <div>{formatMoney(trx.amount)}</div>
        </div>

        <div className="card card-compact bg-base-100 mt-1">
          <div className="card-body">
            {Object.keys(trx.split)
              .filter((personId) => personId !== person.id)
              .map((personId) => (
                <div key={personId} className="flex justify-between">
                  <PersonLabel
                    name={people.find((person) => person.id === personId)?.name}
                    suffix="owes"
                    size="sm"
                  />

                  <div>{formatMoney(calculateOwed(trx, personId))}</div>
                </div>
              ))}
          </div>
        </div>

        <div className="card-actions justify-end join">
          <button className="btn btn-ghost btn-sm join-item text-error">
            <TrashIcon className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
