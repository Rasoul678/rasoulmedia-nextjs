import { z } from "zod";

const envVariables = z.object({
  POSTGRES_URL: z.string(),
  POSTGRES_PRISMA_URL: z.string(),
  POSTGRES_URL_NON_POOLING: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),

  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_ACCESS_TOKEN: z.string(),

  NEXTAUTH_URL: z.string(),
  NEXTAUTH_URL_INTERNAL: z.string(),
  NEXTAUTH_SECRET: z.string(),

  DB_HOST: z.string(),
  DB_PASSWORD: z.string(),
  DB_USER: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.string(),
  DATABASE_URL: z.string(),

  OPENAI_API_KEY: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
