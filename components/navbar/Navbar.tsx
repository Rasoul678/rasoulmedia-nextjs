import React from "react";
import Link from "next/link";

interface IProps {}

export const Navbar: React.FC<IProps> = (props) => {
  return (
    <div className="navbar">
      <Link href="/">Home</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/codes">Codes</Link>
      <Link href="/contact">Contact</Link>
    </div>
  );
};
