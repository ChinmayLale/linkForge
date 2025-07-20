import { loginUserWithEmail } from "@/Services/auth/Login";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginProps, LoginResponse } from "@/interfaces/auth/loginSignup";
import { toast } from "sonner";
import type { NextAuthOptions } from "next-auth";

import { Session } from "next-auth";


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
                username: { label: "Username", type: "text", placeholder: "abc@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    console.log("Inside Authorize Function with credentials:", credentials);
                    console.log("Request Headers:", req.body);
                    if (!credentials?.username || !credentials?.password) {
                        return null;
                    }

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
            if (account?.provider === "google" && profile?.email) {
                try {
                    console.log("🔄 Processing Google login for:", profile.email);
                    const res = await loginUserWithGoogle(profile.email);

                    if (res) {
                        console.log("✅ Backend response received:", res);
                        token.id = res.id;
                        token.username = res.username;
                        token.email = res.email;
                        token.customToken = res.token;

                        console.log("🎯 Token updated:", {
                            id: token.id,
                            username: token.username,
                            email: token.email,
                            hasCustomToken: !!token.customToken
                        });
                    } else {
                        console.error("❌ Google login failed: No response from backend");
                        throw new Error("Backend authentication failed");
                    }
                } catch (error) {
                    console.error("💥 Error during Google login:", error);
                    throw error;
                }
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

export async function loginUserWithGoogle(email: string): Promise<LoginResponse> {
    console.log("Simulating Google Login for email:", email);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return typed response
    return {
        id: "google-user-123",
        username: "Google User",
        email: email,
        token: "dummy-jwt-token-from-backend",
    };
}