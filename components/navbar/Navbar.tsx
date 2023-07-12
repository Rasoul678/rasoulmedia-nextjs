"use client";

import { IntlContext } from "@components/intl-provider";
import { LocaleSwitcher } from "@components/locale-switcher/LocaleSwitcher";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  getSession,
} from "next-auth/react";
import Image from "next/image";
import { Spinner } from "@components/spinner/Spinner";
import { ProvidersType } from "@types";

export const Navbar = () => {
  const intl = useContext(IntlContext);
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState<ProvidersType>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

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
                    src={session.user.image || ""}
                    alt="profile"
                    className="rounded-full"
                    width={35}
                    height={35}
                  />
                </Link>
              </>
            ) : (
              <>
                {/* {providers &&
                  Object.values(providers).map((provider) => {
                    return (
                      <button
                        key={provider.name}
                        type="button"
                        onClick={() => signIn(provider.id)}
                      >
                        {intl?.dict.account.signin}
                      </button>
                    );
                  })} */}
                <Link href="/api/auth/signin">Signin</Link>
                <Link href="/auth/signup">Signup</Link>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
