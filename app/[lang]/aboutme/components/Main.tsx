"use client";

import React from "react";
import Image from "next/image";
import ProfilePic from "@assets/profile-pic-2.jpg";
import { NotionUserType } from "@types";

interface IProps {
  user: NotionUserType;
}

const ProfileMain: React.FC<IProps> = ({ user }) => {
  return (
    <>
      <div className="flex flex-wrap justify-center items-start">
        <div className="w-full lg:w-3/12 px-4 h-14 lg:order-2 flex justify-center">
          <div>
            <Image
              width={100}
              height={100}
              alt="profile-image"
              src={user.avatar_url}
              className="shadow-xl bg-gray-900 rounded-full align-middle border-none relative -top-[3.5rem] max-w-150-px"
            />
          </div>
        </div>
      </div>
      <div className="text-center md:mt-6">
        <h3 className="text-2xl md:text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
          {user.name}
        </h3>
        <p className="text-sm text-gray-400 hover:text-gray-500 leading-6 sm:mx-2 md:mx-32">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
          deserunt Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
          deserunt
        </p>
        <div className="flex flex-col md:flex-row md:mt-6 justify-around">
          <div>
            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
            Occupation: Unknown
          </div>
          <div>
            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
            Education: Unknown
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileMain;
