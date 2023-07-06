import { sql, db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const client = await db.connect();
  
  try {
    await client.sql`CREATE TABLE IF NOT EXISTS Pets ( Name varchar(255), Owner varchar(255) );`;
    const names = ["me", "you"];
    await client.sql`INSERT INTO Pets (Name, Owner) VALUES (${names[0]}, ${names[1]});`;
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  const pets = await client.sql`SELECT * FROM Pets;`;
  return new Response(JSON.stringify({ pets }), { status: 200 });
};
