import { sql } from "@vercel/postgres";

export const GET = async () => {
  try {
    const profile = await sql`SELECT * FROM profiles;`;
    return new Response(JSON.stringify({ profile }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
