"use client";

import React from "react";
import { signIn } from "next-auth/react";
import GithubIcon from "@components/icons/Github";
import { useSearchParams } from "next/navigation";

interface IProps {
  callbackUrl: string;
}

const GithubSignIn: React.FC<IProps> = ({ callbackUrl }) => {
  return (
    <button
      type="button"
      className="github-button"
      onClick={() => signIn("github", { callbackUrl })}
    >
      <GithubIcon />
      Sign in with GitHub
    </button>
  );
};

export default GithubSignIn;
