"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PromptForm } from "@components/form";
import { FormPromptType } from "@types";

interface IProps {}

const CreatePrompt: React.FC<IProps> = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState<FormPromptType>({ text: "", tag: "" });
  const { data: session } = useSession();
  const router = useRouter();

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          ...prompt,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        router.push("/prompts");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PromptForm
      type="Create"
      prompt={prompt}
      setPrompt={setPrompt}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
