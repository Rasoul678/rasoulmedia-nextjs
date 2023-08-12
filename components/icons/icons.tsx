import { IconType } from "@types";
import GeneralIcon from "./GeneralIcon";
import home from "@assets/icon-pack/icons8-home-420.svg";
import ideas from "@assets/icon-pack/icons8-idea-420.svg";
import js from "@assets/icon-pack/icons8-javascript-420.svg";
import gmail from "@assets/icon-pack/icons8-gmail-420.svg";
import plus from "@assets/icon-pack/icons8-plus-420.svg";
import edit from "@assets/icon-pack/icons8-edit-420.svg";
import remove from "@assets/icon-pack/icons8-trash-can-420.svg";
import fingerprint from "@assets/icon-pack/icons8-touch-id-420.svg";
import { socials } from "./socials";

export const iconsList = {
  socials: {
    ...socials,
  },
  home: (props: IconType) => <GeneralIcon src={home} {...props} />,
  ideas: (props: IconType) => <GeneralIcon src={ideas} {...props} />,
  javascript: (props: IconType) => <GeneralIcon src={js} {...props} />,
  gmail: (props: IconType) => <GeneralIcon src={gmail} {...props} />,
  add: (props: IconType) => <GeneralIcon src={plus} {...props} />,
  edit: (props: IconType) => <GeneralIcon src={edit} {...props} />,
  delete: (props: IconType) => <GeneralIcon src={remove} {...props} />,
  fingerprint: (props: IconType) => (
    <GeneralIcon src={fingerprint} {...props} />
  ),
};
