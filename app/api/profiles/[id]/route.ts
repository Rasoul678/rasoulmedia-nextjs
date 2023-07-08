import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const profile =
      await sql`SELECT * FROM users u INNER JOIN profiles p ON u.id = p.user_id WHERE u.id = ${params.id};`;
    return new Response(JSON.stringify({ profile }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
