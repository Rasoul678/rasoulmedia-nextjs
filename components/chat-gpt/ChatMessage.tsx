"use client";

import { Creator } from "@types";
import Image from "next/image";
import React from "react";
import GPTLogo from "@assets/svg/ChatGPT_logo.svg";
import defaultAvatar from "@assets/svg/avatar-default.svg";
import { useSession } from "next-auth/react";
import CustomTypewriter from "@components/CustomTypewriter";

interface IProps {
  text: string;
  from: Creator;
}

const ChatMessage: React.FC<IProps> = ({ text, from }) => {
  const { data: session } = useSession();
  return (
    <>
      {from === Creator.ME && (
        <div className="bg-gray-800 my-2 p-4 w-full rounded-lg flex gap-4 items-start whitespace-pre-wrap">
          <Image
            src={session?.user.image || defaultAvatar}
            alt="User"
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="text-gray-200 mt-3">
            <CustomTypewriter delay={1} text={text} loop={false} cursor=" " />
          </p>
        </div>
      )}
      {from === Creator.BOT && (
        <div className="bg-gray-200 my-2 p-4 w-full rounded-lg flex gap-4 items-start whitespace-pre-wrap">
          <Image
            src={GPTLogo}
            alt="Bot"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-gray-700 mt-3">
            <CustomTypewriter delay={0} text={text} loop={false} cursor=" " />
          </p>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
