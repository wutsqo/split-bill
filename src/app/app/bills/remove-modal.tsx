import { forwardRef } from "react";

interface RemoveModalProps {
  trxName: string;
  trxId: string;
  onRemove: (id: string) => void;
}

type Ref = HTMLDialogElement;

const RemoveModal = forwardRef<Ref, RemoveModalProps>(
  ({ trxName, trxId, onRemove }, ref) => {
    return (
      <dialog className="modal modal-bottom sm:modal-middle" ref={ref}>
        <div className="modal-box">
          <p className="py-4 text-base">
            Are you sure you want to remove the <strong>{trxName}</strong>{" "}
            transaction?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost uppercase">
                Nevermind
              </button>
            </form>

            <button
              className="btn btn-error uppercase"
              onClick={() => onRemove(trxId)}
            >
              Remove
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);

RemoveModal.displayName = "RemoveModal";

export default RemoveModal;
