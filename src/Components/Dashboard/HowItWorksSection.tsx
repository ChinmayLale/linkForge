import {

    LineChart,
    PlugZap,
    Settings,
    Share2,
    Smartphone,
    TrendingUp,
} from "lucide-react";

interface Reason {
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface Feature43Props {
    heading?: string;
    reasons?: Reason[];
}

const HowItWorksSection = ({
    heading = "Why Choose LinkForge?",
    reasons = [
        {
            title: "One Link to Rule Them All",
            description:
                "Unify all your social profiles, websites, and products into one smart, customizable link.",
            icon: <PlugZap className="size-6" />,
        },
        {
            title: "Effortless Customization",
            description:
                "Drag, drop, and personalize your page with themes, colors, and components that fit your brand.",
            icon: <Settings className="size-6" />,
        },
        {
            title: "Boost Visibility",
            description:
                "Get discovered faster with a single, shareable hub that showcases your top content.",
            icon: <Share2 className="size-6" />,
        },
        {
            title: "Actionable Analytics",
            description:
                "Track clicks, engagement, and traffic in real time to see what’s working.",
            icon: <LineChart className="size-6" />,
        },
        {
            title: "Mobile Optimized",
            description:
                "Fully responsive design that looks and feels perfect on any device.",
            icon: <Smartphone className="size-6" />,
        },
        {
            title: "Drive Conversions",
            description:
                "Turn visits into actions with call-to-action buttons, integrations, and more.",
            icon: <TrendingUp className="size-6" />,
        },
    ],
}: Feature43Props) => {
    return (
        <section className="py-32">
            <div className="container">
                <div className="mb-10 md:mb-20">
                    <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
                        {heading}
                    </h2>
                </div>
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((reason, i) => (
                        <div key={i} className="flex flex-col">
                            <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                                {reason.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
                            <p className="text-muted-foreground">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;