import type { NextRequest } from "next/server";
import prisma from "@utils/auth/db/client";

export const GET = async (req: NextRequest) => {
  try {
    //! get page and lastCursor from query
    const { searchParams } = new URL(req.url);

    const take = searchParams.get("take");
    const lastCursor = searchParams.get("lastCursor");

    const result = await prisma.prompt.findMany({
      take: take ? parseInt(take as string) : 10,
      ...(lastCursor && {
        skip: 1, // Do not include the cursor itself in the query result.
        cursor: {
          id: lastCursor as string,
        },
      }),
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

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

    const nextPage = await prisma.prompt.findMany({
      // Same as before, limit the number of events returned by this query.
      take: take ? parseInt(take as string) : 7,
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        id: cursor,
      },
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
