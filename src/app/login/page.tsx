"use client";

import { SITE_URL } from "../config";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useFormState from "@/hooks/useFormState";
import { isEmail, required, validate } from "@/utils/forms";
import { useState } from "react";
import toast from "react-hot-toast";
import OtpSent from "./otp-sent";
import LoginForm from "./login-form";

type LoginStep = "EMAIL_FORM" | "OTP_SENT";

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
  const [step, setStep] = useState<LoginStep>("EMAIL_FORM");
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
        setStep("OTP_SENT");
      })
      .catch((error) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signInWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${SITE_URL}/auth/callback`,
      },
    });
  };

  const renderStep = () => {
    switch (step) {
      case "EMAIL_FORM":
        return (
          <LoginForm
            email={data.email}
            isValid={isValid}
            loading={loading}
            onChangeEmail={(value: string) => updateData("email", value)}
            onSubmit={handleSubmit}
            signInWithGoogle={signInWithGoogle}
          />
        );
      case "OTP_SENT":
        return (
          <OtpSent
            email={data.email}
            onChangeEmail={() => setStep("EMAIL_FORM")}
          />
        );
    }
  };

  return <div>{renderStep()}</div>;
}
