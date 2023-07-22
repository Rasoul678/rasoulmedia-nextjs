"use client";

import React, { useContext } from "react";
import { IntlContext } from "@components/intl-provider";
import PromptList from "@components/PromptList/PromptList";
import ChatWithGPT from "@components/chat-gpt/ChatWithGPT";

const prompts = [
  {
    id: 1,
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt",
    date: "2021-01-01",
  },
  {
    id: 2,
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt",
    date: "2021-01-01",
  },
];

const Home = () => {
  const intl = useContext(IntlContext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-4xl">Rasoul Media with Next.js</div>
      <div>{intl?.dict?.me}</div>
      <ChatWithGPT />
      <PromptList prompts={prompts} />
    </main>
  );
};

export default Home;
