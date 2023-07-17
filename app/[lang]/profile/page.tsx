import React from "react";
import { getServerSession } from "next-auth";
import { parseDate } from "@utils/parseDate";
import getQueryClient from "@utils/react-query/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@utils/react-query/hydrate.client";
import MyProfile from "./MyProfile";
import prisma from "@utils/auth/db/client";
import { authOptions } from "@utils/auth/authOptions";

const getUserProfile = async () => {
  const serverSession = await getServerSession(authOptions);

  const profile = await prisma.profile.findUnique({
    where: { userId: serverSession?.user.id },
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

const ProfilePage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-user-profile"], getUserProfile);
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <main className="p-14 mt-[3rem]">
        <section className="px-6 bg-gray-900 rounded-xl">
          <Hydrate state={dehydratedState}>
            <MyProfile />
          </Hydrate>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
