"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import defaultAvatar from "@assets/icon-pack/icons8-anonymous-mask-420.svg";
import { IntlContext } from "@components/intl-provider";
import Menu from "@components/menu";
import { Spinner } from "@components/spinner/Spinner";
import { useClickOutside } from "@hooks/useClickOutside";
import { iconsList } from "@components/icons/icons";

export const Navbar = () => {
  const intl = React.useContext(IntlContext);
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = React.useState(false);
  const clickRef = React.useRef(null);

  useClickOutside({ ref: clickRef, callback: () => setShowMenu(false) });

  return (
    <div className="navbar z-[1000]">
      <div className="flex flex-row-reverse gap-3 justify-center align-middle">
        {status === "loading" ? (
          <Spinner />
        ) : (
          <>
            {session?.user ? (
              <div ref={clickRef}>
                <Image
                  src={session?.user.image || defaultAvatar}
                  alt="profile"
                  className="rounded-full"
                  width={40}
                  height={40}
                  onClick={() => setShowMenu((v) => !v)}
                />
                {showMenu && <Menu user={session.user} />}
              </div>
            ) : (
              <>
                <Link className="leading-8" href="/auth/signin">
                  {iconsList.fingerprint({
                    alt: "Signin",
                  })}
                </Link>
              </>
            )}
          </>
        )}
      </div>
      <div className="nav-links">
        <Link href={`/${intl?.lang}/`}>
          {iconsList.home({
            alt: intl?.dict.nav.home!,
            className: "self-baseline",
          })}
        </Link>
        <Link href={`/${intl?.lang}/projects`}>
          {iconsList.ideas({
            alt: intl?.dict.nav.projects!,
            className: "self-baseline",
          })}
        </Link>
        <Link href={`/${intl?.lang}/live-code`}>
          {iconsList.javascript({
            alt: intl?.dict.nav.code!,
            className: "self-baseline",
          })}

          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </Link>

        <Link href={`/${intl?.lang}/contact`}>
          {iconsList.gmail({
            alt: intl?.dict.nav.contact!,
            className: "self-baseline",
          })}
        </Link>
      </div>
    </div>
  );
};
