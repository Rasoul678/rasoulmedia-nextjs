"use client";

import React, { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/form";

interface IProps {
  callbackUrl: string;
}

const CredentialSignIn: React.FC<IProps> = ({ callbackUrl }) => {
  const router = useRouter();
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
      const response = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      if (!response?.error) {
        router.push(callbackUrl);
        return;
      } else {
        setError("invalid email or password");
      }
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
      type="signin"
    />
  );
};

export default CredentialSignIn;
