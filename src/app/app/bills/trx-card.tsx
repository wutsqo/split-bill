import { FC } from "react";
import { Person, Transaction } from "../type";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { PersonLabel } from "../person";
import { formatMoney } from "@/utils/common";

interface TrxCardProps {
  trx: Transaction;
  person: Pick<Person, "id" | "name">;
  onRemoveModalOpen: () => void;
  onEditModalOpen: () => void;
}

export const TrxCard: FC<TrxCardProps> = ({
  trx,
  person,
  onRemoveModalOpen,
  onEditModalOpen,
}) => {
  return (
    <div className="card card-compact bg-base-100">
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
          <PersonLabel person={person} prefix="Paid by" size="sm" />
          <div>{formatMoney(trx.amount)}</div>
        </div>

        <div className="card card-compact bg-base-200 mt-1">
          <div className="card-body">
            {Object.keys(trx.split)
              .filter((key) => key !== trx.paidBy.id)
              .map((key) => (
                <div
                  key={`trxcard-${trx.id}-${trx.split[key].id}`}
                  className="flex justify-between"
                >
                  <PersonLabel
                    person={trx.split[key]}
                    suffix="owes"
                    size="sm"
                  />
                  <div>{formatMoney(trx.split[key].amount)}</div>
                </div>
              ))}
          </div>
        </div>

        <div className="card-actions justify-end join">
          <button
            className="btn btn-ghost btn-sm join-item"
            type="button"
            onClick={onEditModalOpen}
          >
            <PencilIcon className="w-4 h-4" />
            Edit
          </button>
          <button
            className="btn btn-ghost btn-sm join-item text-error"
            type="button"
            onClick={onRemoveModalOpen}
          >
            <TrashIcon className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
