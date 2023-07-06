import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const client = await db.connect();

  try {
    const users = await client.sql`SELECT * FROM users;`;
    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    return response.status(500).json({ error });
  }
};
