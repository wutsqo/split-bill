import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTabStore } from "@hooks/useTabStore";
import { TAB_IDS } from "../constant";

export default function NextButton({
  disabled,
  numberOfTransactions,
  totalAmount,
}: {
  readonly disabled?: boolean;
  readonly numberOfTransactions: number;
  readonly totalAmount: number;
}) {
  const setActiveTabId = useTabStore((state) => state.setActiveTabId);

  return (
    <div className="join w-full fixed rounded-none sm:rounded-2xl left-0 bottom-0 sm:bottom-4 sm:max-w-[calc(640px-2rem)] sm:left-auto z-10 border-t sm:border border-base-300">
      <div className="join-item bg-base-100 flex items-center justify-between w-full p-4">
        <div>Total</div>
        <div>
          {numberOfTransactions === 1
            ? `1 Transaction`
            : `${numberOfTransactions} transactions`}
        </div>
      </div>
      <button
        className="btn btn-primary btn-lg join-item shrink-0 uppercase no-animation"
        onClick={() => setActiveTabId(TAB_IDS.SUMMARY)}
        disabled={disabled}
      >
        Next
        <ChevronRightIcon className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
