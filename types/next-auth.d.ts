import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      firstName?: string
      lastName?: string
      role?: string
    } & DefaultSession["user"]
    accessToken?: string
  }

  interface User {
    firstName?: string
    lastName?: string
    role?: string
    token?: string
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string
    firstName?: string
    lastName?: string
    role?: string
    accessToken?: string
  }
}
