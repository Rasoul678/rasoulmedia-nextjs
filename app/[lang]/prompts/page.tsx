import React from "react";
import { Feed } from "@components/prompts/Feed";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@utils/react-query/getQueryClient";
import { serverService } from "@utils/api-service";
import Hydrate from "@utils/react-query/hydrate.client";

interface IProps {
  params: { lang: string; id: string };
  searchParams: Record<string, string>;
}

const PromptsPage: React.FC<IProps> = async ({ searchParams }) => {
  const { take, search } = searchParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-user-prompts"],
    async () =>
      await serverService.getUserInitialPrompts({ take, searchText: search })
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center mt-4">
        <span className="orange_gradient text-center text-4xl">
          AI-Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        This is an open-source AI prompting tool for modern world to discover,
        create and share creative prompts
      </p>
      <Hydrate state={dehydratedState}>
        <Feed />
      </Hydrate>
    </section>
  );
};

export default PromptsPage;
