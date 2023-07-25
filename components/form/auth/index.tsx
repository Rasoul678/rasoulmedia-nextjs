import React, { ChangeEvent } from "react";
import { Spinner } from "@components/spinner/Spinner";

interface IProps {
  onSubmit: (e: React.FormEvent) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  loading: boolean;
  formValues: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  };
  type: "signin" | "signup";
}

export const AuthForm: React.FC<IProps> = ({
  onSubmit,
  error,
  formValues,
  loading,
  handleChange,
  type,
}) => {
  const isSignIn = type === "signin";

  return (
    <form onSubmit={onSubmit}>
      {error && <p className="form-error-msg">{error}</p>}
      {type === "signup" && (
        <>
          <div className="relative mb-6">
            <input
              value={formValues.firstName}
              name="firstName"
              type="text"
              className="form-input"
              placeholder="First name"
              onChange={handleChange}
            />
          </div>
          <div className="relative mb-6">
            <input
              value={formValues.lastName}
              name="lastName"
              type="text"
              className="form-input"
              placeholder="Last name"
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <div className="relative mb-6">
        <input
          required
          value={formValues.email}
          name="email"
          type="email"
          className="form-input"
          placeholder="Email address"
          onChange={handleChange}
        />
      </div>
      <div className="relative mb-6">
        <input
          required
          value={formValues.password}
          name="password"
          type="password"
          className="form-input"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>

      <div className="form-question">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
        <a href={`/auth/${isSignIn ? "signup" : "signin"}`}>
          {isSignIn ? "Sign up" : "Sign in"}
        </a>
      </div>

      <button type="submit" className="form-submit-btn" disabled={loading}>
        {loading && <Spinner />}
        {loading ? "submitting..." : type}
      </button>
    </form>
  );
};
