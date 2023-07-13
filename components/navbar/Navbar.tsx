"use client";

import { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { IntlContext } from "@components/intl-provider";
import { LocaleSwitcher } from "@components/locale-switcher/LocaleSwitcher";
import { Spinner } from "@components/spinner/Spinner";
import defaultAvatar from "@assets/svg/avatar-default.svg";

export const Navbar = () => {
  const intl = useContext(IntlContext);
  const { data: session, status } = useSession();

  return (
    <div className="navbar">
      <div className="nav-links">
        <Link href={`/${intl?.lang}/`}>{intl?.dict.nav.home}</Link>
        <Link href={`/${intl?.lang}/projects`}>{intl?.dict.nav.projects}</Link>
        <Link href={`/${intl?.lang}/codes`}>{intl?.dict.nav.code}</Link>
        <Link href={`/${intl?.lang}/contact`}>{intl?.dict.nav.contact}</Link>
      </div>
      <div className="flex gap-5 justify-center align-middle">
        <LocaleSwitcher />
        {status === "loading" ? (
          <Spinner />
        ) : (
          <>
            {session?.user ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                  }}
                >
                  {intl?.dict.account.signout}
                </button>
                <Link href={"/profile"}>
                  <Image
                    src={session.user.image || defaultAvatar}
                    alt="profile"
                    className="rounded-full"
                    width={35}
                    height={35}
                  />
                </Link>
              </>
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
    </div>
  );
};
