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
  const { mutate: updatePrompt, isLoading } = useMutation({
    mutationFn: (promptId: string) =>
      clientService.updatePrompt(promptId, prompt),
    onSuccess: () => {
      router.push("/prompts");
    },
  });

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (promptId) {
      updatePrompt(promptId);
    }
  };

  return (
    <PromptForm
      type="Update"
      prompt={prompt}
      setPrompt={setPrompt}
      submitting={isLoading}
      handleSubmit={handleSubmitUpdate}
    />
  );
};

export default UpdatePrompt;
