import { loginUserWithEmail } from "@/Services/auth/Login";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginProps, LoginResponse } from "@/interfaces/auth/loginSignup";
import { toast } from "sonner";
import type { NextAuthOptions } from "next-auth";

import { Session } from "next-auth";
// import { SignupWithGoogle } from "@/Services/auth/Signup";


interface User {
    id: string;
    username?: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    token?: string;
}

interface Account {
    provider: string;
    type: string;
}

interface Profile {
    email?: string;
    name?: string;
}

// Google profile interface
interface GoogleProfile extends Profile {
    sub: string;
    name: string;
    email: string;
    picture: string;
}


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "abc@gmail.com" },
                password: { label: "password", type: "password" },
                provider: { label: "Provider", type: "hidden", value: "CREDENTIALS" } // Hidden field for provider
            },
            async authorize(credentials, req) {
                try {
                    // console.log("Inside Authorize Function with credentials:", credentials);
                    // console.log("Request Headers:", req.body);
                    if (!credentials?.email || !credentials?.password) {
                        console.log("Missing credentials: email or password is empty");
                        toast.error("Email and password are required");
                        return null;
                    }

                    // Set provider to CREDENTIALS
                    credentials.provider = "CREDENTIALS";
                    const res = await loginUserWithEmail(credentials as loginProps) as LoginResponse | null;

                    if (res) {
                        return {
                            id: res.id,
                            name: res.username,
                            email: res.email ?? undefined,
                            username: res.username,
                            token: res.token,
                        };
                    } else {
                        console.log("Login Failed: Invalid credentials");
                        toast.error("Invalid username or password");
                        return null;
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.log("Error While Logging In:", error.message);
                    } else {
                        console.log("Unexpected error:", error);
                    }
                    return null;
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile: GoogleProfile) {
                console.log("Google Profile:", profile);
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    username: profile.name,
                    token: profile.sub,
                };
            },
        })
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
        error: "/auth/error",
    },

    callbacks: {
        async jwt({
            token,
            account,
            profile,
            user
        }: {
            token: JWT;
            account: Account | null;
            profile?: Profile;
            user?: User;
        }): Promise<JWT> {
            console.log("🔧 JWT Callback triggered:", {
                provider: account?.provider,
                hasProfile: !!profile,
                hasUser: !!user,
                tokenId: token.id
            });

            // Handle Google login
            if (user && account?.provider === "google") {
                token.id = user.id;
                token.username = user.username;
                token.picture = user.image;
                token.customToken = user.token; // or sub
            }

            // Handle credentials login
            if (account?.provider === "credentials" && user) {
                console.log("🔐 Processing credentials login");
                token.id = user.id;
                token.username = user.username;
                token.email = user.email ?? undefined;
                token.customToken = user.token;
            }

            console.log("🏁 Final token:", {
                id: token.id,
                email: token.email,
                username: token.username,
                hasCustomToken: !!token.customToken
            });

            return token;
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            console.log("📋 Session Callback triggered:", {
                hasToken: !!token,
                tokenId: token?.id,
                tokenEmail: token?.email
            });

            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.username as string;
                session.username = token.username;
                session.customToken = token.customToken;

                console.log("🎯 Session updated:", {
                    userId: session.user.id,
                    userEmail: session.user.email,
                    userName: session.user.name,
                    username: session.username,
                    hasCustomToken: !!session.customToken
                });
            }

            return session;
        },
    }
};
