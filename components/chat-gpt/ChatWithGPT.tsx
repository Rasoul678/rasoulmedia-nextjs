"use client";

import React from "react";
import { Creator, GPTMessageType } from "@types";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useGPT } from "@hooks/useGPT";

interface IProps {}

export const ChatWithGPT: React.FC<IProps> = (props) => {
  const [messages, setMessages] = React.useState<GPTMessageType[]>([]);

  const { askGPT, isLoading } = useGPT({
    onSuccess: (botMessage) => setMessages((ms) => [...ms, botMessage]),
  });

  const callGPT = (prompt: string) => {
    const myMessage: GPTMessageType = {
      from: Creator.ME,
      text: prompt,
      key: new Date().getTime(),
    };

    setMessages((ms) => [...ms, myMessage]);

    askGPT(prompt);
  };

  return (
    <div className="relative max-w-3xl mx-auto w-full">
      <div className="sticky top-4 w-full pt-10 px-4">
        <ChatInput onSend={callGPT} disabled={isLoading} />
      </div>
      <div className="mt-10 px-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.key}
            text={message.text}
            from={message.from}
          />
        ))}
        {messages.length === 0 && (
          <p className="text-center text-2xl text-gray-200">
            I am at your service!
          </p>
        )}
      </div>
    </div>
  );
};
