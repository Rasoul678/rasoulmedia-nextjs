import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
  const client = await db.connect();

  try {
    await client.sql`CREATE TABLE IF NOT EXISTS Pets ( Name varchar(255), Owner varchar(255) );`;
    const names = ["me", "you"];
    await client.sql`INSERT INTO Pets (Name, Owner) VALUES (${names[0]}, ${names[1]});`;
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  const pets = await client.sql`SELECT * FROM Pets;`;
  return new Response(JSON.stringify({ pets }), { status: 200 });
};
