"use client";

import { SummaryCard } from "./summary-card";
import { ArrowDownTrayIcon, ShareIcon } from "@heroicons/react/24/outline";
import useStore from "@hooks/useStore";
import { useAuthStore } from "@hooks/useAuthStore";
import { useGroupStore } from "@hooks/useGroupStore";
import ShareModal from "./share-modal";
import { showModal } from "@/utils/common";

export default function SummaryContainer() {
  const preferSimplifiedBalances = useStore(
    useGroupStore,
    (state) => state.preferSimplifiedBalances
  ) as boolean;
  const { setPreferSimplifiedBalances } = useGroupStore();
  const people = useStore(useGroupStore, (state) => state.people);
  const transactions = useStore(useGroupStore, (state) => state.transactions);
  const user = useStore(useAuthStore, (state) => state.user);
  const { showAuthModal } = useAuthStore();

  if (!people || !transactions) return null;
  if (people.length <= 1) {
    return (
      <div className="min-h-[calc(100vh-14.5rem)]">
        <div role="alert" className="alert mt-4">
          <div className="w-full flex justify-center gap-3 items-center text-sm text-center sm:col-span-2 sm:text-base">
            <span>💡</span>
            <span>Add at least 2 people to get started</span>
          </div>
        </div>
      </div>
    );
  }
  const onClickPDFButton = () => {
    if (!user) {
      showAuthModal({
        loginTitle: "Login to Generate PDF",
      });
    } else {
    }
  };
  const onClickShareButton = () => {
    if (!user) {
      showAuthModal({
        loginTitle: "Login to Share",
      });
    } else {
      showModal("share_modal");
    }
  };
  return (
    <div className="py-4 flex flex-col gap-4 pb-20">
      <div className="join w-full bg-base-100">
        <button
          type="button"
          className="btn btn-ghost text-xs join-item w-1/2 uppercase"
          disabled={transactions.length < 1}
          onClick={onClickPDFButton}
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          Export PDF
        </button>
        <div className="bg-base-200 w-0.5 shrink-0 h-12 join-item"></div>
        <button
          type="button"
          className="btn btn-ghost text-xs join-item w-1/2 uppercase"
          onClick={onClickShareButton}
        >
          <ShareIcon className="h-4 w-4" />
          Share
        </button>
      </div>

      <div className="card card-compact bg-base-100 ">
        <div className="card-body">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-base font-medium">
                Simplify Repayments
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={preferSimplifiedBalances}
                onChange={() =>
                  setPreferSimplifiedBalances(!preferSimplifiedBalances)
                }
              />
            </label>
          </div>
        </div>
      </div>

      {people.map((person) => (
        <SummaryCard
          key={`summary-card-${person.id}`}
          person={person}
          preferSimplified={preferSimplifiedBalances}
        />
      ))}

      <ShareModal />

      {/* <input
        type="checkbox"
        id="simplify-modal-debt"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Simplify Debt</h3>
          <p className="py-4">
            It will minimize the number of transactions required to settle all
            debts.
          </p>
          <p className="text-center">NORMAL</p>
          <div className="flex justify-center mt-2 px-4">
            <Image src={Normal} alt="normal" width={400} height={200} />
          </div>
          <p className="pt-6 text-center">SIMPLIFIED</p>
          <div className="flex justify-center mt-2 px-4">
            <Image src={Simplified} alt="normal" width={400} height={200} />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost uppercase">Nevermind</button>
            </form>
            <button className="btn btn-error uppercase" onClick={() => {}}>
              Reset
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="simplify-modal-debt">
          Close
        </label>
      </div> */}
    </div>
  );
}
