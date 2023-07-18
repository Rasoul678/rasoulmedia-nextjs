"use client";

import React, { ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/form";

interface IProps {
  callbackUrl: string;
}

const CredentialSignIn: React.FC<IProps> = ({ callbackUrl }) => {
  const router = useRouter();
  const [formValues, setFormValues] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setError("");
  };

  //! Mutation (login user)
  const { mutate: login, isLoading } = useMutation({
    mutationFn: async () =>
      await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      }),
    onSuccess: async (response) => {
      if (!response?.error) {
        router.push(callbackUrl);
        return;
      } else {
        setError("invalid email or password");
      }
    },
    onError(error) {
      setError(error as any);
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <Form
      error={error}
      formValues={formValues}
      loading={isLoading}
      handleChange={handleChange}
      onSubmit={onSubmit}
      type="signin"
    />
  );
};

export default CredentialSignIn;
