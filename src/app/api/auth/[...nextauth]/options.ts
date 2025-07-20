import { loginUserWithEmail } from "@/Services/auth/Login";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleLoginProvider from "next-auth/providers/google"
import { loginProps, LoginResponse } from "@/interfaces/auth/loginSignup";
import { toast } from "sonner";
// import { NextApiRequest } from "next";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",

            credentials: {
                username: { label: "Username", type: "text", placeholder: "abc@gmail.com" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req): Promise<LoginResponse | null> {
                console.log({ req })
                try {
                    console.log("Inside Authorize Function with credentials:", credentials);
                    const res = await loginUserWithEmail(credentials as loginProps) as LoginResponse | null;
                    if (res) {
                        // console.log("User Logged In:", res);
                        return {
                            id: res.id,
                            username: res.username,
                            email: res.email,
                            token: res.token, // add custom token field
                        };
                    } else {
                        console.log("Login Failed: Invalid credentials");
                        toast.error("Invalid username or password");
                        return null;
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.log("Error While Logging In:", error.message);
                        return null
                    } else {
                        console.log("Unexpected error:", error);
                        return null
                    }
                }
            },
        }),

        GoogleLoginProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

            async profile(profile) {
                console.log("Google Profile:", profile);
                return {
                    id: profile.sub, // ✅ this is required
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    token:profile.sub,
                };

            },
        })

    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        error: "/auth/error", // Error code passed in query string as ?error=
    },
    callbacks: {
        async jwt({ token, account, profile, user }) {
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
                token.username = (user as any).username;
                token.email = user.email;
                token.customToken = (user as any).token;
            }

            console.log("🏁 Final token:", {
                id: token.id,
                email: token.email,
                username: token.username,
                hasCustomToken: !!token.customToken
            });

            return token;
        },

        async session({ session, token }) {
            console.log("📋 Session Callback triggered:", {
                hasToken: !!token,
                tokenId: token?.id,
                tokenEmail: token?.email
            });

            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                (session as any).username = token.username;
                (session as any).customToken = token.customToken;

                console.log("🎯 Session updated:", {
                    userId: session.user.id,
                    userEmail: session.user.email,
                    userName: session.user.name,
                    username: (session as any).username,
                    hasCustomToken: !!(session as any).customToken
                });
            }

            return session;
        },
    }
}


export async function loginUserWithGoogle(email: string) {
    console.log("Simulating Google Login for email:", email);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Dummy response
    return {
        id: "google-user-123",
        username: "Google User",
        email: email,
        token: "dummy-jwt-token-from-backend",
    };
}