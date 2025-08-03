"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft, Check, X, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { getSession, signIn, signOut } from "next-auth/react"
import { checkUsernameAvailability } from "@/Services/auth/checkUserName"
import { useDebounce } from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"
import { signupWithEmail, SignupWithGoogle } from "@/Services/auth/Signup"
import { isAxiosError } from "axios"
import { useDispatch } from "react-redux"
import { setUsernameSlice } from "@/store/slices/userSlice"

export function SignUpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [username, setUsername] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [userEmail, setUserEmail] = useState("")
    const [hasCheckedLogin, setHasCheckedLogin] = useState(false)
    const [userPassword, setUserPassword] = useState("")
    const [signupMethod, setSignupMethod] = useState<'google' | 'email' | null>(null)
    const router = useRouter();
    const dispatch = useDispatch()
    // Username availability states
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [usernameStatus, setUsernameStatus] = useState<{
        available: boolean | null;
        message: string;
    }>({ available: null, message: '' })

    // Debounce username input
    const debouncedUsername = useDebounce(username, 500);

    useEffect(() => {
        const checkLoginStatus = async () => {
            if (hasCheckedLogin) return;

            try {
                const session = await getSession();

                // Check if user completed signup before
                const hasCompletedSignup = sessionStorage.getItem('signupCompleted');

                if (session?.user) {
                    console.log("Session found:", session.user);

                    // If user already completed signup, redirect to dashboard
                    if (hasCompletedSignup) {
                        const savedUsername = sessionStorage.getItem('userUsername');
                        if (savedUsername) {
                            router.push(`/dashboard/${savedUsername}`);
                            return;
                        }
                    }

                    // Check if this is a returning user who's already registered
                    // You might want to call an API to check if user exists in your database

                    // If user has a session but hasn't completed signup flow, continue to username selection
                    if (sessionStorage.getItem('googleSignupInProgress')) {
                        setUserEmail(session.user.email || "");
                        setSignupMethod('google');
                        setProgress(1);
                        toast.success("Please complete your signup by choosing a username");
                    }
                } else {
                    // Clean up any signup progress if no session
                    sessionStorage.removeItem('googleSignupInProgress');
                    sessionStorage.removeItem('signupCompleted');
                    sessionStorage.removeItem('userUsername');
                }
            } catch (error) {
                console.error("Error checking login status:", error);
            } finally {
                setHasCheckedLogin(true);
            }
        };

        checkLoginStatus();
    }, [hasCheckedLogin, router]);

    // Check username availability when debounced value changes
    useEffect(() => {
        const checkUsername = async () => {
            if (!debouncedUsername || debouncedUsername.length < 3) {
                setUsernameStatus({ available: null, message: '' });
                return;
            }

            // Validate username format
            const usernameRegex = /^[a-zA-Z0-9_]+$/;
            if (!usernameRegex.test(debouncedUsername)) {
                setUsernameStatus({
                    available: false,
                    message: 'Username can only contain letters, numbers, and underscores'
                });
                return;
            }

            setIsCheckingUsername(true);
            setUsernameStatus({ available: null, message: 'Checking availability...' });

            try {
                const result = await checkUsernameAvailability(debouncedUsername);
                setUsernameStatus({
                    available: result.available,
                    message: result.message || ''
                });
            } catch (error) {
                console.error('Error checking username:', error);
                setUsernameStatus({
                    available: false,
                    message: 'Error checking username availability'
                });
            } finally {
                setIsCheckingUsername(false);
            }
        };

        checkUsername();
    }, [debouncedUsername]);

    const handleGoogleLogin = async () => {
        if (isLoading) return;

        try {
            setIsLoading(true);
            console.log("Starting Google signup...");

            // Clear any existing sessions first (optional - only if you want to force fresh login)
            // await signOut({ redirect: false });

            // Mark that Google signup is in progress
            sessionStorage.setItem('googleSignupInProgress', 'true');
            toast.dismiss();

            const loadingToastId = toast.loading("Redirecting to Google...");

            const result = await signIn('google', {
                callbackUrl: window.location.href,
                redirect: false
            });

            toast.dismiss(loadingToastId);

            if (result?.error) {
                console.error("Google OAuth error:", result.error);
                toast.error(`Google signup failed: ${result.error}`);
                sessionStorage.removeItem('googleSignupInProgress');
                return;
            }

            if (result?.url) {
                // Redirect to Google OAuth
                window.location.href = result.url;
                return;
            }

            // If no redirect but successful
            if (result?.ok) {
                const session = await getSession();
                if (session?.user?.email) {
                    setUserEmail(session.user.email);
                    setSignupMethod('google');
                    setProgress(1);
                    toast.success("Google authentication successful! Please choose a username.");
                }
            }

        } catch (error) {
            console.error("Error during Google signup:", error);
            sessionStorage.removeItem('googleSignupInProgress');
            toast.error("An error occurred during Google signup");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUsernameSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim()) {
            toast.error("Please enter a username");
            return;
        }

        if (usernameStatus.available === false) {
            toast.error("Please choose a different username");
            return;
        }

        if (usernameStatus.available === null) {
            toast.error("Please wait for username validation");
            return;
        }

        setIsLoading(true);

        try {
            if (signupMethod === 'google') {
                const session = await getSession();

                if (!session?.user?.email) {
                    toast.error("Session expired. Please sign in again.");
                    setProgress(0);
                    setSignupMethod(null);
                    return;
                }

                const response = await SignupWithGoogle({
                    email: session.user.email,
                    username,
                    name: session.user.name || "User",
                    pfp: session.user.image || ""

                });

                if (!response || response.status !== 201) {
                    toast.error("Signup failed: " + (response?.data?.data?.message || "Unknown error"));
                    return;
                }

                // Mark signup as completed
                sessionStorage.setItem('signupCompleted', 'true');
                sessionStorage.setItem('userUsername', username);
                sessionStorage.removeItem('googleSignupInProgress');
                toast.success("Account created successfully!");
                dispatch(setUsernameSlice(username)); // Update Redux store with username
                router.push(`/dashboard/${username}`);

            } else if (signupMethod === 'email') {
                // Handle email signup completion
                const response = await signupWithEmail({
                    email: userEmail,
                    username,
                    password: userPassword
                });

                if (response) {
                    sessionStorage.setItem('signupCompleted', 'true');
                    sessionStorage.setItem('userUsername', username);
                    toast.success("Account created successfully!");
                    dispatch(setUsernameSlice(username)); // Update Redux store with username
                    router.push(`/dashboard/${username}`);
                }
            }

        } catch (error: any) {
            console.error("Error creating account:", error);

            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data?.message || "Signup failed");
            } else {
                toast.error("An unexpected error occurred during signup");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = async () => {
        // Sign out from NextAuth session
        await signOut({ redirect: false });

        // Clear all signup-related storage
        sessionStorage.removeItem('googleSignupInProgress');
        sessionStorage.removeItem('signupCompleted');
        sessionStorage.removeItem('userUsername');

        // Reset component state
        setProgress(0);
        setUsername("");
        setUserEmail("");
        setUserPassword("");
        setSignupMethod(null);
        setUsernameStatus({ available: null, message: '' });

        toast.success("Signed out successfully");
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value.toLowerCase().replace(/\s+/g, '_')); // Normalize username

        // Reset status when user is typing
        if (value !== debouncedUsername) {
            setUsernameStatus({ available: null, message: '' });
        }
    };

    // Determine input styling based on username status
    const getUsernameInputClassName = () => {
        if (usernameStatus.available === true) {
            return "border-green-500 focus:border-green-500";
        } else if (usernameStatus.available === false) {
            return "border-red-500 focus:border-red-500";
        }
        return "";
    };

    const getUsernameStatusIcon = () => {
        if (isCheckingUsername) {
            return <Loader2 className="h-4 w-4 animate-spin text-gray-500" />;
        } else if (usernameStatus.available === true) {
            return <Check className="h-4 w-4 text-green-500" />;
        } else if (usernameStatus.available === false) {
            return <X className="h-4 w-4 text-red-500" />;
        }
        return null;
    };

    const handleEmailSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userEmail || !userPassword || !userPassword.trim()) {
            toast.error("Please enter email and password");
            return;
        }

        if (userPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        // Move to username selection for email signup
        setSignupMethod('email');
        setProgress(1);
        toast.success("Please enter a username to complete your signup");
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            {progress === 0 ? (
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome</CardTitle>
                        <CardDescription>
                            Sign up with your Google account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleGoogleLogin}
                                    disabled={isLoading}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    {isLoading ? "Please wait..." : "Continue with Google"}
                                </Button>
                            </div>
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    or continue with
                                </span>
                            </div>
                            <form onSubmit={handleEmailSignup}>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            required
                                            minLength={6}
                                            value={userPassword}
                                            onChange={(e) => setUserPassword(e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            "Continue"
                                        )}
                                    </Button>
                                </div>
                            </form>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/login" className="underline underline-offset-4">
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex items-center justify-center mb-2 relative">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleBackToLogin}
                                className="absolute left-0"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Check className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                        <CardTitle className="text-xl">Almost there!</CardTitle>
                        <CardDescription>Choose a username for your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUsernameSubmit}>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="signup-method">Signed up with</Label>
                                    <Input
                                        id="signup-method"
                                        value={`${signupMethod === 'google' ? 'Google' : 'Email'} ${userEmail || "example@example.com"}`}
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="username">Username</Label>
                                    <div className="relative">
                                        <Input
                                            id="username"
                                            type="text"
                                            placeholder="johndoe"
                                            value={username}
                                            onChange={handleUsernameChange}
                                            required
                                            minLength={3}
                                            maxLength={20}
                                            pattern="[a-zA-Z0-9_]+"
                                            className={cn("pr-10", getUsernameInputClassName())}
                                            disabled={isLoading}
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            {getUsernameStatusIcon()}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs text-muted-foreground">
                                            3-20 characters, letters, numbers, and underscores only
                                        </p>
                                        {usernameStatus.message && (
                                            <p className={cn(
                                                "text-xs",
                                                usernameStatus.available === true
                                                    ? "text-green-600"
                                                    : usernameStatus.available === false
                                                        ? "text-red-600"
                                                        : "text-gray-600"
                                            )}>
                                                {usernameStatus.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading || usernameStatus.available !== true}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        "Complete signup"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
            <div className="text-muted-foreground text-center text-xs text-balance">
                By clicking continue, you agree to our{" "}
                <a href="#" className="underline underline-offset-4 hover:text-primary">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline underline-offset-4 hover:text-primary">
                    Privacy Policy
                </a>.
            </div>
        </div>
    )
}