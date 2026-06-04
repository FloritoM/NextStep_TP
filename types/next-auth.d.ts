import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      firstName?: string
      lastName?: string
      role?: {
        id: number,
        name: string,
        isDefault?: boolean
      }
    } & DefaultSession["user"]
    accessToken?: string
  }

  interface User {
    firstName?: string
    lastName?: string
    role?: {
      id: number,
      name: string,
      isDefault?: boolean
    }
    token?: string
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string
    firstName?: string
    lastName?: string
    role?: {
      id: number,
      name: string,
      isDefault?: boolean
    }
    accessToken?: string
  }
}
