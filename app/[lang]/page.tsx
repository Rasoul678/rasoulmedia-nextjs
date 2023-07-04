"use client";

import React, { useContext } from "react";
import { IntlContext } from "@components/intl-provider";

const Home = () => {
  const intl = useContext(IntlContext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-4xl">Rasoul Media with Next.js</div>
      <div>{intl?.dict?.me}</div>
    </main>
  );
};

export default Home;
