"use client";

import React from "react";
import { ThemeProviderWrapper } from "../providers/theme-provider";
import DashboardNavigation from "@/Components/Navbar/UserNavbar";
import { SessionProvider } from "next-auth/react";
import { EdgeStoreProvider } from "@/lib/edgestore";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <EdgeStoreProvider>
        <main suppressHydrationWarning={true}>
          <DashboardNavigation />
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </main>
      </EdgeStoreProvider>
    </SessionProvider>
  );
}

export default RootLayout;
