import React from "react";
import { MenuItem } from "./Item";
import { signOut } from "next-auth/react";
import { IntlContext } from "@components/intl-provider";
import { Locale, i18n } from "@i18n-config";
import { usePathname, useRouter } from "next/navigation";
import Triangle from "./Triangle";

interface IProps {
  user: any;
}

export const Menu: React.FC<IProps> = ({ user }) => {
  const intl = React.useContext(IntlContext);
  const pathName = usePathname();
  const router = useRouter();

  const isPersian = intl?.lang === "fa";

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
      <Triangle />
      <MenuItem name={user.email} noBorder />
      <MenuItem name="Profile" href={`/${intl?.lang}/profile`} />
      <MenuItem
        name="Language"
        dir={isPersian ? "right" : "left"}
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
