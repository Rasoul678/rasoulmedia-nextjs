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
    <section className="form-prompt-wrapper">
      <h1 className="head_text text-left mt-4">
        <span className="blue_gradient text-3xl">{type} Prompt</span>
      </h1>
      <form
        className="form-prompt"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="form-prompt-text-label">
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
          <span className="form-prompt-tag-label">
            Tag{" "}
            <span className="font-normal">
              (#product, #web-development, #idea)
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
            className="form-prompt-submit-btn"
          >
            {submitting ? `${type.slice(0,-1)}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};
