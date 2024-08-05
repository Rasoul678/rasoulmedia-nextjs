"use client";

import { useEffect, useState } from "react";
import ProfileDetails from "./components/Details";
import ProfileMain from "./components/Main";
import { NotionUserResultType, NotionUserType } from "@types";

const MyProfile = () => {
  const [user, setUser] = useState<null | NotionUserType>(null);

  useEffect(() => {
    async function getUser() {
      const response = await fetch("/api/notion");
      const users: NotionUserResultType<NotionUserType> = await response.json();
      setUser(users.results[0]);
    }

    getUser();
  }, []);

  return (
    <>
      {user && (
        <>
          <ProfileMain user={user} />
          <ProfileDetails />
        </>
      )}
    </>
  );
};

export default MyProfile;
