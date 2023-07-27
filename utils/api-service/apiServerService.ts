import prisma from "@utils/auth/db/client";
import { parseDate } from "@utils";
import { PromptQueryParams } from "@types";

class APIServerSide {
  public getProfile = async (userId: string) => {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          include: {
            followedBy: true,
            following: true,
          },
        },
      },
    });

    if (profile) {
      profile.user.createdAt = parseDate(String(profile.user.createdAt))
        .relativeTime as unknown as Date;

      profile.user.lastJoin = parseDate(String(profile.user.lastJoin))
        .relativeTime as unknown as Date;
    }

    return profile;
  };

  public getPrompts = async (args: PromptQueryParams) => {
    const { take, searchText: search, lastCursor } = args;

    const prompts = await prisma.prompt.findMany({
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
      ...(search && {
        where: {
          OR: [
            {
              text: {
                contains: search,
              },
            },
            {
              tag: {
                contains: search,
              },
            },
            {
              user: {
                OR: [
                  {
                    name: {
                      contains: search,
                    },
                  },
                  {
                    email: {
                      contains: search,
                    },
                  },
                ],
              },
            },
          ],
        },
      }),
    });

    return prompts;
  };

  public getNextPrompts = async (args: PromptQueryParams) => {
    const { take, lastCursor: cursor } = args;

    const nextPage = await prisma.prompt.findMany({
      // Same as before, limit the number of events returned by this query.
      take: take ? parseInt(take as string) : 7,
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        id: String(cursor),
      },
    });

    return nextPage;
  };

  public getUserInitialPrompts = async (args: PromptQueryParams) => {
    const { take, searchText } = args;

    const prompts = await this.getPrompts({ take, searchText });

    const lastPromptInResults = prompts[prompts.length - 1];
    const cursor = lastPromptInResults.id;

    const nextPage = await this.getNextPrompts({ take, lastCursor: cursor });

    return {
      pages: [
        {
          data: prompts,
          metaData: {
            lastCursor: cursor,
            hasNextPage: nextPage.length > 0,
          },
        },
      ],
      pageParams: [],
    };
  };

  public getPromptById = async (promptId: string) => {
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: promptId,
      },
      include: {
        user: true,
      },
    });

    return prompt;
  };
}

export const serverService = new APIServerSide();
