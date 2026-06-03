import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      firstName?: string
      lastName?: string
      role?: string
    } & DefaultSession["user"]
  }

  interface User {
    firstName?: string
    lastName?: string
    role?: string
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string
    firstName?: string
    lastName?: string
    role?: string
  }
}
