import { FC } from "react";
import { appName } from "../config";
import Link from "next/link";

interface LoginFormProps {
  email: string;
  onChangeEmail: (value: string) => void;
  loading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
}

const LoginForm: FC<LoginFormProps> = ({
  email,
  onChangeEmail,
  loading,
  onSubmit,
  isValid,
}) => {
  return (
    <div>
      <h1>Welcome to {appName}</h1>
      <form className="mt-8 card" onSubmit={onSubmit}>
        <label className="block mb-2" htmlFor="email">
          Enter your email address
        </label>
        <input
          className="input input-bordered w-full"
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
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
  );
};

export default LoginForm;
