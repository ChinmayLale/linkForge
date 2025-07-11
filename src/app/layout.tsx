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

export const metadata: Metadata = {
  title: "LinkForge",
  description: "Connecting audiences to your content",
};

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plusjakarta", // optional, for Tailwind
  weight: ["400", "500", "600", "700", "800"], // choose what you need
  display: "swap",
})


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
