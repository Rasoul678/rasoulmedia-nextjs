import { sql } from "@vercel/postgres";

export const GET = async () => {

  // TODO: add middleware
  try {
    const profile = await sql`SELECT * FROM "Profile";`;
    return new Response(JSON.stringify({ profile }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
