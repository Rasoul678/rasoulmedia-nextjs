"use client";
import React, { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";

interface IProps {}

const SignUpPage: React.FC<IProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ email: "", password: "" });

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      if (!response.ok) {
        setError((await response.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <section className="h-screen">
      <div className="h-full flex flex-wrap items-center justify-center">
        <div className="w-96 p-7 bg-gray-900 rounded-lg">
          <div className="flex align-middle justify-center mt-4 mb-7 text-2xl">
            Sign up
          </div>
          <form onSubmit={onSubmit}>
            {error && (
              <p className="text-center bg-red-500 py-2 mb-6 rounded text-md">
                {error}
              </p>
            )}
            <div className="relative mb-6">
              <input
                required
                value={formValues.email}
                name="email"
                type="email"
                className="block min-h-[auto] w-full rounded border border-cyan-100 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100  motion-reduce:transition-non"
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
                className="block min-h-[auto] w-full rounded border border-cyan-100 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <div className="mb-6 flex items-center justify-between">
              Already have account?
              <a
                href="/api/auth/signin"
                className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Login
              </a>
            </div>

            <button
              type="submit"
              className="inline-block w-full rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white"
              disabled={loading}
            >
              {loading ? "loading..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
