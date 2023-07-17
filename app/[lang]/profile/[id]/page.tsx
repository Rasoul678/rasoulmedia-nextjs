import { parseDate } from "@utils/parseDate";
import UserProfile from "./UserProfile";
import React from "react";
import getQueryClient from "@utils/react-query/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@utils/react-query/hydrate.client";
import prisma from "@utils/auth/db/client";

interface IProps {
  params: { lang: string; id: string };
  searchParams: Record<string, string>;
}

const getUserProfile = async (userId: string) => {
  const profile = await prisma.profile.findUnique({
    where: { userId: userId },
    include: {
      user: {
        include: {
          followedBy: true,
          following: true,
        },
      },
    },
  });

  if (profile) {
    profile.user.createdAt = parseDate(String(profile?.user.createdAt))
      .relativeTime as unknown as Date;

    profile.user.lastJoin = parseDate(String(profile.user.lastJoin))
      .relativeTime as unknown as Date;
  }

  return profile;
};

const ProfilePage: React.FC<IProps> = async ({ params }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-user-profile"],
    async () => await getUserProfile(params.id)
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
