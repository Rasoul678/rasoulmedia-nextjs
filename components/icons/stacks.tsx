import css from "@assets/icon-pack/icons8-css3-420.svg";
import docker from "@assets/icon-pack/icons8-docker.svg";
import git from "@assets/icon-pack/icons8-git-420.svg";
import html from "@assets/icon-pack/icons8-html-5-420.svg";
import js from "@assets/icon-pack/icons8-javascript-420.svg";
import npm from "@assets/icon-pack/icons8-npm.svg";
import postman from "@assets/icon-pack/icons8-postman-api-420.svg";
import react from "@assets/icon-pack/icons8-react.svg";
import redux from "@assets/icon-pack/icons8-redux.svg";
import ts from "@assets/icon-pack/icons8-typescript.svg";
import webpack from "@assets/icon-pack/icons8-webpack.svg";
import yarn from "@assets/icon-pack/icons8-yarn-logo.svg";
import nextjs from "@assets/svg/nextjs.svg";
import GeneralIcon from "./GeneralIcon";
import { IconType } from "@types";

export type StackIconsType = {
  [key in (typeof stackLists)[number]]: (props?: IconType) => JSX.Element;
};

//! Map icons name to svg file
const IconsMap = {
  html: html,
  css: css,
  git: git,
  js: js,
  postman: postman,
  react: react,
  nextjs: nextjs,
  ts: ts,
  yarn: yarn,
  docker: docker,
  redux: redux,
  npm: npm,
  webpack: webpack,
};

const stackLists = [...Object.keys(IconsMap)] as Array<keyof typeof IconsMap>;

export const stackIcons: StackIconsType = stackLists.reduce(
  (acc: any, value: (typeof stackLists)[number]) => {
    acc[value] = (props?: IconType) => (
      <GeneralIcon
        src={IconsMap[value]}
        alt={value}
        width={props?.width || 80}
        {...props}
      />
    );
    return acc;
  },
  {}
);
