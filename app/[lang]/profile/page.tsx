"use client";

import React, { useEffect } from "react";

interface IProps {}

const ProfilePage: React.FC<IProps> = (props) => {
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profiles/25");
      const data = await res.json();
      console.log(data);
    };
    fetchProfile();
  }, []);
  return <div>profile</div>;
};

export default ProfilePage;
