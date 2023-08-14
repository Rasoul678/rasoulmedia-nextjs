import type { NextRequest } from "next/server";
import { prismaService } from "@utils/api-service/prismaService";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const profile = await prismaService.findUniqueProfile(params.id);

    return new Response(JSON.stringify({ profile }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
