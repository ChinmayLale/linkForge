import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/Components/Navbar/NavBarWrapper";
import StoreProvider from "@/store/StoreProvider";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plusjakarta", // optional, for Tailwind
  weight: ["400", "500", "600", "700", "800"], // choose what you need
  display: "swap",
})


export const metadata: Metadata = {
  title: {
    default: "LinkForge",
    template: "%s | LinkForge",
  },
  description: "LinkForge helps creators and brands consolidate all their links in one personalized hub.",
  metadataBase: new URL("https://link-forge-ten.vercel.app"), // ✅ Update here
  openGraph: {
    title: "LinkForge",
    description: "Create and share your personalized bio link.",
    url: "https://link-forge-ten.vercel.app",
    siteName: "LinkForge",
    images: [
      {
        url: "https://link-forge-ten.vercel.app/og-image.png", // ✅ Your OG image
        width: 1200,
        height: 630,
        alt: "LinkForge Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkForge",
    description: "One link to rule them all - by LinkForge.",
    images: ["https://link-forge-ten.vercel.app/og-image.png"],
    creator: "@chinmayLale", // optional
  },
  keywords: [
    "LinkForge",
    "link in bio",
    "linktree alternative",
    "bio link manager",
    "creator tools",
    "smart profile links"
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}${plusJakarta.variable} antialiased dark`}
      >
        <StoreProvider>
          <Toaster richColors position="top-center" />
          <NavBar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
