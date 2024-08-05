import { notionService } from "@utils/api-service";

export const GET = async () => {
  try {
    const users = await notionService.getNotionUser();

    return new Response(JSON.stringify({ ...users }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
