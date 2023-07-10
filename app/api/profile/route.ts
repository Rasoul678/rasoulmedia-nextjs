import { authOptions } from "@utils/auth/authOptions";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";

export const GET = async () => {
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
    const profile =
      await sql`SELECT * FROM "Profile" WHERE "userId" = ${session.user.id};`;
    return new Response(JSON.stringify({ profile }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
