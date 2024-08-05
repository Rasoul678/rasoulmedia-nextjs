import { notionService } from "@utils/api-service";

export const GET = async () => {
  try {
    const pages = await notionService.getFullPages();
    
    return new Response(JSON.stringify({ pages }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
