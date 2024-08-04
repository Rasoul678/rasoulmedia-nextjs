"use client";

import React from "react";
import { iconsList } from "@components/icons";
import { useClickOutside } from "@hooks/useClickOutside";
import dynamic from "next/dynamic";
import Spinner from "@components/spinner";

const MenuDropDown = dynamic(
  () => import("./MenuDropDown").then((mod) => mod.default),
  {
    loading: () => <Spinner />,
  }
);

export const Menu = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const clickRef = React.useRef(null);

  useClickOutside({ ref: clickRef, callback: () => setShowMenu(false) });

  return (
    <div ref={clickRef}>
      <div onClick={() => setShowMenu((v) => !v)}>
        {iconsList.menu({
          alt: "menu",
          className: "self-baseline",
        })}
      </div>
      {showMenu && <MenuDropDown />}
    </div>
  );
};
