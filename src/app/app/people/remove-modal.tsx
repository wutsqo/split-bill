import { forwardRef } from "react";
import { checkIfPersonRemovable } from "@/utils/core";
import { useAppContext } from "../context";
import { usePeopleStore } from "@hooks/usePeopleStore";

interface RemoveModalProps {
  toRemove: string | null;
  onRemove: (id: string) => void;
}

type Ref = HTMLDialogElement;

const RemoveModal = forwardRef<Ref, RemoveModalProps>(
  ({ toRemove, onRemove }, ref) => {
    const { transactions } = useAppContext();
    const { people, peopleMap } = usePeopleStore();

    if (toRemove === null) return null;

    const result = checkIfPersonRemovable(transactions, toRemove);

    return (
      <dialog className="modal modal-bottom sm:modal-middle" ref={ref}>
        <div className="modal-box">
          {result?.removable ? (
            <p className="py-4 text-base">
              Are you sure you want to remove{" "}
              <strong>{peopleMap[toRemove]?.name}</strong>?
            </p>
          ) : (
            <>
              <p className="py-4 text-base">
                <strong>{people.find((p) => p.id === toRemove)?.name}</strong>{" "}
                cannot be removed because there are transactions associated with
                this person.
              </p>
              <table className="table bg-base-200">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {result?.transactions.map((trx) => (
                    <tr key={trx.id}>
                      <td>{new Date(trx.date).toLocaleDateString()}</td>
                      <td>{trx.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <div className="modal-action">
            <form method="dialog">
              {result?.removable ? (
                <button className="btn btn-sm btn-ghost uppercase">
                  Nevermind
                </button>
              ) : (
                <button className="btn btn-sm btn-primary uppercase">
                  Okay
                </button>
              )}
            </form>
            {result?.removable ? (
              <button
                className="btn btn-sm btn-error uppercase"
                onClick={() => onRemove(toRemove)}
              >
                Remove
              </button>
            ) : null}
          </div>
        </div>
      </dialog>
    );
  }
);

RemoveModal.displayName = "RemoveModal";

export default RemoveModal;
