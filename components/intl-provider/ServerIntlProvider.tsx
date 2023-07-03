"use client";

import { Dictionaries } from "@app/[lang]/dictionaries";
import React from "react";
import { createContext } from "react";

export const IntlContext = createContext<Dictionaries | null>(null);

interface IProps {
  children: React.ReactNode;
  dict: Dictionaries;
}

const ServerIntlProvider = ({ children, dict }: IProps) => {
  return <IntlContext.Provider value={dict}>{children}</IntlContext.Provider>;
};

export default ServerIntlProvider;
