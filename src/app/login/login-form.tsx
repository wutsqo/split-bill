import { FC } from "react";
import { appName } from "../config";

interface LoginFormProps {
  email: string;
  onChangeEmail: (value: string) => void;
  loading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  signInWithGoogle: () => void;
  isValid: boolean;
}

const LoginForm: FC<LoginFormProps> = ({
  email,
  onChangeEmail,
  loading,
  onSubmit,
  isValid,
  signInWithGoogle,
}) => {
  return (
    <div>
      <h2>Welcome to {appName}</h2>
      <form className="mt-4 card" onSubmit={onSubmit}>
        <label className="block mb-2" htmlFor="email">
          Login to sync your data
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
        <p className="text-xs mt-2">
          If you don&apos;t have an account, we&apos;ll create one for you.
        </p>
        <button className="btn mt-6 w-full" disabled={!isValid}>
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Send me a login link"
          )}
        </button>
      </form>
      <button
        className="btn btn-primary w-full mt-4"
        onClick={signInWithGoogle}
      >
        Login with Google
      </button>
      <div className="my-4 text-center w-full text-sm">
        <button
          className="link w-full"
          onClick={() => {
            const modal = document.getElementById(
              "account_modal"
            ) as HTMLDialogElement;
            modal.close();
          }}
        >
          I&apos;ll login later
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
