import React from "react";
import { dehydrate } from "@tanstack/react-query";
import { serverService } from "@utils/api-service";
import getQueryClient from "@utils/react-query/getQueryClient";
import Hydrate from "@utils/react-query/hydrate.client";
import UserProfile from "./UserProfile";

interface IProps {
  params: { lang: string; id: string };
  searchParams: Record<string, string>;
}

const ProfilePage: React.FC<IProps> = async ({ params }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-user-profile"],
    async () => await serverService.getProfile(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <main className="p-14 mt-[3rem]">
        <section className="px-6 bg-gray-900 rounded-xl">
          <Hydrate state={dehydratedState}>
            <UserProfile params={params} />
          </Hydrate>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
