import { IconType } from "@types";
import GeneralIcon from "./GeneralIcon";
import home from "@assets/icon-pack/icons8-fido-420.svg";
import ideas from "@assets/icon-pack/icons8-idea-420.svg";
import js from "@assets/icon-pack/icons8-javascript-420.svg";
import gmail from "@assets/icon-pack/icons8-gmail-420.svg";
import plus from "@assets/icon-pack/icons8-plus-420.svg";
import edit from "@assets/icon-pack/icons8-edit-420.svg";
import remove from "@assets/icon-pack/icons8-trash-can-420.svg";
import fingerprint from "@assets/icon-pack/icons8-touch-id-420.svg";
import uncheckAll from "@assets/icon-pack/icons8-uncheck-all-420.svg";
import html from "@assets/icon-pack/icons8-html-5-420.svg";
import css from "@assets/icon-pack/icons8-css3-420.svg";
import git from "@assets/icon-pack/icons8-git-420.svg";
import postman from "@assets/icon-pack/icons8-postman-api-420.svg";
import react from "@assets/svg/React-icon.svg";
import nextjs from "@assets/svg/nextjs.svg";
import ts from "@assets/icon-pack/icons8-typescript.svg";
import { socials } from "./socials";

export const iconsList = {
  socials: {
    ...socials,
  },
  home: (props?: IconType) => <GeneralIcon src={home} {...props} />,
  ideas: (props?: IconType) => <GeneralIcon src={ideas} {...props} />,
  gmail: (props?: IconType) => <GeneralIcon src={gmail} {...props} />,
  add: (props?: IconType) => <GeneralIcon src={plus} {...props} />,
  edit: (props?: IconType) => <GeneralIcon src={edit} {...props} />,
  delete: (props?: IconType) => <GeneralIcon src={remove} {...props} />,
  id: (props?: IconType) => <GeneralIcon src={fingerprint} {...props} />,
  uncheckAll: (props?: IconType) => <GeneralIcon src={uncheckAll} {...props} />,
  html: (props?: IconType) => <GeneralIcon src={html} {...props} />,
  css: (props?: IconType) => <GeneralIcon src={css} {...props} />,
  git: (props?: IconType) => <GeneralIcon src={git} {...props} />,
  javascript: (props?: IconType) => <GeneralIcon src={js} {...props} />,
  postman: (props?: IconType) => <GeneralIcon src={postman} {...props} />,
  react: (props?: IconType) => <GeneralIcon src={react} {...props} />,
  nextjs: (props?: IconType) => <GeneralIcon src={nextjs} {...props} />,
  ts: (props?: IconType) => <GeneralIcon src={ts} {...props} />,
};
