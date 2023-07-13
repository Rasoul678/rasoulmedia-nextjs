"use client";

import React, { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Form from "@components/form";

interface IProps {}

const CredentialSignUp: React.FC<IProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setError("");
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
    <Form
      error={error}
      formValues={formValues}
      loading={loading}
      handleChange={handleChange}
      onSubmit={onSubmit}
      type="signup"
    />
  );
};

export default CredentialSignUp;
