import { authOptions } from "@utils/auth/authOptions";
import { getServerSession } from "next-auth";
import { prismaService } from "@utils/api-service/prismaService";

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
    const profile = await prismaService.findUniqueProfile(session.user.id);

    return new Response(JSON.stringify({ profile }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
