"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PromptForm } from "@components/form";
import { FormPromptType } from "@types";
import { useMutation } from "@tanstack/react-query";
import { clientService } from "@utils/api-service";

interface IProps {}

const CreatePrompt: React.FC<IProps> = (props) => {
  const [prompt, setPrompt] = useState<FormPromptType>({ text: "", tag: "" });
  const { data: session, status } = useSession();
  const router = useRouter();

  //! Mutation (add prompt)
  const { mutate: addPrompt, isLoading } = useMutation({
    mutationFn: () =>
      clientService.createPrompt(String(session?.user.id), prompt),
    onSuccess: (response) => {
      if (response.ok) {
        router.push("/profile");
      }
    },
  });

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPrompt();
  };

  if (status === "loading") {
    return (
      <div
        className="text-2xl blue_gradient h-screen flex flex-col justify-center items-center
    "
      >
        Loading ...
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/");
  } else if (status === "authenticated") {
    return (
      <PromptForm
        type="Create"
        prompt={prompt}
        setPrompt={setPrompt}
        submitting={isLoading}
        handleSubmit={createPrompt}
      />
    );
  } else {
    return null;
  }
};

export default CreatePrompt;
