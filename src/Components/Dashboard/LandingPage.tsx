"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowUpRight, CircleCheckBig } from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { checkUsernameAvailability } from "@/Services/auth/checkUserName";
import { useRouter } from "next/navigation";

// Optimized debounce hook with cleanup
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Username validation regex (defined once)
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const MIN_USERNAME_LENGTH = 3;

interface UsernameStatus {
  available: boolean | null;
  message: string;
}

const UsernameSearch = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>({
    available: null,
    message: "",
  });

  const debouncedUsername = useDebounce(username, 500);

  // Memoized validation function
  const validateUsername = useCallback(
    (name: string): UsernameStatus | null => {
      if (!name || name.length < MIN_USERNAME_LENGTH) {
        return { available: null, message: "" };
      }

      if (!USERNAME_REGEX.test(name)) {
        return {
          available: false,
          message:
            "Username can only contain letters, numbers, and underscores",
        };
      }

      return null;
    },
    []
  );

  useEffect(() => {
    const checkUsername = async () => {
      // Early validation
      const validationResult = validateUsername(debouncedUsername);
      if (validationResult) {
        setUsernameStatus(validationResult);
        return;
      }

      setIsCheckingUsername(true);
      setUsernameStatus({
        available: null,
        message: "Checking availability...",
      });

      try {
        const result = await checkUsernameAvailability(debouncedUsername);
        setUsernameStatus({
          available: result.available,
          message: result.message || "",
        });
        localStorage.setItem("tmpUsername", debouncedUsername);
      } catch (error) {
        console.error("Error checking username:", error);
        setUsernameStatus({
          available: false,
          message: "Error checking username availability",
        });
      } finally {
        setIsCheckingUsername(false);
      }
    };

    checkUsername();
  }, [debouncedUsername, validateUsername]);

  // Memoized computed classes
  const inputClassName = useMemo(() => {
    const baseClass = "w-full border-2 transition-colors";
    if (usernameStatus.available === true) {
      return `${baseClass} border-green-500 focus-visible:ring-green-500`;
    }
    if (usernameStatus.available === false) {
      return `${baseClass} border-red-500 focus-visible:ring-red-500`;
    }
    return baseClass;
  }, [usernameStatus.available]);

  const statusClassName = useMemo(() => {
    if (usernameStatus.available === true)
      return "text-sm text-green-600 font-medium";
    if (usernameStatus.available === false)
      return "text-sm text-red-600 font-medium";
    return "text-sm text-gray-600";
  }, [usernameStatus.available]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    },
    []
  );

  const handleSignup = useCallback(() => {
    if (usernameStatus.available && debouncedUsername) {
      // Store username in sessionStorage for signup page
      sessionStorage.setItem("selectedUsername", debouncedUsername);
      router.push("/signup");
    }
  }, [usernameStatus.available, debouncedUsername, router]);

  const isButtonDisabled = useMemo(() => {
    return (
      !usernameStatus.available || isCheckingUsername || !debouncedUsername
    );
  }, [usernameStatus.available, isCheckingUsername, debouncedUsername]);

  return (
    <div className="w-full space-y-4">
      <div className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
        <div className="relative flex-1 sm:max-w-xs">
          <Input
            type="text"
            placeholder="Enter your desired username"
            value={username}
            onChange={handleInputChange}
            className={inputClassName}
            aria-invalid={usernameStatus.available === false}
            aria-describedby={
              usernameStatus.message ? "username-status" : undefined
            }
          />
          {isCheckingUsername && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Checking username"
            >
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            </div>
          )}
        </div>
        <Button
          onClick={handleSignup}
          disabled={isButtonDisabled}
          className="w-full sm:w-auto"
          size="lg"
        >
          {isCheckingUsername ? "Checking..." : "Claim Username"}
          {/* <Sparkles className="ml-1 size-4" /> */}
          <CircleCheckBig className="ml-0 size-4 text-emerald-600" />
        </Button>
      </div>
      {usernameStatus.message && (
        <p id="username-status" className={statusClassName} role="status">
          {usernameStatus.message}
        </p>
      )}
    </div>
  );
};

interface Hero1Props {
  badge?: string;
  heading?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
}

const LandingPage = ({
  badge = "🌐 One Profile. Infinite Reach.",
  heading = "Your Personalized LinkHub, Reimagined",
  description = "Effortlessly share all your links, social handles, products, and more — beautifully presented, mobile-first, and powered by React, Tailwind, and shadcn/ui.",
  image = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "Preview of a personalized LinkNode profile page",
  },
}: Hero1Props) => {
  return (
    <section className="py-28">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl text-primary">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>
            <UsernameSearch />
          </div>
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
