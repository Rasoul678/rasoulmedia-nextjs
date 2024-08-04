import { IconType } from "@types";
import GeneralIcon from "./GeneralIcon";
import discord from "@assets/icon-pack/icons8-discord-420.svg";
import github from "@assets/icon-pack/icons8-github-420.svg";
import linkedin from "@assets/icon-pack/icons8-linkedin-circled-420.svg";
import medium from "@assets/icon-pack/icons8-medium-420.svg";
import reddit from "@assets/icon-pack/icons8-reddit-420.svg";
import stack from "@assets/icon-pack/icons8-stack-overflow-500.svg";
import twitter from "@assets/icon-pack/icons8-twitter-circled-420.svg";

type SocialIconsType = {
  [key in (typeof socialLists)[number]]: (props?: IconType) => JSX.Element;
};

const IconsMap = {
  discord: discord,
  github: github,
  linkedin: linkedin,
  medium: medium,
  reddit: reddit,
  stack: stack,
  twitter: twitter,
};

const socialLists = [...Object.keys(IconsMap)] as Array<keyof typeof IconsMap>;

export const socialIcons: SocialIconsType = socialLists.reduce(
  (acc: any, value: (typeof socialLists)[number]) => {
    acc[value] = (props?: IconType) => (
      <GeneralIcon
        src={IconsMap[value]}
        alt={value}
        className="cursor-pointer"
        width={50}
        {...props}
      />
    );
    return acc;
  },
  {}
);
