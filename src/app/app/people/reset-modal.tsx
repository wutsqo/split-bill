import { forwardRef } from "react";

interface RemoveModalProps {
  onReset: () => void;
}

type Ref = HTMLDialogElement;

const ResetModal = forwardRef<Ref, RemoveModalProps>(({ onReset }, ref) => {
  return (
    <dialog className="modal modal-bottom sm:modal-middle" ref={ref}>
      <div className="modal-box">
        <p className="py-4 text-base">
          This will <strong>reset all data</strong> including transactions and
          people. Are you sure you want to proceed?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost uppercase">Nevermind</button>
          </form>
          <button className="btn btn-error uppercase" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </dialog>
  );
});

ResetModal.displayName = "ResetModal";

export default ResetModal;
