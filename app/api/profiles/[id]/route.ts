import { authOptions } from "@utils/auth/authOptions";
import { sql } from "@vercel/postgres";
import { Session, getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response(
      JSON.stringify({
        error: {
          message: "Unauthorized",
          status: 401,
        },
      }),
      {
        status: 401,
      }
    );
  }

  try {
    // TODO: query by session user email
    const profile =
      await sql`SELECT * FROM "Profile" WHERE "userId" = ${params.id};`;
    return new Response(JSON.stringify({ profile }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
