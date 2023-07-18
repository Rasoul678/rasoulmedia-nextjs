"use client";

import React, { ChangeEvent } from "react";
import { signIn } from "next-auth/react";
import Form from "@components/form";
import { clientService } from "@utils/api-service";
import { useMutation } from "@tanstack/react-query";

interface IProps {}

const DEFAULT_FORM_VALUES = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const CredentialSignUp: React.FC<IProps> = (props) => {
  const [formValues, setFormValues] = React.useState(DEFAULT_FORM_VALUES);
  const [error, setError] = React.useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setError("");
  };

  //! Mutation (register user)
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: async () => await clientService.registerUser(formValues),
    onSuccess: async (response) => {
      if (!response.ok) {
        setError((await response.json()).message);
        return;
      }

      signIn("credentials", {
        email: formValues.email,
        password: formValues.password,
        callbackUrl: "/",
      });
    },
    onError(error) {
      setError(error as any);
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signUp();
  };

  return (
    <Form
      error={error}
      formValues={formValues}
      loading={isLoading}
      handleChange={handleChange}
      onSubmit={onSubmit}
      type="signup"
    />
  );
};

export default CredentialSignUp;
