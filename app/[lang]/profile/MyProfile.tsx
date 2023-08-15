"use client";

import { useQuery } from "@tanstack/react-query";
import { clientService } from "@utils/api-service";
import ProfileDetails from "./components/Details";
import ProfileMain from "./components/Main";

const MyProfile = () => {
  //! Fetch profile on the client
  const {
    data: profile,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["hydrate-my-profile"],
    queryFn: () => clientService.getProfile(),
    // keepPreviousData: true,
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

export default MyProfile;
