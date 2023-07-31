import React from "react";
import ChatWithGPT from "@components/chat-gpt";

interface IProps {}

const AskGPT: React.FC<IProps> = async (props) => {
  return <ChatWithGPT />;
};

export default AskGPT;
