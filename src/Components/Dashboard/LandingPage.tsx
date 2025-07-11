import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeaturesSection } from "./Features";
import HandleSearch from "@/components/SearchBar/HandlerSearch";
import HowItWorksSection from "./HowItWorksSection";

interface Hero1Props {
    badge?: string;
    heading?: string;
    description?: string;
    buttons?: {
        primary?: {
            text: string;
            url: string;
        };
        secondary?: {
            text: string;
            url: string;
        };
    };
    image?: {
        src: string;
        alt: string;
    };
}

const LandingPage = ({
    badge = "🌐 One Profile. Infinite Reach.",
    heading = "Your Personalized LinkHub, Reimagined",
    description = "Effortlessly share all your links, social handles, products, and more — beautifully presented, mobile-first, and powered by React, Tailwind, and shadcn/ui.",
    buttons = {
        primary: {
            text: "Get Started for Free",
            url: "/signup", // assuming internal route
        },
        secondary: {
            text: "Learn More",
            url: "#features", // can scroll to a section or be a real page
        },
    },
    image = {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg", // place an SVG/PNG in public/images
        alt: "Preview of a personalized LinkNode profile page",
    }
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
                        {/* <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                            {buttons.primary && (
                                <Button asChild className="w-full sm:w-auto">
                                    <a href={buttons.primary.url}>{buttons.primary.text}</a>
                                </Button>
                            )}
                            {buttons.secondary && (
                                <Button asChild variant="outline" className="w-full sm:w-auto">
                                    <a href={buttons.secondary.url}>
                                        {buttons.secondary.text}
                                        <ArrowRight className="size-4" />
                                    </a>
                                </Button>
                            )}
                        </div> */}
                        <HandleSearch />
                    </div>
                    <img
                        src={image.src}
                        alt={image.alt}
                        className="max-h-96 w-full rounded-md object-cover"
                    />
                </div>
            </div>

            <HowItWorksSection />


            <FeaturesSection />
        </section>
    );
};

export default LandingPage;
