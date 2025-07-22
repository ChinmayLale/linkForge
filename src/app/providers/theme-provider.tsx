// app/providers/theme-provider.tsx
"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            themes={["light", "dark", "pastel", "cyberpunk", "minimal"]}
        >
            {children}
        </ThemeProvider>
    )
}
