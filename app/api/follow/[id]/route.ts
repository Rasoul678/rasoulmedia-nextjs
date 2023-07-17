import type { NextRequest } from "next/server";
import prisma from "@utils/auth/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@utils/auth/authOptions";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { userId } = (await req.json()) as {
    userId: string;
  };

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
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        followedBy: { connect: { id: userId } },
      },
    });
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { userId } = (await req.json()) as {
    userId: string;
  };

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
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        followedBy: { disconnect: { id: userId } },
      },
    });
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
