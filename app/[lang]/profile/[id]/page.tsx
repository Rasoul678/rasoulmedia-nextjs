"use client";

import React, { useEffect } from "react";

interface IProps {
  params: { id: string };
  searchParams?: Record<string, string | undefined>;
}

const ProfilePage: React.FC<IProps> = ({ params }) => {
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`/api/profile/${params.id}`);
      const data = await res.json();
      console.log(data);
    };
    fetchProfile();
  }, [params.id]);
  return <div>profile</div>;
};

export default ProfilePage;
