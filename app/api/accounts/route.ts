import { db } from "@vercel/postgres";

export const GET = async () => {
  const client = await db.connect();

  try {
    const account = await client.sql`SELECT * FROM accounts;`;
    return new Response(JSON.stringify({ account }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
