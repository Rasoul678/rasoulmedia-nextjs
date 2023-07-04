"use client";

import { IntlContext } from "@components/intl-provider";
import { LocaleSwitcher } from "@components/locale-switcher/LocaleSwitcher";
import Link from "next/link";
import { useContext } from "react";

export const Navbar = () => {
  const intl = useContext(IntlContext);

  return (
    <div className="navbar">
      <div className="nav-links">
        <Link href={`/${intl?.lang}/`}>{intl?.dict.nav.home}</Link>
        <Link href={`/${intl?.lang}/projects`}>
          {intl?.dict.nav.applications}
        </Link>
        <Link href={`/${intl?.lang}/codes`}>{intl?.dict.nav.code}</Link>
        <Link href={`/${intl?.lang}/contact`}>{intl?.dict.nav.contact}</Link>
      </div>
      <LocaleSwitcher />
    </div>
  );
};
