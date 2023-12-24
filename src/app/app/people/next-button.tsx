import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function NextButton({
  disabled,
  numberOfPeople,
}: {
  readonly disabled?: boolean;
  readonly numberOfPeople: number;
}) {
  const router = useRouter();

  return (
    <div className="join w-full">
      <div className="join-item bg-base-200 flex items-center justify-between w-full p-4">
        <div>Registered</div>
        <div>
          {numberOfPeople === 1 ? `1 Person` : `${numberOfPeople} people`}
        </div>
      </div>
      <button
        className="btn btn-primary btn-lg join-item shrink-0 uppercase"
        onClick={() => router.push("/app/bills")}
        disabled={disabled}
      >
        Next
        <ChevronRightIcon className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
