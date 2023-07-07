import { sql } from "@vercel/postgres";

export const GET = async () => {
  try {
    const users = await sql`SELECT * FROM users;`;
    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
