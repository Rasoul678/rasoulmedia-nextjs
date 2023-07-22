"use client";

import { useMutation } from "@tanstack/react-query";
import { Creator } from "@types";
import React from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

interface MessageProps {
  text: string;
  from: Creator;
  key: number;
}

interface IProps {}

const callGPT = async (prompt: string) => {
  const response = await fetch("/api/ask-gpt", {
    method: "POST",
    body: JSON.stringify({ prompt }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

const ChatWithBot: React.FC<IProps> = (props) => {
  const [messages, setMessages] = React.useState<MessageProps[]>([]);

  const { mutate: askGPT, isLoading } = useMutation({
    mutationFn: async (prompt: string) => await callGPT(prompt),
    onSuccess: async (response) => {
      if (response.ok) {
        const data = await response.json();

        if (data.text) {
          const botMessage: MessageProps = {
            from: Creator.BOT,
            text: data.text,
            key: new Date().getTime(),
          };

          setMessages((ms) => [...ms, botMessage]);
        }
      }
    },
  });

  const callAPI = (prompt: string) => {
    const myMessage: MessageProps = {
      from: Creator.ME,
      text: prompt,
      key: new Date().getTime(),
    };

    setMessages((ms) => [...ms, myMessage]);

    askGPT(prompt);
  };

  return (
    <div className="relative max-w-2xl mx-auto w-full">
      <div className="sticky top-6 w-full pt-10 px-4">
        <ChatInput onSend={callAPI} disabled={isLoading} />
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
          <p className="text-center text-2xl text-gray-400">I am at your service</p>
        )}
      </div>
    </div>
  );
};

export default ChatWithBot;
