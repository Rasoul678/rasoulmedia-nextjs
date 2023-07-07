import { sql } from "@vercel/postgres";

export const GET = async () => {

  try {
    const account = await sql`SELECT * FROM accounts;`;
    return new Response(JSON.stringify({ account }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
