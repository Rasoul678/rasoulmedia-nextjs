import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import defaultAvatar from "@assets/icon-pack/icons8-anonymous-mask-420.svg";
import { iconsList } from "@components/icons";
import { IntlContext } from "@components/intl-provider";
import { Locale, i18n } from "@i18n-config";
import { MenuItem, Triangle } from "./components";

const MenuDropDown = () => {
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
      <MenuItem
        noBorder
        name={String(intl?.dict["my-prof"])}
        href={`/${intl?.lang}/aboutme`}
        icon={
          <Image
            src={defaultAvatar}
            alt={String(intl?.dict["my-prof"])}
            className="rounded-full"
            width={30}
            height={30}
          />
        }
      />

      <MenuItem
        name={String(intl?.dict.language)}
        dir={isPersian ? "right" : "left"}
        subMenu={i18n.locales.map((locale) => ({
          name: String(intl?.dict.lang[locale]),
          onClick: () => handleSelectChange(locale),
        }))}
        icon={iconsList.lang({
          alt: String(intl?.dict.language),
          width: 30,
        })}
      />
    </div>
  );
};

export default MenuDropDown;
