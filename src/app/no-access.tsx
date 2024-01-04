import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NoAccess() {
  return (
    <div className="grid place-content-center h-[90vh] relative z-10">
      <h1 className="font-taviraj text-6xl">Oops!</h1>
      <h2 className="font-taviraj mt-4">This page is private.</h2>
      <p className="prose mt-4">
        If you get this link from someone, please ask them to set this page to
        public.
      </p>
      <Link href="/" className="btn btn-outline mt-16">
        <ArrowUturnLeftIcon className="w-4 h-4 mr-2" />
        Return Home
      </Link>
    </div>
  );
}
