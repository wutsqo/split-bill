"use client";

import { appName } from "../config";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="mx-auto container px-4 min-h-screen flex items-center justify-center">
      <div>
        <h2>Welcome to {appName}</h2>
        <form className="mt-8 card" onSubmit={handleSubmit}>
          <label className="block mb-2" htmlFor="email">
            Enter your email address
          </label>
          <input
            className="input input-bordered w-full"
            id="email"
            name="email"
            type="email"
          />
          <p className="text-sm mt-2">
            If you don&apos;t have an account, we&apos;ll create one for you.
          </p>
          <button className="btn mt-6 w-full">Login with Magic Link</button>
        </form>
      </div>
    </div>
  );
}
