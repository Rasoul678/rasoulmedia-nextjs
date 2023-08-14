import prisma from "@utils/auth/db/client";

class PrismaService {
  public findUniqueProfile = async (userId: string) => {
    return await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            _count: {
              select: {
                followedBy: true,
                following: true,
                prompts: true,
              },
            },
            id: true,
            name: true,
            email: true,
            image: true,
            followedBy: true,
            following: true,
            prompts: true,
            role: true,
            emailVerified: true,
            lastJoin: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  };
}

export const prismaService = new PrismaService();
