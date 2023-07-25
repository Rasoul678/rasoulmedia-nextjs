import React from "react";
import { Feed } from "@components/prompts/Feed";

interface IProps {}

const PromptsPage: React.FC<IProps> = (props) => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center mt-4">
        <span className="orange_gradient text-center text-4xl">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        This is an open-source AI prompting tool for modern world to discover,
        create and share creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default PromptsPage;
