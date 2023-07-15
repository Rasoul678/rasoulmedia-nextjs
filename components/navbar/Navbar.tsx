"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import defaultAvatar from "@assets/svg/avatar-default.svg";
import { IntlContext } from "@components/intl-provider";
import Menu from "@components/menu";
import { Spinner } from "@components/spinner/Spinner";
import { useClickOutside } from "@hooks/useClickOutside";

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
                  Signin
                </Link>
                <Link className="leading-8" href="/auth/signup">
                  Signup
                </Link>
              </>
            )}
          </>
        )}
      </div>
      <div className="nav-links">
        <Link href={`/${intl?.lang}/`}>{intl?.dict.nav.home}</Link>
        <Link href={`/${intl?.lang}/projects`}>{intl?.dict.nav.projects}</Link>
        <Link href={`/${intl?.lang}/codes`}>{intl?.dict.nav.code}</Link>
        <Link href={`/${intl?.lang}/contact`}>{intl?.dict.nav.contact}</Link>
      </div>
    </div>
  );
};
