"use client";

import { PromptWithUserType } from "@types";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import tick from "@assets/svg/tick.svg";
import copy from "@assets/svg/copy.svg";
import defaultAvatar from "@assets/svg/avatar-default.svg";
import Link from "next/link";

interface IProps {
  prompt: PromptWithUserType;
  handleTagClick?: (tag: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const PromptCard: React.FC<IProps> = (props) => {
  const { prompt, handleDelete, handleEdit, handleTagClick } = props;
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const isAuthUser = session?.user.id === prompt.user.id;
  const hasAccess = isAuthUser && /profile/.test(pathName);

  const handleCopy = () => {
    const promptText = String(prompt.text);
    setCopied(promptText);
    navigator.clipboard.writeText(promptText);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleGoToProfile = () => {
    if (isAuthUser) {
      router.push(`/profile`);
    } else {
      router.push(`/profile/${prompt.user.id}`);
    }
  };

  return (
    <div className="prompt_card w-[20rem]">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleGoToProfile}
        >
          <Image
            src={prompt.user.image || defaultAvatar}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-200">
              {prompt.user.name || "No Name"}
            </h3>
            <p className="font-satoshi text-sm text-gray-400">
              {prompt.user.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" title="copy" onClick={handleCopy}>
          <Image
            src={copied === prompt.text ? tick : copy}
            alt="copy_btn"
            width={16}
            height={16}
          />
        </div>
      </div>
      <p className="flex-1 my-4 font-satoshi text-md text-gray-200 line-clamp-2">
        {prompt.text}
      </p>
      <p
        className="text-sm text-sky-400 cursor-pointer"
        onClick={() => handleTagClick?.(String(prompt.tag))}
      >
        #{prompt.tag}
      </p>
      {hasAccess && (
        <div className="mt-3 flex-end gap-4 border-t border-gray-100 pt-3">
          <Link href={`/prompts/update/${prompt.id}`}>
            <p
              className="text-sm green_gradient cursor-pointer"
              // onClick={handleEdit}
            >
              Edit
            </p>
          </Link>
          <p
            className=" font-inter text-sm red_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
