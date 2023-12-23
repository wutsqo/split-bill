import { FC } from "react";

interface OtpSentProps {
  email: string;
  onChangeEmail: () => void;
}

const OtpSent: FC<OtpSentProps> = ({ email, onChangeEmail }) => {
  return (
    <div className="max-w-md flex flex-col gap-8">
      <h2>Great! Now check your inbox</h2>
      <p>
        <span>
          Please check your inbox at <strong>{email}</strong>.
        </span>
        <span className="block mt-1">
          We&apos;ve sent the magic link for you to login.
        </span>
        <span className="block mt-2 text-sm">
          (can&apos;t find it? Please check the spam folder too)
        </span>
      </p>

      <button
        className="btn btn-ghost w-full"
        onClick={onChangeEmail}
        type="button"
      >
        Use another email
      </button>
    </div>
  );
};

export default OtpSent;
