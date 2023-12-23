import { LightBulbIcon } from "@heroicons/react/24/outline";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center">
      <LightBulbIcon className="w-12 h-12 text-gray-500" />
      <div className="text-center text-sm text-gray-500">
        Add people to start adding transactions
      </div>
    </div>
  );
}
