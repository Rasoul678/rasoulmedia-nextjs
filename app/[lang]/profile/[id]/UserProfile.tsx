"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ProfileWithUserType } from "@types";
import { parseDate } from "@utils/parseDate";
import ProfileDetails from "../ProfileDetails";
import ProfileMain from "../ProfileMain";

type DataType = {
  profile: ProfileWithUserType;
};

interface IProps {
  params: { id: string };
}

const getUserProfile = async (userId: string) => {
  let profile: ProfileWithUserType | null = null;

  const res = await fetch(`/api/profile/${userId}`);
  const data = (await res.json()) as DataType;

  data.profile.user.createdAt = parseDate(
    String(data.profile.user.createdAt)
  ).relativeTime;

  data.profile.user.lastJoin = parseDate(
    String(data.profile.user.lastJoin)
  ).relativeTime;

  profile = data.profile;

  return profile;
};

const UserProfile: React.FC<IProps> = ({ params }) => {
  //! Fetch profile on the client
  const {
    data: profile,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["hydrate-user-profile"],
    queryFn: () => getUserProfile(params.id),
    keepPreviousData: true,
  });

  return (
    <>
      {profile && (
        <>
          <ProfileMain profile={profile} />
          <ProfileDetails profile={profile} />
        </>
      )}
    </>
  );
};

export default UserProfile;
