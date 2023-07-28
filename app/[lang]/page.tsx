"use client";

import React, { useContext } from "react";
import { IntlContext } from "@components/intl-provider";

const Home = () => {
  const intl = useContext(IntlContext);

  return (
    <main className="min-h-screen p-24">
      <div className="text-4xl">Rasoul Media with Next.js</div>
      <div>{intl?.dict?.me}</div>
    </main>
  );
};

export default Home;
