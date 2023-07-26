"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PromptForm } from "@components/form";
import { FormPromptType } from "@types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientService } from "@utils/api-service";

interface IProps {
  params: { id: string };
}

const UpdatePrompt: React.FC<IProps> = ({ params }) => {
  const router = useRouter();

  const promptId = params.id;

  //! Fetch prompt on the client
  const { data: prevPrompt } = useQuery({
    queryKey: ["hydrate-user-prompt"],
    queryFn: () => clientService.getUserPrompt(String(promptId)),
    keepPreviousData: true,
  });

  const [prompt, setPrompt] = useState<FormPromptType>({
    text: prevPrompt?.text,
    tag: prevPrompt?.tag,
  });

  //! Mutation (edit prompt)
  const { mutate, isLoading } = useMutation({
    mutationFn: async (promptId: string) => {
      return await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...prompt,
        }),
      });
    },
    onSuccess: () => {
      router.push("/prompts");
    },
  });

  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (promptId) {
      mutate(promptId);
    }
  };

  return (
    <PromptForm
      type="Update"
      prompt={prompt}
      setPrompt={setPrompt}
      submitting={isLoading}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
