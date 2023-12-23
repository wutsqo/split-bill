"use client";

import Link from "next/link";
import { SITE_URL, appName } from "../config";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useFormState from "@/hooks/useFormState";
import { isEmail, required, validate } from "@/utils/forms";
import { useState } from "react";
import toast from "react-hot-toast";

export enum LOGIN_STEP {
  EMAIL_FORM = "EMAIL_FORM",
  OTP_SENT = "OTP_SENT",
}

export default function Login() {
  const supabase = createClientComponentClient();
  const { data, updateData, isValid } = useFormState(
    {
      email: "",
    },
    {
      email: validate([required, isEmail]),
    }
  );
  const [step, setStep] = useState<LOGIN_STEP>(LOGIN_STEP.EMAIL_FORM);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    setLoading(true);
    supabase.auth
      .signInWithOtp({
        email: data.email,
        options: {
          emailRedirectTo: `${SITE_URL}/auth/callback`,
        },
      })
      .then((res) => {
        setStep(LOGIN_STEP.OTP_SENT);
      })
      .catch((error) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (step === LOGIN_STEP.OTP_SENT)
    return (
      <div className="mx-auto container px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center flex flex-col gap-8">
          <h2>Great! Now check your inbox</h2>
          <p>
            Please check your inbox at <strong>{data.email}</strong>.
            <span className="block mt-1">
              We&apos;ve sent the magic link for you to login.
            </span>
            <span className="block mt-2 text-sm">
              (can&apos;t find it? Please check the spam folder too)
            </span>
          </p>

          <button
            className="btn btn-ghost w-full"
            onClick={() => setStep(LOGIN_STEP.EMAIL_FORM)}
            type="button"
          >
            Use another email
          </button>
        </div>
      </div>
    );

  return (
    <div className="mx-auto container px-4 min-h-screen flex items-center justify-center">
      <div>
        <h1>Welcome to {appName}</h1>
        <form className="mt-8 card" onSubmit={handleSubmit}>
          <label className="block mb-2" htmlFor="email">
            Enter your email address
          </label>
          <input
            className="input input-bordered w-full"
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            value={data.email}
            onChange={(e) => updateData("email", e.target.value)}
          />
          <p className="text-sm mt-2">
            If you don&apos;t have an account, we&apos;ll create one for you.
          </p>
          <button className="btn mt-6 w-full" disabled={!isValid}>
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login with Magic Link"
            )}
          </button>
        </form>
        {/* <div className="divider">or</div>
        <button className="btn btn-primary w-full">Login with Google</button> */}
        <div className="mt-4 text-center w-full text-sm">
          <Link href="/app" className="link">
            I&apos;ll login later
          </Link>
        </div>
      </div>
    </div>
  );
}
