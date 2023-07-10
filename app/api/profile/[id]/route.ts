import { sql } from "@vercel/postgres";
import type { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // TODO: query by session user email
    const profile =
      await sql`SELECT * FROM "Profile" WHERE "userId" = ${params.id};`;
    return new Response(JSON.stringify({ profile }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
