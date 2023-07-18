import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let client: PrismaClient;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    client = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }

    client = global.prisma;
  }
}

//@ts-ignore
//! I will promise that I will NOT call it on frontend side
export default client;
