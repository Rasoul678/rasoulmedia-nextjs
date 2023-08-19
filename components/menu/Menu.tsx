"use client";

import React from "react";
import { iconsList } from "@components/icons";
import { useClickOutside } from "@hooks/useClickOutside";
import MenuDropDown  from "./MenuDropDown";

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
