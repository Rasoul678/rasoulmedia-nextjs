import { db } from "@vercel/postgres";

export const GET = async () => {
  const client = await db.connect();

  try {
    const users = await client.sql`SELECT * FROM users;`;
    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
