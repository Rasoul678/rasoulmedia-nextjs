import { Client } from "@notionhq/client";

//! Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

class NotionService {
  public getNotionUser = async () => {
    return await notion.users.list({});
  };

  public getFullPages = async () => {
    return await notion.databases.query({
      database_id: process.env.NOTION_DB_ID,
    });
  };
}

export const notionService = new NotionService();
