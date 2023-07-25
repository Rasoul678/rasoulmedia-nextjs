import { getServerSession } from "next-auth";
import { PromptType } from "@types";
import type { NextRequest } from "next/server";
import prisma from "@utils/auth/db/client";
import { authOptions } from "@utils/auth/authOptions";

export const POST = async (req: NextRequest) => {
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
    const newPrompt: PromptType = {
      text,
      tag,
      userId: String(session?.user.id),
    };

    await prisma.prompt.create({
      data: {
        text,
        tag,
        userId: String(session?.user.id),
      },
    });

    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
