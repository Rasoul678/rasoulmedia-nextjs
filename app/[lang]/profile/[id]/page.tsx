"use client";

import React, { useEffect } from "react";
import { ProfileType, UserType } from "@types";
import { parseDate } from "@utils/parseDate";
import ProfileMain from "../ProfileMain";
import ProfileDetails from "../ProfileDetails";
import { Skeleton } from "@components/skeleton/Skeleton";

type DataType = {
  profile: ProfileType & { user: UserType };
};

interface IProps {
  params: { lang: string; id: string };
  searchParams: Record<string, string>;
}

const ProfilePage: React.FC<IProps> = ({ params }) => {
  const [profile, setProfile] = React.useState<DataType["profile"]>();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`/api/profile/${params.id}`);
      const data = (await res.json()) as DataType;

      data.profile.user.createdAt = parseDate(
        String(data.profile.user.createdAt)
      ).relativeTime;
      data.profile.user.lastJoin = parseDate(
        String(data.profile.user.lastJoin)
      ).relativeTime;

      setProfile(data.profile);
    };

    fetchProfile();
  }, [params.id]);

  return (
    <div>
      <main className="p-14 mt-[3rem]">
        <section className="px-6 bg-gray-900 rounded-xl">
          {profile ? <ProfileMain profile={profile} /> : <Skeleton />}
          {profile && <ProfileDetails profile={profile} />}
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
