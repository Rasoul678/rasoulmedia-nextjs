"use client";

import React, { useEffect } from "react";

interface IProps {}

const Notion: React.FC<IProps> = (props) => {
  useEffect(() => {
    async function getDB() {
      const response = await fetch("/api/notion/mydb");
      const DB = await response.json();
      console.log(DB);

      return DB;
    }

    getDB();
  }, []);

  return <div>Notion</div>;
};

export default Notion;
