"use client";

import { Creator } from "@types";
import Image from "next/image";
import React from "react";
import GPTLogo from "@assets/svg/ChatGPT_logo.svg";
import defaultAvatar from "@assets/svg/avatar-default.svg";
import tick from "@assets/svg/tick.svg";
import copy from "@assets/svg/copy.svg";
import bookmarkPlus from "@assets/svg/bookmark-plus.svg";
import { useSession } from "next-auth/react";
import CustomTypewriter from "@components/CustomTypewriter";
import { useMutation } from "@tanstack/react-query";
import { clientService } from "@utils/api-service";

interface IProps {
  text: string;
  from: Creator;
}

const ChatMessage: React.FC<IProps> = ({ text, from }) => {
  const { data: session } = useSession();
  const [copied, setCopied] = React.useState("");

  //! Mutation (add prompt)
  const { mutate: addPrompt, isLoading } = useMutation({
    mutationFn: () =>
      clientService.createPrompt(String(session?.user.id), {
        text,
        tag: "no-tag",
      }),
    onSuccess: (response) => {
      if (response.ok) {
        // console.log("added");
      }
    },
  });

  const handleCopy = () => {
    const promptText = String(text);
    setCopied(promptText);
    navigator.clipboard.writeText(promptText);
    setTimeout(() => setCopied(""), 3000);
  };

  const addToPrompts = () => {
    if (from === Creator.ME && !isLoading) {
      addPrompt();
    }
  };

  return (
    <>
      {from === Creator.ME && (
        <div className="bg-gray-800/50 my-2 p-4 w-full rounded-lg flex justify-between gap-4 items-start whitespace-pre-wrap">
          <Image
            src={session?.user.image || defaultAvatar}
            alt="User"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="text-gray-200 mt-3 flex-1">
            <CustomTypewriter delay={1} text={text} loop={false} cursor=" " />
          </div>
          <div className="flex gap-1">
            <div
              className="copy_btn"
              title="add to prompts"
              onClick={addToPrompts}
            >
              <Image src={bookmarkPlus} alt="copy_btn" width={17} height={17} />
            </div>
            <div className="copy_btn" title="copy" onClick={handleCopy}>
              <Image
                src={copied === text ? tick : copy}
                alt="copy_btn"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      )}
      {from === Creator.BOT && (
        <div className="bg-gray-100/90 my-2 p-4 w-full rounded-lg flex justify-between gap-4 items-start whitespace-pre-wrap">
          <Image
            src={GPTLogo}
            alt="Bot"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="text-gray-700 mt-3 p-2 flex-1">
            <CustomTypewriter delay={0} text={text} loop={false} cursor=" " />
          </div>
          <div className="copy_btn" title="copy" onClick={handleCopy}>
            <Image
              src={copied === text ? tick : copy}
              alt="copy_btn"
              width={20}
              height={20}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
