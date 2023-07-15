import prisma from "@utils/auth/db/client";

export const GET = async () => {
  try {
    // const users = await prisma.user.findUnique({
    //   where: { email: "h.rostami.r@gmail.com" },
    //   include: { following: true },
    // });

    const users = await prisma.user.findMany();
    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
