import prisma from "@utils/auth/db/client";
import { parseDate } from "@utils";

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
}

export const serverService = new APIServerSide();
