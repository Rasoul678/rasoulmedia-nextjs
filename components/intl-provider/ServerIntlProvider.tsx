"use client";

import { Dictionaries } from "@app/[lang]/dictionaries";
import React from "react";
import { createContext } from "react";

export const IntlContext = createContext<Dictionaries | null>(null);

interface IProps {
  children: React.ReactNode;
  dict: Dictionaries;
}

export const ServerIntlProvider: React.FC<IProps> = ({ children, dict }) => {
  return <IntlContext.Provider value={dict}>{children}</IntlContext.Provider>;
};
