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
import { getSession, signIn } from "next-auth/react"
import { checkUsernameAvailability } from "@/Services/auth/checkUserName"
import { useDebounce } from "@/hooks/useDebounce"
import { BASE_URL } from "@/Constants/Endpoints"
import axios from "axios"
// import type { AxiosRe } from "axios"



export function SignUpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [username, setUsername] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [userEmail, setUserEmail] = useState("")
    const [hasCheckedLogin, setHasCheckedLogin] = useState(false)

    // Username availability states
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [usernameStatus, setUsernameStatus] = useState<{
        available: boolean | null;
        message: string;
    }>({ available: null, message: '' })

    // Debounce username input
    const debouncedUsername = useDebounce(username, 500); // 500ms delay

    useEffect(() => {
        const checkLoginStatus = async () => {
            if (hasCheckedLogin) return;

            const session = await getSession();

            if (session?.user) {
                console.log("User already logged in:", session.user);
                setUserEmail(session.user.email || "");
                setProgress(1);
                toast.success("Welcome back!");
            } else if (localStorage.getItem('googleLoginInProgress')) {
                localStorage.removeItem('googleLoginInProgress');
                toast.error("Login was interrupted. Please try again.");
            }

            setHasCheckedLogin(true);
        };

        checkLoginStatus();
    }, [hasCheckedLogin]);

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
        try {
            console.log("Starting Google login...");
            localStorage.setItem('googleLoginInProgress', 'true');

            await signIn('google', {
                callbackUrl: window.location.href
            });

        } catch (error) {
            console.error("Error during Google login:", error);
            localStorage.removeItem('googleLoginInProgress');
            toast.error("An error occurred during Google login");
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
            // Here you would send the username to your backend
            // Include session data to link the username with the Google account
            const session = await getSession();

            // Mock API call - replace with your actual endpoint
            const response = await axios.post(`${BASE_URL}/auth/signup`, {
                username: username,
                userId: session?.user?.id,
                email: session?.user?.email,
                profilePic : session?.user?.image || "",
                name: session?.user?.name || "",
                provider: "google"
            });

            console.log({ response })
            if (!response.status || response.status !== 201) {
                throw new Error('Failed to complete signup');
            }



            toast.success("Account created successfully!");

            // Redirect to dashboard
            // router.push(`/dashboard/${username}`);

        } catch (error) {
            console.error("Error creating account:", error);
            toast.error("Failed to create account");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        setProgress(0);
        setUsername("");
        setUserEmail("");
        setUsernameStatus({ available: null, message: '' });
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);

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

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            {progress === 0 ? (
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome</CardTitle>
                        <CardDescription>
                            Sign up with your Apple or Google account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline" className="w-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        Continue with Apple
                                    </Button>
                                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        Continue with Google
                                    </Button>
                                </div>
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                                        or continue with
                                    </span>
                                </div>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Signup
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    have an account?{" "}
                                    <Link href="/login" className="underline underline-offset-4">
                                        logIn
                                    </Link>
                                </div>
                            </div>
                        </form>
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
                                        value={`Google ${userEmail || "example@gmail.com"}`}
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