import { IconType } from "@types";
import GeneralIcon from "./GeneralIcon";
import edit from "@assets/icon-pack/icons8-edit-420.svg";
import home from "@assets/icon-pack/icons8-fido-420.svg";
import gmail from "@assets/icon-pack/icons8-gmail-420.svg";
import ideas from "@assets/icon-pack/icons8-idea-420.svg";
import plus from "@assets/icon-pack/icons8-plus-420.svg";
import fingerprint from "@assets/icon-pack/icons8-touch-id-420.svg";
import remove from "@assets/icon-pack/icons8-trash-can-420.svg";
import uncheckAll from "@assets/icon-pack/icons8-uncheck-all-420.svg";
import menu from "@assets/icon-pack/icons8-menu-420.svg";
import logout from "@assets/icon-pack/icons8-out-420.svg";
import lang from "@assets/icon-pack/icons8-google-translate-new-420.svg";
import chatGPT from "@assets/icon-pack/icons8-chatgpt-420.svg";
import ok from "@assets/icon-pack/icons8-ok-420.svg";

type OtherIconsType = {
  [key in (typeof otherLists)[number]]: (props?: IconType) => JSX.Element;
};

const IconsMap = {
  edit: edit,
  home: home,
  gmail: gmail,
  ideas: ideas,
  plus: plus,
  fingerprint: fingerprint,
  remove: remove,
  uncheckAll: uncheckAll,
  menu: menu,
  logout: logout,
  lang: lang,
  chatGPT: chatGPT,
  ok: ok,
};

const otherLists = [...Object.keys(IconsMap)] as Array<keyof typeof IconsMap>;

export const otherIcons: OtherIconsType = otherLists.reduce(
  (acc: any, value: (typeof otherLists)[number]) => {
    acc[value] = (props?: IconType) => (
      <GeneralIcon src={IconsMap[value]} alt={value} {...props} />
    );
    return acc;
  },
  {}
);
