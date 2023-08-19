import React from "react";
import Menu from "@components/menu";
import { NavLinks } from "./components";

type IProps = {};

export const Navbar: React.FC<IProps> = (props) => {
  return (
    <div className="navbar z-[1000]">
      <div className="flex flex-row-reverse gap-3 justify-center align-middle">
        <Menu />
      </div>
      <NavLinks />
    </div>
  );
};
