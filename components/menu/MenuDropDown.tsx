import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();

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
      {session?.user && (
        <>
          <MenuItem
            noBorder
            name={String(intl?.dict["my-prof"])}
            href={`/${intl?.lang}/profile`}
            icon={
              <Image
                src={session?.user.image || defaultAvatar}
                alt={String(intl?.dict["my-prof"])}
                className="rounded-full"
                width={30}
                height={30}
              />
            }
          />
          <MenuItem
            name="Prompts"
            href={`/${intl?.lang}/prompts`}
            icon={iconsList.chatGPT({
              alt: "chatGPT",
              width: 30,
            })}
          />
        </>
      )}
      <MenuItem
        noBorder={!session?.user}
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
      {session?.user ? (
        <MenuItem
          name={String(intl?.dict.account.signout)}
          onClick={() => {
            signOut();
          }}
          icon={iconsList.logout({
            alt: String(intl?.dict.account.signout),
            width: 30,
          })}
        />
      ) : (
        <MenuItem
          name={String(intl?.dict.account.signin)}
          href={`/${intl?.lang}/auth/signin`}
          icon={iconsList.id({
            alt: String(intl?.dict.account.signin),
            width: 30,
          })}
        />
      )}
    </div>
  );
};

export default MenuDropDown;
