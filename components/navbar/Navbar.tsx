import React from "react";
import Link from "next/link";
import { LocaleSwitcher } from "@components/locale-switcher/LocaleSwitcher";
import type { Locale } from "@i18n-config";

interface IProps {
  lang: Locale;
}

export const Navbar: React.FC<IProps> = ({ lang }) => {
  return (
    <div className="navbar">
      <div>
        <LocaleSwitcher />
      </div>
      <Link href={`/${lang}/`}>Home</Link>
      <Link href={`/${lang}/projects`}>Projects</Link>
      <Link href={`/${lang}/codes`}>Codes</Link>
      <Link href={`/${lang}/contact`}>Contact</Link>
    </div>
  );
};
