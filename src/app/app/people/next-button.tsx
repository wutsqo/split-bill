import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTabStore } from "@hooks/useTabStore";
import { TAB_IDS } from "../constant";

export default function NextButton({
  disabled,
  numberOfPeople,
}: {
  readonly disabled?: boolean;
  readonly numberOfPeople: number;
}) {
  const setActiveTabId = useTabStore((state) => state.setActiveTabId);

  return (
    <div className="join w-full fixed rounded-none sm:rounded-2xl left-0 bottom-0 sm:sticky sm:bottom-4">
      <div className="join-item bg-base-200 flex items-center justify-between w-full p-4">
        <div>Registered</div>
        <div>
          {numberOfPeople === 1 ? `1 Person` : `${numberOfPeople} people`}
        </div>
      </div>
      <button
        className="btn btn-primary btn-lg join-item shrink-0 uppercase"
        onClick={() => setActiveTabId(TAB_IDS.BILLS)}
        disabled={disabled}
      >
        Next
        <ChevronRightIcon className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
