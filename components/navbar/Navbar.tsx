import React from "react";
import Link from "next/link";
import { LocaleSwitcher } from "@components/locale-switcher/LocaleSwitcher";
import type { Locale } from "@i18n-config";
import { getDictionary } from "@app/[lang]/dictionaries";

interface IProps {
  lang: Locale;
}

export const Navbar: React.FC<IProps> = async ({ lang }) => {
  const dict = await getDictionary(lang);
  const { applications, code, contact, home } = dict.nav;

  return (
    <div className="navbar">
      <div className="nav-links">
        <Link href={`/${lang}/`}>{home}</Link>
        <Link href={`/${lang}/projects`}>{applications}</Link>
        <Link href={`/${lang}/codes`}>{code}</Link>
        <Link href={`/${lang}/contact`}>{contact}</Link>
      </div>
      <LocaleSwitcher />
    </div>
  );
};
