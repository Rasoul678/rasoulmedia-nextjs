import { NextRequest } from "next/server";
import prisma from "@utils/auth/db/client";
import { serverService } from "@utils/api-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@utils/auth/authOptions";

//! GET (read)
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const prompt = await serverService.getPromptById(params.id);

    if (!prompt) {
      return new Response("Prompt not found!", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user prompt", { status: 500 });
  }
};

//! PATCH (update prompt)
export const PATCH = async (
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

  const { text, tag } = (await req.json()) as {
    text: string;
    tag: string;
  };

  try {
    const prompt = await prisma.prompt.update({
      where: {
        id: params.id,
      },
      data: {
        text,
        tag,
      },
    });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

//! DELETE (delete prompt)
export const DELETE = async (
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
    const {} = await prisma.prompt.delete({
      where: {
        id: params.id,
      },
    });

    return new Response("Prompt deleted successfully!", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
