import type { UserRole } from "@prisma/client";
import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & { id: string; role: UserRole; provider: string };
  }
  interface User extends DefaultUser {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    name: string;
    email: string;
    role: UserRole;
    provider: string;
    sub: string;
    id: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
