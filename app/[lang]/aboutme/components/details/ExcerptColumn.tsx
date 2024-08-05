import React from "react";
import Image from "next/image";
import userPic from "@assets/profile-pic-2.jpg";
import verified from "@assets/icon-pack/icons8-instagram-verification-badge-420.svg";

type IProps = {};

const UserExcerptColumn: React.FC<IProps> = () => {
  return (
    <div className="w-full md:w-3/12 md:mx-2">
      <div className="bg-gray-900 rounded-md p-3">
        <div className="overflow-hidden">
          <Image
            className="h-auto w-full mx-auto rounded-md"
            src={userPic}
            alt=""
            width={500}
            height={500}
          />
        </div>
        <h1 className="text-white font-bold text-xl leading-8 my-1 mt-4">
          Rasoul Hesami Rostami
        </h1>
        <h3 className="text-gray-400 font-lg text-semibold leading-6">
          Owner at Her Company Inc.
        </h3>
        <p className="text-sm text-gray-400 hover:text-gray-500 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
          deserunt
        </p>
        <ul className="text-gray-400 hover:text-gray-200 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
          <li className="flex items-center py-3">
            <span>Status</span>
            <span className="ml-auto">
              <Image src={verified} alt="verified" width={30} />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserExcerptColumn;
