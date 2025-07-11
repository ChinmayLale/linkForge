import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, BarChart, Palette, Smartphone } from "lucide-react";

const features = [
    {
        title: "Link Management",
        description: "Easily organize and track all your links in one dashboard.",
        icon: <Link className="size-6 text-primary" />,
    },
    {
        title: "Custom Themes",
        description: "Change colors, fonts, and layouts to match your style.",
        icon: <Palette className="size-6 text-primary" />,
    },
    {
        title: "Analytics",
        description: "See who clicks your links, when, and from where.",
        icon: <BarChart className="size-6 text-primary" />,
    },
    {
        title: "Mobile Optimized",
        description: "Seamless experience on all screen sizes.",
        icon: <Smartphone className="size-6 text-primary" />,
    },
];

export const FeaturesSection = () => (
    <section className="py-24 bg-muted/20">
        <div className="container text-center space-y-12">
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">Built to Empower Your Brand</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => (
                    <Card key={feature.title} className="hover:shadow-md transition">
                        <CardHeader className="flex flex-col items-center gap-4">
                            {feature.icon}
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground text-sm">{feature.description}</CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);
