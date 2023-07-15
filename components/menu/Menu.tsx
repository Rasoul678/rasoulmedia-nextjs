import React from "react";
import { MenuItem } from "./Item";
import { signOut } from "next-auth/react";
import { IntlContext } from "@components/intl-provider";
import { Locale, i18n } from "@i18n-config";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  user: any
}

export const Menu: React.FC<IProps> = ({user}) => {
  const intl = React.useContext(IntlContext);
  const pathName = usePathname();
  const router = useRouter();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleSelectChange = (locale: Locale) => {
    const path = redirectedPathName(locale);
    router.push(path);
  };

  return (
    <div className="menu-wrapper">
      <svg
        className="absolute bottom-full left-5"
        width="30"
        height="20"
        viewBox="0 0 30 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="15, 0 30, 20 0, 20" className="fill-gray-900" />
      </svg>
      <MenuItem name={user.email} noBorder />
      <MenuItem name="Profile" href="/profile" />
      <MenuItem
        name="Language"
        left={40}
        subMenu={i18n.locales.map((locale) => ({
          name: String(intl?.dict.lang[locale]),
          onClick: () => handleSelectChange(locale),
        }))}
      />
      <MenuItem
        name={String(intl?.dict.account.signout)}
        onClick={() => {
          signOut();
        }}
      />
    </div>
  );
};
