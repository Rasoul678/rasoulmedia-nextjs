"use client";

import React from "react";
import Link from "next/link";
import { iconsList } from "@components/icons/icons";
import { IntlContext } from "@components/intl-provider";


export const NavLinks = () => {
  const intl = React.useContext(IntlContext);

  return (
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
        {iconsList.stacks.javascript({
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
  );
};
