import type { NextRequest } from "next/server";
import prisma from "@utils/auth/db/client";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // TODO: query by session user email
    const profile = await prisma.profile.findUnique({
      where: { userId: params.id },
      include: {
        user: {
          include: {
            followedBy: true,
            following: true,
            prompts: true,
          },
        },
      },
    });
    return new Response(JSON.stringify({ profile }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
