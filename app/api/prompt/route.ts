import type { NextRequest } from "next/server";
import { serverService } from "@utils/api-service";

export const GET = async (req: NextRequest) => {
  try {
    //! get page and lastCursor from query
    const { searchParams } = new URL(req.url);

    const take = searchParams.get("take");
    const lastCursor = searchParams.get("lastCursor");
    const search = searchParams.get("search");

    const params = {
      take,
      searchText: search,
      lastCursor,
    };
    console.log("🚀 ~ file: route.ts:18 ~ GET ~ params:", params)

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
