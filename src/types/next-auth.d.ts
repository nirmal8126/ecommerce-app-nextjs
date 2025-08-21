import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;  // string because JWT stores it as string
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: number;
    role: string;
    password?: string; // for Prisma user table
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number | string;
    role: string;
  }
}
