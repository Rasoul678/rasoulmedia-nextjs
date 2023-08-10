"use client";

import { useContext } from "react";
import ProfilePic from "assets/profile-pic-2.jpg";
import Image from "next/image";
import { CustomTypewriter } from "@components/CustomTypewriter/CustomTypewriter";
import { IntlContext } from "@components/intl-provider";
import reactStringReplace from "react-string-replace";
import { socials } from "@components/icons";

const HomeHero: React.FC = () => {
  const intl = useContext(IntlContext);

  const welcome = intl?.dict.hero["intro-welcome"];
  const me = intl?.dict.me!;

  return (
    <div className="h-screen flex flex-col justify-between gap-12 items-center px-16">
      <div className="flex flex-col justify-center items-center gap-4 mt-3">
        <div tabIndex={0}>
          <Image
            src={ProfilePic}
            alt="My-Picture"
            aria-label="my profile picture"
            width={170}
            height={170}
            className="rounded-full"
          />
        </div>
        <div className="flex gap-2">
          {socials.github}
          {socials.linkedin}
          {socials.twitter}
        </div>
      </div>
      <div className="flex flex-col flex-grow gap-10 items-center">
        <div>
          <div className="text-2xl md:text-5xl text-center" tabIndex={0}>
            {reactStringReplace(welcome, me, (match, i) => (
              <span key={i} className="font-bold red_gradient">
                {match}
              </span>
            ))}
          </div>
          <h2 className="mt-3 text-md md:text-lg text-center">
            <span
              className="text-red-500"
              tabIndex={0}
              aria-label="Web Developer"
            >
              Web Developer
            </span>{" "}
            |{" "}
            <span
              className="text-yellow-400"
              tabIndex={0}
              aria-label="Javascript"
            >
              Javascript
            </span>{" "}
            |{" "}
            <span className="text-sky-500" tabIndex={0} aria-label="Javascript">
              Typescript
            </span>{" "}
            |{" "}
            <span className="text-blue-600" tabIndex={0} aria-label="ReactJS">
              ReactJS
            </span>{" "}
            |{" "}
            <span className="text-gray-300" tabIndex={0} aria-label="HTML">
              Next.js
            </span>
          </h2>
        </div>
        <div>
          <CustomTypewriter
            strings={[intl?.dict.typewriter[1]!, intl?.dict.typewriter[2]!]}
            wrapperClassName="text-md md:text-2xl bg-gray-900/50 p-2 rounded-md"
            cursorClassName="text-yellow-400 text-2xl"
            cursor=" "
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
