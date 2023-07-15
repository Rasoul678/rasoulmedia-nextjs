import { authOptions } from "@utils/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@utils/auth/db/client";

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
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          include: {
            followedBy: true,
            following: true,
          },
        },
      },
    });
    return new Response(JSON.stringify({ profile }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
