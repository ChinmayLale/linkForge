// app/fonts.ts
import { Plus_Jakarta_Sans } from "next/font/google"

export const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plusjakarta", // optional, for Tailwind
    weight: ["400", "500", "600", "700", "800"], // choose what you need
    display: "swap",
})
