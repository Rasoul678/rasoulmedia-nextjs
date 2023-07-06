import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const client = await db.connect();

  try {
    await client.sql`CREATE TABLE IF NOT EXISTS users ( Name varchar(255) );`;
    const names = ["Sophia", "Lucy"];

    for (let name of names) {
      await client.sql`INSERT INTO users (Name) VALUES (${name});`;
    }
  } catch (error) {
    return response.status(500).json({ error });
  }

  const pets = await client.sql`SELECT * FROM users;`;
  return new Response(JSON.stringify({ pets }), { status: 200 });
};
