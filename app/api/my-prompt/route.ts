import type { NextRequest } from "next/server";
import { serverService } from "@utils/api-service";
import { authOptions } from "@utils/auth/authOptions";
import { getServerSession } from "next-auth";
import { PromptQueryParams } from "@types";

export const GET = async (req: NextRequest) => {
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

  let userId = session.user.id;

  try {
    //! get page and lastCursor from query
    const { searchParams } = new URL(req.url);

    const take = searchParams.get("take");
    const lastCursor = searchParams.get("lastCursor");
    const userId = searchParams.get("userId") ?? session.user.id;

    const params: PromptQueryParams = {
      take,
      lastCursor,
      userId,
    };

    const result = await serverService.getPrompts(params);

    if (result.length == 0) {
      return new Response(
        JSON.stringify({
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
          },
        }),
        { status: 200 }
      );
    }

    const lastPromptInResults = result[result.length - 1];
    const cursor = lastPromptInResults.id;

    const nextPage = await serverService.getNextPrompts({
      take,
      lastCursor: cursor,
      userId,
    });

    const data = {
      data: result,
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
      },
    };

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
};
