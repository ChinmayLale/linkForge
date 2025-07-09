import { NavbarProps } from '@/interfaces/ui.interface'
import { Book, Menu, Sunset, Trees, Zap } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { Button } from "@/Components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/Components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import React from 'react'
import RenderMenuItem from './RenderMenuItem';
import RenderMobileMenuItem from './RenderMobileMenuItem';

function NavBar({
    logo = {
        url: "https://www.shadcnblocks.com",
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
        alt: "logo",
        title: "Shadcnblocks.com",
    },
    menu = [
        { title: "Home", url: "#" },
        {
            title: "Products",
            url: "#",
            items: [
                {
                    title: "Blog",
                    description: "The latest industry news, updates, and info",
                    icon: <Book className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Company",
                    description: "Our mission is to innovate and empower the world",
                    icon: <Trees className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Careers",
                    description: "Browse job listing and discover our workspace",
                    icon: <Sunset className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Support",
                    description:
                        "Get in touch with our support team or visit our community forums",
                    icon: <Zap className="size-5 shrink-0" />,
                    url: "#",
                },
            ],
        },
        {
            title: "Resources",
            url: "#",
            items: [
                {
                    title: "Help Center",
                    description: "Get all the answers you need right here",
                    icon: <Zap className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Contact Us",
                    description: "We are here to help you with any questions you have",
                    icon: <Sunset className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Status",
                    description: "Check the current status of our services and APIs",
                    icon: <Trees className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Terms of Service",
                    description: "Our terms and conditions for using our services",
                    icon: <Book className="size-5 shrink-0" />,
                    url: "#",
                },
            ],
        },
        {
            title: "Pricing",
            url: "#",
        },
        {
            title: "Blog",
            url: "#",
        },
    ],
    auth = {
        login: { title: "Login", url: "#" },
        signup: { title: "Sign up", url: "#" },
    },
}: NavbarProps) {
    return (
        <section className="py-4 w-full px-6 sticky top-0 z-50 bg-white border-b border-border shadow-sm ">
            <div className='flex flex-row items-center justify-center'>
                <div className="container">
                    {/* Desktop Menu */}
                    <nav className="hidden justify-between lg:flex">
                        <div className="flex items-center gap-6">
                            {/* Logo */}
                            <a href={logo.url} className="flex items-center gap-2">
                                <img src={logo.src} className="max-h-8" alt={logo.alt} />
                                <span className="text-lg font-semibold tracking-tighter">
                                    {logo.title}
                                </span>
                            </a>
                            <div className="flex items-center">
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        {menu.map((item) => RenderMenuItem(item))}
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm">
                                <a href={auth.login.url}>{auth.login.title}</a>
                            </Button>
                            <Button asChild size="sm">
                                <a href={auth.signup.url}>{auth.signup.title}</a>
                            </Button>
                        </div>
                    </nav>

                    {/* Mobile Menu */}
                    <div className="block lg:hidden">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <a href={logo.url} className="flex items-center gap-2">
                                <img src={logo.src} className="max-h-8" alt={logo.alt} />
                            </a>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Menu className="size-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <a href={logo.url} className="flex items-center gap-2">
                                                <img src={logo.src} className="max-h-8" alt={logo.alt} />
                                            </a>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-6 p-4">
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="flex w-full flex-col gap-4"
                                        >
                                            {menu.map((item) => RenderMobileMenuItem(item))}
                                        </Accordion>

                                        <div className="flex flex-col gap-3">
                                            <Button asChild variant="outline">
                                                <a href={auth.login.url}>{auth.login.title}</a>
                                            </Button>
                                            <Button asChild>
                                                <a href={auth.signup.url}>{auth.signup.title}</a>
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NavBar
