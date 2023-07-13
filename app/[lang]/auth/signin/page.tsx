import React from "react";
import GithubSignIn from "./GithubSignIn";
import CredentialSignIn from "./CredentialSignIn";

interface IProps {
  params: { lang: string };
  searchParams: Record<string, string>;
}

const SignInPage: React.FC<IProps> = ({ searchParams }) => {
  const callbackUrl = searchParams["callbackUrl"] || "/";

  return (
    <section className="h-screen signin">
      <div className="form-container">
        <div className="card">
          <div className="form-header">
            Sign In
          </div>
          <GithubSignIn callbackUrl={callbackUrl} />
          <hr />
          <CredentialSignIn callbackUrl={callbackUrl} />
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
