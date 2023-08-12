import { dehydrate } from "@tanstack/react-query";
import { serverService } from "@utils/api-service";
import { authOptions } from "@utils/auth/authOptions";
import getQueryClient from "@utils/react-query/getQueryClient";
import Hydrate from "@utils/react-query/hydrate.client";
import { getServerSession } from "next-auth";
import MyProfile from "./MyProfile";

const getUserProfile = async () => {
  const serverSession = await getServerSession(authOptions);

  const profile = await serverService.getProfile(
    String(serverSession?.user.id)
  );

  return profile;
};

const ProfilePage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-my-profile"], getUserProfile);
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <main className="md:p-14 mt-[7rem] md:mt-[3rem]">
        <section className="px-3 bg-gray-900 rounded-xl">
          <Hydrate state={dehydratedState}>
            <MyProfile />
          </Hydrate>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
