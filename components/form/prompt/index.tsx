import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { PromptType } from "@types";

export type EditPromptType = Partial<PromptType> | null | undefined;

interface IProps {
  type: string;
  prompt: EditPromptType;
  setPrompt: Dispatch<SetStateAction<EditPromptType>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const PromptForm: React.FC<IProps> = (props) => {
  const { handleSubmit, prompt, setPrompt, submitting, type } = props;

  return (
    <section className="w-full max-w-full flex-center flex-col mt-3">
      <h1 className="head_text text-left">
        <span className="blue_gradient text-3xl">{type} Prompt</span>
      </h1>
      <form
        className="mt-4 w-full max-w-xl p-5 flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-200">
            Your AI Prompt
          </span>
          <textarea
            value={prompt?.text}
            onChange={(e) => setPrompt({ ...prompt, text: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-200">
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            value={prompt?.tag}
            onChange={(e) => setPrompt({ ...prompt, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 gap-4">
          <Link href="/prompts" className="text-gray-200 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className=" px-5 py-1.5 text-sm bg-sky-600 rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};
