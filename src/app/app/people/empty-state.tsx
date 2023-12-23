import { LightBulbIcon } from "@heroicons/react/24/outline";

export default function EmptyState() {
  return (
    <div role="alert" className="alert">
      <LightBulbIcon className="w-5 h-5 mr-2" />
      <span>Start by adding at least two people.</span>
    </div>
  );
}
