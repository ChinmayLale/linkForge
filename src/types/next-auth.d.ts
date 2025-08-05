// types/next-auth.d.ts
import { DefaultSession, DefaultJWT } from "next-auth"

declare module "next-auth" {
    interface Session {
        username?: string
        customToken?: string
        error?: string
        needsSignup?: boolean
        pendingGoogleUser?: {
            email?: string
            name?: string
            image?: string
        }
        user: {
            id: string
            email: string
            name: string
            image?: string
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        username?: string
        email?: string
        name?: string
        image?: string
        token?: string
        avatarUrl?: string
        createdAt?: string
        updatedAt?: string
        tags?: any[]
        totalClicks?: number
        totalLinks?: number
        ctr?: number
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string
        username?: string
        customToken?: string
        token?: string
        error?: string
        needsSignup?: boolean
        pendingGoogleUser?: {
            email?: string
            name?: string
            image?: string
        }
    }
}