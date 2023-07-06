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
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import type { BuiltInProviderType } from "next-auth/providers";
import Image from "next/image";

type ProvidersType = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

export const Navbar = () => {
  const intl = useContext(IntlContext);
  const { data: session } = useSession();
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
      <div className="flex gap-3">
        <LocaleSwitcher />

        {session?.user ? (
          <>
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>
            <Image
              src={session.user.image || ""}
              alt="profile"
              className="rounded-full"
              width={35}
              height={35}
            />
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};
