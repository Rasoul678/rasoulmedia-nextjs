import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { PromptType } from "@types";

export type EditPromptType = Partial<PromptType> | null | undefined;

interface IProps {
  type: string;
  prompt: PromptType;
  setPrompt: Dispatch<SetStateAction<PromptType>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const PromptForm: React.FC<IProps> = (props) => {
  const { handleSubmit, prompt, setPrompt, submitting, type } = props;

  return (
    <section className="w-full max-w-full flex-center flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>
      <form
        className="mt-10 w-full- max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
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
          <span className="font-satoshi font-semibold text-base text-gray-700">
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
        <div className=" flex-end mx-3 mb-5 gap-4">
          <Link href="/" className=" text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className=" px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

