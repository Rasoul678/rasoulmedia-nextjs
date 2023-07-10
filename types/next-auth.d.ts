import type { UserRole } from "@prisma/client";
import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & { id: string; role: UserRole };
  }
  interface User extends DefaultUser {
    role: UserRole;
  }
}
