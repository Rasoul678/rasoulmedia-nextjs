"use client";

import { Creator } from "@types";
import Image from "next/image";
import React from "react";
import GPTLogo from "@assets/svg/ChatGPT_logo.svg";
import { useSession } from "next-auth/react";

interface IProps {
  text: string;
  from: Creator;
}

const ChatMessage: React.FC<IProps> = ({ text, from }) => {
  const { data: session } = useSession();
  return (
    <>
      {from === Creator.ME && (
        <div className="bg-white p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
          <Image
            src={String(session?.user.image)}
            alt="User"
            width={40}
            height={40}
          />
          <p className="text-gray-700">{text}</p>
        </div>
      )}
      {from === Creator.BOT && (
        <div className="bg-gray-100 p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
          <Image src={GPTLogo} alt="Bot" width={40} height={40} />
          <p className="text-gray-700">{text}</p>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
