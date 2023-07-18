"use client";

import { useQuery } from "@tanstack/react-query";
import { clientService } from "@utils/api-service";
import React from "react";
import ProfileDetails from "../ProfileDetails";
import ProfileMain from "../ProfileMain";

interface IProps {
  params: { id: string };
}

const UserProfile: React.FC<IProps> = ({ params }) => {
  //! Fetch profile on the client
  const {
    data: profile,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["hydrate-user-profile"],
    queryFn: () => clientService.getProfile(params.id),
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
