import { ThemeSettings } from "@/types";
import {
    LinkIcon,
    ImageIcon,
    Instagram,
    Twitter,
    Youtube,
    Github,
    Globe,
    Music,
    Video,
    Mail,
    Calendar,
} from "lucide-react"




export const templatesOldOne = [
    { id: "minimal", name: "Minimal", preview: "bg-white text-black" },
    { id: "dark", name: "Dark", preview: "bg-gray-900 text-white" },
    { id: "gradient", name: "Gradient", preview: "bg-gradient-to-br from-purple-500 to-pink-500 text-white" },
    { id: "neon", name: "Neon", preview: "bg-black text-green-400" },
    { id: "glassmorphism", name: "Glass", preview: "bg-gradient-to-br from-blue-400 to-purple-600 text-white" },

    // 🌅 Sunset Pastel
    {
        id: "sunset",
        name: "Sunset Pastel",
        preview: "bg-gradient-to-br from-orange-200 via-pink-200 to-purple-300 text-gray-800"
    },

    // 🎨 Claymorphic
    {
        id: "clay",
        name: "Claymorphic",
        preview: "bg-[#ecf0f3] text-gray-700"
    },

    // 🧊 Frosted Ice
    {
        id: "frosted",
        name: "Frosted Ice",
        preview: "bg-white/30 backdrop-blur-md text-black"
    },

    // 🧱 Brutalist
    {
        id: "brutalist",
        name: "Brutalist",
        preview: "bg-yellow-300 text-black"
    },

    // 🍬 Soft Pink
    {
        id: "softpink",
        name: "Soft Pink",
        preview: "bg-pink-100 text-pink-800"
    },

    // 🩵 Cool Mint
    {
        id: "mint",
        name: "Cool Mint",
        preview: "bg-gradient-to-br from-teal-100 to-green-100 text-green-800"
    },

    // ⚡ Vibrant Pop
    {
        id: "vibrant",
        name: "Vibrant Pop",
        preview: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500 text-white"
    },


    // New 

    {
        id: "minimal",
        name: "Minimal",
        preview: "bg-white text-gray-800 border border-gray-200"
    },

    // 🌙 Dark Mode
    {
        id: "dark",
        name: "Dark Mode",
        preview: "bg-gray-900 text-white"
    },

    // 🌊 Ocean Blue
    {
        id: "ocean",
        name: "Ocean",
        preview: "bg-gradient-to-br from-blue-600 to-blue-800 text-white"
    },

    // 🌲 Forest Green
    {
        id: "forest",
        name: "Forest",
        preview: "bg-gradient-to-br from-emerald-600 to-green-700 text-white"
    },

    // 🌸 Soft Rose
    {
        id: "rose",
        name: "Soft Rose",
        preview: "bg-gradient-to-br from-rose-100 to-pink-200 text-rose-900"
    },

    // 🟣 Royal Purple
    {
        id: "royal",
        name: "Royal Purple",
        preview: "bg-gradient-to-br from-purple-600 to-indigo-700 text-white"
    },

    // 🧊 Frosted Glass
    {
        id: "frosted",
        name: "Frosted Glass",
        preview: "bg-white/20 backdrop-blur-md text-gray-800 border border-white/30"
    },

    // 🌅 Warm Sunset
    {
        id: "sunset",
        name: "Warm Sunset",
        preview: "bg-gradient-to-br from-orange-400 to-pink-500 text-white"
    },

    // ☁️ Cloud Gray
    {
        id: "cloud",
        name: "Cloud",
        preview: "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800"
    },

    // 💎 Premium Dark
    {
        id: "premium",
        name: "Premium",
        preview: "bg-gradient-to-br from-slate-800 to-slate-900 text-white"
    }
]

export const templatesGoodOne = [
    // 📱 Essential Themes
    {
        id: "clean",
        name: "Clean White",
        preview: "bg-white text-gray-900 border border-gray-200"
    },
    {
        id: "dark",
        name: "Dark Mode",
        preview: "bg-gray-900 text-gray-100"
    },

    // 🎨 Professional Themes
    {
        id: "corporate",
        name: "Corporate Blue",
        preview: "bg-slate-50 text-slate-900 border border-slate-200"
    },
    {
        id: "midnight",
        name: "Midnight",
        preview: "bg-slate-800 text-slate-100"
    },

    // 🌊 Nature-Inspired
    {
        id: "ocean",
        name: "Deep Ocean",
        preview: "bg-blue-900 text-blue-50"
    },
    {
        id: "forest",
        name: "Forest Green",
        preview: "bg-green-800 text-green-50"
    },
    {
        id: "sky",
        name: "Clear Sky",
        preview: "bg-sky-50 text-sky-900 border border-sky-200"
    },
    {
        id: "sage",
        name: "Sage Green",
        preview: "bg-green-50 text-green-900 border border-green-200"
    },

    // 🌙 Elegant Darks
    {
        id: "charcoal",
        name: "Charcoal",
        preview: "bg-zinc-800 text-zinc-100"
    },
    {
        id: "purple",
        name: "Deep Purple",
        preview: "bg-purple-900 text-purple-50"
    },
    {
        id: "indigo",
        name: "Indigo Night",
        preview: "bg-indigo-900 text-indigo-50"
    },

    // 🌸 Warm & Friendly
    {
        id: "cream",
        name: "Warm Cream",
        preview: "bg-orange-50 text-orange-900 border border-orange-200"
    },
    {
        id: "blush",
        name: "Soft Blush",
        preview: "bg-rose-50 text-rose-900 border border-rose-200"
    },
    {
        id: "lavender",
        name: "Lavender",
        preview: "bg-purple-50 text-purple-950 border border-purple-200"
    },

    // 🎯 Modern Gradients
    {
        id: "oceanic",
        name: "Oceanic",
        preview: "bg-gradient-to-br from-blue-600 to-blue-800 text-white"
    },
    {
        id: "sunset",
        name: "Sunset",
        preview: "bg-gradient-to-br from-orange-500 to-red-600 text-white"
    },
    {
        id: "twilight",
        name: "Twilight",
        preview: "bg-gradient-to-br from-purple-600 to-indigo-700 text-white"
    },
    {
        id: "emerald",
        name: "Emerald",
        preview: "bg-gradient-to-br from-emerald-500 to-green-600 text-white"
    },

    // 🔮 Premium Glass Effects
    {
        id: "frost",
        name: "Frosted Glass",
        preview: "bg-white/10 backdrop-blur text-gray-900 border border-white/20"
    },
    {
        id: "smoke",
        name: "Smoke Glass",
        preview: "bg-gray-900/80 backdrop-blur text-white border border-white/10"
    },
];



export const templateStylesGoodOne = {
    // Essential Clean Themes
    clean: {
        backgroundColor: "#ffffff",
        backgroundType: "solid" as const,
        primaryColor: "#2563eb", // blue-600 - accessible contrast
        textColor: "#111827", // gray-900 - high contrast
        secondaryText: "#6b7280", // gray-500 - for descriptions
        cardBackground: "#ffffff",
        cardBorder: "#e5e7eb", // gray-200
        cardStyle: "clean",
        shadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        backdropBlur: "0px",
    },

    dark: {
        backgroundColor: "#111827", // gray-900
        backgroundType: "solid" as const,
        primaryColor: "#60a5fa", // blue-400 - good contrast on dark
        textColor: "#f9fafb", // gray-50
        secondaryText: "#9ca3af", // gray-400
        cardBackground: "#1f2937", // gray-800
        cardBorder: "#374151", // gray-700
        cardStyle: "dark",
        shadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        backdropBlur: "0px",
    },

    // Professional Themes
    corporate: {
        backgroundColor: "#f8fafc", // slate-50
        backgroundType: "solid" as const,
        primaryColor: "#1e40af", // blue-800
        textColor: "#0f172a", // slate-900
        secondaryText: "#64748b", // slate-500
        cardBackground: "#ffffff",
        cardBorder: "#cbd5e1", // slate-300
        cardStyle: "professional",
        shadow: "0 2px 4px rgba(15, 23, 42, 0.08)",
        backdropBlur: "0px",
    },

    midnight: {
        backgroundColor: "#1e293b", // slate-800
        backgroundType: "solid" as const,
        primaryColor: "#38bdf8", // sky-400
        textColor: "#f1f5f9", // slate-100
        secondaryText: "#94a3b8", // slate-400
        cardBackground: "#334155", // slate-700
        cardBorder: "#475569", // slate-600
        cardStyle: "modern",
        shadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
        backdropBlur: "0px",
    },

    // Nature-Inspired Themes
    ocean: {
        backgroundColor: "#1e3a8a", // blue-900
        backgroundType: "solid" as const,
        primaryColor: "#dbeafe", // blue-100
        textColor: "#dbeafe", // blue-50
        secondaryText: "#93c5fd", // blue-300
        cardBackground: "#1d4ed8", // blue-700
        cardBorder: "#2563eb", // blue-600
        cardStyle: "nature",
        shadow: "0 4px 12px rgba(30, 58, 138, 0.4)",
        backdropBlur: "0px",
    },

    forest: {
        backgroundColor: "#14532d", // green-900
        backgroundType: "solid" as const,
        primaryColor: "#dcfce7", // green-100
        textColor: "#f0fdf4", // green-50
        secondaryText: "#86efac", // green-300
        cardBackground: "#166534", // green-800
        cardBorder: "#15803d", // green-700
        cardStyle: "nature",
        shadow: "0 4px 12px rgba(20, 83, 45, 0.4)",
        backdropBlur: "0px",
    },

    sky: {
        backgroundColor: "#f0f9ff", // sky-50
        backgroundType: "solid" as const,
        primaryColor: "#0c4a6e", // sky-900
        textColor: "#0c4a6e", // sky-900
        secondaryText: "#0369a1", // sky-700
        cardBackground: "#ffffff",
        cardBorder: "#bae6fd", // sky-200
        cardStyle: "light",
        shadow: "0 2px 8px rgba(12, 74, 110, 0.1)",
        backdropBlur: "0px",
    },

    sage: {
        backgroundColor: "#f0fdf4", // green-50
        backgroundType: "solid" as const,
        primaryColor: "#14532d", // green-900
        textColor: "#14532d", // green-900
        secondaryText: "#166534", // green-800
        cardBackground: "#ffffff",
        cardBorder: "#bbf7d0", // green-200
        cardStyle: "organic",
        shadow: "0 2px 8px rgba(20, 83, 45, 0.1)",
        backdropBlur: "0px",
    },

    // Elegant Dark Themes
    charcoal: {
        backgroundColor: "#27272a", // zinc-800
        backgroundType: "solid" as const,
        primaryColor: "#e4e4e7", // zinc-200
        textColor: "#fafafa", // zinc-50
        secondaryText: "#a1a1aa", // zinc-400
        cardBackground: "#3f3f46", // zinc-700
        cardBorder: "#52525b", // zinc-600
        cardStyle: "minimal",
        shadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        backdropBlur: "0px",
    },

    purple: {
        backgroundColor: "#581c87", // purple-900
        backgroundType: "solid" as const,
        primaryColor: "#f3e8ff", // purple-50
        textColor: "#faf5ff", // purple-50
        secondaryText: "#c4b5fd", // purple-300
        cardBackground: "#7c3aed", // purple-600
        cardBorder: "#8b5cf6", // purple-500
        cardStyle: "elegant",
        shadow: "0 4px 12px rgba(88, 28, 135, 0.4)",
        backdropBlur: "0px",
    },

    indigo: {
        backgroundColor: "#312e81", // indigo-900
        backgroundType: "solid" as const,
        primaryColor: "#e0e7ff", // indigo-100
        textColor: "#e0e7ff", // indigo-100
        secondaryText: "#a5b4fc", // indigo-300
        cardBackground: "#4338ca", // indigo-700
        cardBorder: "#4f46e5", // indigo-600
        cardStyle: "tech",
        shadow: "0 4px 12px rgba(49, 46, 129, 0.4)",
        backdropBlur: "0px",
    },

    // Warm & Friendly Themes
    cream: {
        backgroundColor: "#fff7ed", // orange-50
        backgroundType: "solid" as const,
        primaryColor: "#9a3412", // orange-800
        textColor: "#9a3412", // orange-800
        secondaryText: "#c2410c", // orange-700
        cardBackground: "#ffffff",
        cardBorder: "#fed7aa", // orange-200
        cardStyle: "warm",
        shadow: "0 2px 8px rgba(154, 52, 18, 0.1)",
        backdropBlur: "0px",
    },

    blush: {
        backgroundColor: "#fff1f2", // rose-50
        backgroundType: "solid" as const,
        primaryColor: "#881337", // rose-900
        textColor: "#881337", // rose-900
        secondaryText: "#be123c", // rose-800
        cardBackground: "#ffffff",
        cardBorder: "#fecdd3", // rose-200
        cardStyle: "soft",
        shadow: "0 2px 8px rgba(136, 19, 55, 0.1)",
        backdropBlur: "0px",
    },

    lavender: {
        backgroundColor: "#faf5ff", // purple-50
        backgroundType: "solid" as const,
        primaryColor: "#581c87", // purple-900
        textColor: "#581c87", // purple-900
        secondaryText: "#7c2d92", // purple-800
        cardBackground: "#ffffff",
        cardBorder: "#e9d5ff", // purple-200
        cardStyle: "gentle",
        shadow: "0 2px 8px rgba(88, 28, 135, 0.1)",
        backdropBlur: "0px",
    },

    // Modern Gradients
    oceanic: {
        backgroundColor: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
        backgroundType: "gradient" as const,
        primaryColor: "#ffffff",
        textColor: "#ffffff",
        secondaryText: "#dbeafe", // blue-100
        cardBackground: "rgba(255, 255, 255, 0.1)",
        cardBorder: "rgba(255, 255, 255, 0.2)",
        cardStyle: "glass",
        shadow: "0 8px 32px rgba(37, 99, 235, 0.3)",
        backdropBlur: "10px",
    },

    sunset: {
        backgroundColor: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
        backgroundType: "gradient" as const,
        primaryColor: "#ffffff",
        textColor: "#ffffff",
        secondaryText: "#fed7aa", // orange-200
        cardBackground: "rgba(255, 255, 255, 0.15)",
        cardBorder: "rgba(255, 255, 255, 0.25)",
        cardStyle: "glass",
        shadow: "0 8px 32px rgba(249, 115, 22, 0.3)",
        backdropBlur: "10px",
    },

    twilight: {
        backgroundColor: "linear-gradient(135deg, #9333ea 0%, #4338ca 100%)",
        backgroundType: "gradient" as const,
        primaryColor: "#ffffff",
        textColor: "#ffffff",
        secondaryText: "#e9d5ff", // purple-200
        cardBackground: "rgba(255, 255, 255, 0.1)",
        cardBorder: "rgba(255, 255, 255, 0.2)",
        cardStyle: "glass",
        shadow: "0 8px 32px rgba(147, 51, 234, 0.3)",
        backdropBlur: "10px",
    },

    emerald: {
        backgroundColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        backgroundType: "gradient" as const,
        primaryColor: "#ffffff",
        textColor: "#ffffff",
        secondaryText: "#d1fae5", // green-100
        cardBackground: "rgba(255, 255, 255, 0.12)",
        cardBorder: "rgba(255, 255, 255, 0.22)",
        cardStyle: "glass",
        shadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
        backdropBlur: "10px",
    },

    // Premium Glass Effects
    frost: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backgroundType: "glass" as const,
        primaryColor: "#111827", // gray-900
        textColor: "#111827", // gray-900
        secondaryText: "#6b7280", // gray-500
        cardBackground: "rgba(255, 255, 255, 0.8)",
        cardBorder: "rgba(255, 255, 255, 0.3)",
        cardStyle: "frosted",
        shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        backdropBlur: "10px",
    },

    smoke: {
        backgroundColor: "rgba(17, 24, 39, 0.8)", // gray-900 with opacity
        backgroundType: "glass" as const,
        primaryColor: "#f9fafb", // gray-50
        textColor: "#f9fafb", // gray-50
        secondaryText: "#d1d5db", // gray-300
        cardBackground: "rgba(31, 41, 55, 0.6)", // gray-800 with opacity
        cardBorder: "rgba(255, 255, 255, 0.1)",
        cardStyle: "smoky",
        shadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        backdropBlur: "10px",
    },
}



export const templates = [
    // 📱 Essential Themes
    {
        id: "clean",
        name: "Clean White",
        preview: "bg-white text-gray-900 border border-gray-200"
    },
    {
        id: "dark",
        name: "Dark Mode",
        preview: "bg-gray-900 text-gray-100"
    },
    {
        id: "stone",
        name: "Neutral Stone",
        preview: "bg-stone-50 text-stone-900 border border-stone-200"
    },
    {
        id: "onyx",
        name: "Onyx Black",
        preview: "bg-slate-950 text-gray-100"
    },

    // 🎨 Professional Themes
    {
        id: "corporate",
        name: "Corporate Blue",
        preview: "bg-slate-50 text-slate-900 border border-slate-200"
    },
    {
        id: "midnight",
        name: "Midnight",
        preview: "bg-slate-800 text-slate-100"
    },
    {
        id: "steel",
        name: "Steel Gray",
        preview: "bg-gray-100 text-gray-900 border border-gray-300"
    },
    {
        id: "executive",
        name: "Executive Navy",
        preview: "bg-blue-950 text-blue-50"
    },

    // 🌊 Nature-Inspired
    {
        id: "ocean",
        name: "Deep Ocean",
        preview: "bg-blue-900 text-blue-50"
    },
    {
        id: "forest",
        name: "Forest Green",
        preview: "bg-green-800 text-green-50"
    },
    {
        id: "sky",
        name: "Clear Sky",
        preview: "bg-sky-50 text-sky-900 border border-sky-200"
    },
    {
        id: "sage",
        name: "Sage Green",
        preview: "bg-green-50 text-green-900 border border-green-200"
    },
    {
        id: "sand",
        name: "Desert Sand",
        preview: "bg-amber-50 text-amber-900 border border-amber-200"
    },
    {
        id: "coral",
        name: "Coral Reef",
        preview: "bg-red-50 text-red-900 border border-red-200"
    },

    // 🌙 Elegant Darks
    {
        id: "charcoal",
        name: "Charcoal",
        preview: "bg-zinc-800 text-zinc-100"
    },
    {
        id: "purple",
        name: "Deep Purple",
        preview: "bg-purple-900 text-purple-50"
    },
    {
        id: "indigo",
        name: "Indigo Night",
        preview: "bg-indigo-900 text-indigo-50"
    },
    {
        id: "ebony",
        name: "Ebony",
        preview: "bg-gray-950 text-gray-50"
    },
    {
        id: "amethyst",
        name: "Amethyst Glow",
        preview: "bg-purple-950 text-purple-50"
    },

    // 🌸 Warm & Friendly
    {
        id: "cream",
        name: "Warm Cream",
        preview: "bg-orange-50 text-orange-900 border border-orange-200"
    },
    {
        id: "blush",
        name: "Soft Blush",
        preview: "bg-rose-50 text-rose-900 border border-rose-200"
    },
    {
        id: "lavender",
        name: "Lavender",
        preview: "bg-purple-50 text-purple-950 border border-purple-200"
    },
    {
        id: "peach",
        name: "Peach Blossom",
        preview: "bg-orange-100 text-orange-900 border border-orange-300"
    },
    {
        id: "honey",
        name: "Honey Glow",
        preview: "bg-yellow-50 text-yellow-900 border border-yellow-200"
    },

    // 🎯 Modern Gradients
    {
        id: "oceanic",
        name: "Oceanic",
        preview: "bg-gradient-to-br from-blue-600 to-blue-800 text-white"
    },
    {
        id: "sunset",
        name: "Sunset",
        preview: "bg-gradient-to-br from-orange-500 to-red-600 text-gray-100"
    },
    {
        id: "twilight",
        name: "Twilight",
        preview: "bg-gradient-to-br from-purple-600 to-indigo-700 text-white"
    },
    {
        id: "emerald",
        name: "Emerald",
        preview: "bg-gradient-to-br from-emerald-500 to-green-600 text-gray-100"
    },
    {
        id: "aurora",
        name: "Aurora",
        preview: "bg-gradient-to-br from-teal-500 to-cyan-600 text-white"
    },
    {
        id: "dawn",
        name: "Morning Dawn",
        preview: "bg-gradient-to-br from-pink-500 to-orange-600 text-white"
    },

    // 🔮 Premium Glass Effects
    {
        id: "frost",
        name: "Frosted Glass",
        preview: "bg-white/10 backdrop-blur text-white border border-white/20"
    },
    {
        id: "smoke",
        name: "Smoke Glass",
        preview: "bg-gray-900/80 backdrop-blur text-white border border-white/10"
    },
    {
        id: "crystal",
        name: "Crystal Clear",
        preview: "bg-white/20 backdrop-blur text-white border border-white/30"
    },
    {
        id: "obsidian",
        name: "Obsidian Glass",
        preview: "bg-black/70 backdrop-blur text-gray-50 border border-gray-100/20"
    }
];

export const templateStyles: Record<string, ThemeSettings> = {
    // 📱 Essential Themes
    clean: {
        backgroundColor: "#ffffff", // white
        backgroundType: "solid",
        primaryColor: "#2563eb", // blue-600
        textColor: "#111827", // gray-900
        secondaryText: "#6b7280", // gray-500
        cardBackground: "#ffffff",
        cardBorder: "#e5e7eb", // gray-200
        cardBorderColor: "#e5e7eb", // gray-200
        cardStyle: "clean",
        cardShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif", // Default font
        borderRadius: 8, // Default border radius
        layout: "grid", // Default layout
        cardPadding: "16px", // Default padding
    },
    dark: {
        backgroundColor: "#111827", // gray-900
        backgroundType: "solid",
        primaryColor: "#60a5fa", // blue-400
        textColor: "#f3f4f6", // gray-100
        secondaryText: "#9ca3af", // gray-400
        cardBackground: "#1f2937", // gray-800
        cardBorder: "#374151", // gray-700
        cardBorderColor: "#374151", // gray-700
        cardStyle: "dark",
        cardShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    stone: {
        backgroundColor: "#f5f5f4", // stone-50
        backgroundType: "solid",
        primaryColor: "#3f3f46", // stone-700
        textColor: "#1c1917", // stone-900
        secondaryText: "#57534e", // stone-600
        cardBackground: "#ffffff",
        cardBorder: "#e7e5e4", // stone-200
        cardBorderColor: "#e7e5e4", // stone-200
        cardStyle: "neutral",
        cardShadow: "0 2px 4px rgba(28, 25, 23, 0.1)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    onyx: {
        backgroundColor: "#0f172a", // slate-950
        backgroundType: "solid",
        primaryColor: "#60a5fa", // blue-400
        textColor: "#f3f4f6", // gray-100
        secondaryText: "#94a3b8", // slate-400
        cardBackground: "#1e293b", // slate-800
        cardBorder: "#334155", // slate-700
        cardBorderColor: "#334155", // slate-700
        cardStyle: "dark",
        cardShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },

    // 🎨 Professional Themes
    corporate: {
        backgroundColor: "#f8fafc", // slate-50
        backgroundType: "solid",
        primaryColor: "#1e40af", // blue-800
        textColor: "#0f172a", // slate-900
        secondaryText: "#64748b", // slate-500
        cardBackground: "#ffffff",
        cardBorder: "#cbd5e1", // slate-200
        cardBorderColor: "#cbd5e1", // slate-200
        cardStyle: "professional",
        cardShadow: "0 2px 4px rgba(15, 23, 42, 0.08)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    midnight: {
        backgroundColor: "#1e293b", // slate-800
        backgroundType: "solid",
        primaryColor: "#38bdf8", // sky-400
        textColor: "#f1f5f9", // slate-100
        secondaryText: "#94a3b8", // slate-400
        cardBackground: "#334155", // slate-700
        cardBorder: "#475569", // slate-600
        cardBorderColor: "#475569", // slate-600
        cardStyle: "modern",
        cardShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    steel: {
        backgroundColor: "#f3f4f6", // gray-100
        backgroundType: "solid",
        primaryColor: "#1f2937", // gray-800
        textColor: "#111827", // gray-900
        secondaryText: "#4b5563", // gray-600
        cardBackground: "#ffffff",
        cardBorder: "#d1d5db", // gray-300
        cardBorderColor: "#d1d5db", // gray-300
        cardStyle: "professional",
        cardShadow: "0 2px 4px rgba(17, 24, 39, 0.08)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    executive: {
        backgroundColor: "#1e3a8a", // blue-950
        backgroundType: "solid",
        primaryColor: "#bfdbfe", // blue-200
        textColor: "#eff6ff", // blue-50
        secondaryText: "#93c5fd", // blue-300
        cardBackground: "#1e40af", // blue-800
        cardBorder: "#3b82f6", // blue-500
        cardBorderColor: "#3b82f6", // blue-500
        cardStyle: "executive",
        cardShadow: "0 4px 12px rgba(30, 58, 138, 0.4)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },

    // 🌊 Nature-Inspired Themes
    ocean: {
        backgroundColor: "#1e3a8a", // blue-900
        backgroundType: "solid",
        primaryColor: "#bfdbfe", // blue-200
        textColor: "#eff6ff", // blue-50
        secondaryText: "#93c5fd", // blue-300
        cardBackground: "#1d4ed8", // blue-700
        cardBorder: "#2563eb", // blue-600
        cardBorderColor: "#2563eb", // blue-600
        cardStyle: "nature",
        cardShadow: "0 4px 12px rgba(30, 58, 138, 0.4)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    forest: {
        backgroundColor: "#166534", // green-800
        backgroundType: "solid",
        primaryColor: "#d1fae5", // green-100
        textColor: "#f0fdf4", // green-50
        secondaryText: "#86efac", // green-300
        cardBackground: "#15803d", // green-700
        cardBorder: "#16a34a", // green-600
        cardBorderColor: "#16a34a", // green-600
        cardStyle: "nature",
        cardShadow: "0 4px 12px rgba(20, 83, 45, 0.4)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    sky: {
        backgroundColor: "#f0f9ff", // sky-50
        backgroundType: "solid",
        primaryColor: "#0c4a6e", // sky-900
        textColor: "#0c4a6e", // sky-900
        secondaryText: "#0369a1", // sky-700
        cardBackground: "#ffffff",
        cardBorder: "#bae6fd", // sky-200
        cardBorderColor: "#bae6fd", // sky-200
        cardStyle: "light",
        cardShadow: "0 2px 8px rgba(12, 74, 110, 0.1)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    sage: {
        backgroundColor: "#f0fdf4", // green-50
        backgroundType: "solid",
        primaryColor: "#14532d", // green-900
        textColor: "#14532d", // green-900
        secondaryText: "#166534", // green-800
        cardBackground: "#ffffff",
        cardBorder: "#bbf7d0", // green-200
        cardBorderColor: "#bbf7d0", // green-200
        cardStyle: "organic",
        cardShadow: "0 2px 8px rgba(20, 83, 45, 0.1)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    sand: {
        backgroundColor: "#fefce8", // amber-50
        backgroundType: "solid",
        primaryColor: "#b45309", // amber-800
        textColor: "#78350f", // amber-900
        secondaryText: "#d97706", // amber-700
        cardBackground: "#ffffff",
        cardBorder: "#fde68a", // amber-200
        cardBorderColor: "#fde68a", // amber-200
        cardStyle: "warm",
        cardShadow: "0 2px 8px rgba(120, 53, 15, 0.1)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    coral: {
        backgroundColor: "#fef2f2", // red-50
        backgroundType: "solid",
        primaryColor: "#991b1b", // red-800
        textColor: "#7f1d1d", // red-900
        secondaryText: "#b91c1c", // red-700
        cardBackground: "#ffffff",
        cardBorder: "#fecaca", // red-200
        cardBorderColor: "#fecaca", // red-200
        cardStyle: "soft",
        cardShadow: "0 2px 8px rgba(127, 29, 29, 0.1)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },

    // 🌙 Elegant Dark Themes
    charcoal: {
        backgroundColor: "#27272a", // zinc-800
        backgroundType: "solid",
        primaryColor: "#e4e4e7", // zinc-200
        textColor: "#f4f4f5", // zinc-100
        secondaryText: "#a1a1aa", // zinc-400
        cardBackground: "#3f3f46", // zinc-700
        cardBorder: "#52525b", // zinc-600
        cardBorderColor: "#52525b", // zinc-600
        cardStyle: "minimal",
        cardShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    purple: {
        backgroundColor: "#4c1d95", // purple-900
        backgroundType: "solid",
        primaryColor: "#e9d5ff", // purple-200
        textColor: "#faf5ff", // purple-50
        secondaryText: "#c4b5fd", // purple-300
        cardBackground: "#6b21a8", // purple-800
        cardBorder: "#7c3aed", // purple-600
        cardBorderColor: "#7c3aed", // purple-600
        cardStyle: "elegant",
        cardShadow: "0 4px 12px rgba(76, 29, 149, 0.4)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    indigo: {
        backgroundColor: "#312e81", // indigo-900
        backgroundType: "solid",
        primaryColor: "#c7d2fe", // indigo-200
        textColor: "#eef2ff", // indigo-50
        secondaryText: "#a5b4fc", // indigo-300
        cardBackground: "#3730a3", // indigo-800
        cardBorder: "#4f46e5", // indigo-600
        cardBorderColor: "#4f46e5", // indigo-600
        cardStyle: "tech",
        cardShadow: "0 4px 12px rgba(49, 46, 129, 0.4)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    ebony: {
        backgroundColor: "#030712", // gray-950
        backgroundType: "solid",
        primaryColor: "#d1d5db", // gray-300
        textColor: "#f9fafb", // gray-50
        secondaryText: "#9ca3af", // gray-400
        cardBackground: "#111827", // gray-900
        cardBorder: "#1f2937", // gray-800
        cardBorderColor: "#1f2937", // gray-800
        cardStyle: "dark",
        cardShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    amethyst: {
        backgroundColor: "#4c1d95", // purple-950
        backgroundType: "solid",
        primaryColor: "#e9d5ff", // purple-200
        textColor: "#faf5ff", // purple-50
        secondaryText: "#c4b5fd", // purple-300
        cardBackground: "#6b21a8", // purple-800
        cardBorder: "#7c3aed", // purple-600
        cardBorderColor: "#7c3aed", // purple-600
        cardStyle: "elegant",
        cardShadow: "0 4px 12px rgba(76, 29, 149, 0.4)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },

    // 🌸 Warm & Friendly Themes
    cream: {
        backgroundColor: "#fff7ed", // orange-50
        backgroundType: "solid",
        primaryColor: "#c2410c", // orange-700
        textColor: "#9a3412", // orange-900
        secondaryText: "#ea580c", // orange-600
        cardBackground: "#ffffff",
        cardBorder: "#fed7aa", // orange-200
        cardBorderColor: "#fed7aa", // orange-200
        cardStyle: "warm",
        cardShadow: "0 2px 8px rgba(154, 52, 18, 0.1)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    blush: {
        backgroundColor: "#fff1f2", // rose-50
        backgroundType: "solid",
        primaryColor: "#be123c", // rose-800
        textColor: "#881337", // rose-900
        secondaryText: "#e11d48", // rose-700
        cardBackground: "#ffffff",
        cardBorder: "#fecdd3", // rose-200
        cardBorderColor: "#fecdd3", // rose-200
        cardStyle: "soft",
        cardShadow: "0 2px 8px rgba(136, 19, 55, 0.1)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    lavender: {
        backgroundColor: "#faf5ff", // purple-50
        backgroundType: "solid",
        primaryColor: "#6b21a8", // purple-800
        textColor: "#4c1d95", // purple-950
        secondaryText: "#7c3aed", // purple-600
        cardBackground: "#ffffff",
        cardBorder: "#e9d5ff", // purple-200
        cardBorderColor: "#e9d5ff", // purple-200
        cardStyle: "gentle",
        cardShadow: "0 2px 8px rgba(76, 29, 149, 0.1)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    peach: {
        backgroundColor: "#ffedd5", // orange-100
        backgroundType: "solid",
        primaryColor: "#c2410c", // orange-700
        textColor: "#9a3412", // orange-900
        secondaryText: "#ea580c", // orange-600
        cardBackground: "#ffffff",
        cardBorder: "#fdba74", // orange-300
        cardBorderColor: "#fdba74", // orange-300
        cardStyle: "warm",
        cardShadow: "0 2px 8px rgba(154, 52, 18, 0.1)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    honey: {
        backgroundColor: "#fefce8", // yellow-50
        backgroundType: "solid",
        primaryColor: "#b45309", // yellow-800
        textColor: "#78350f", // yellow-900
        secondaryText: "#d97706", // yellow-700
        cardBackground: "#ffffff",
        cardBorder: "#fef08a", // yellow-200
        cardBorderColor: "#fef08a", // yellow-200
        cardStyle: "warm",
        cardShadow: "0 2px 8px rgba(120, 53, 15, 0.1)",
        backdropBlur: "0px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },

    // 🎯 Modern Gradients
    oceanic: {
        backgroundColor: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)", // blue-600 to blue-800
        backgroundType: "gradient",
        primaryColor: "#bfdbfe", // blue-200
        textColor: "#ffffff",
        secondaryText: "#dbeafe", // blue-100
        cardBackground: "rgba(255, 255, 255, 0.1)",
        cardBorder: "rgba(255, 255, 255, 0.2)",
        cardBorderColor: "rgba(255, 255, 255, 0.2)",
        cardStyle: "glass",
        cardShadow: "0 8px 32px rgba(37, 99, 235, 0.3)",
        backdropBlur: "10px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    sunset: {
        backgroundColor: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)", // orange-500 to red-600
        backgroundType: "gradient",
        primaryColor: "#fed7aa", // orange-200
        textColor: "#f3f4f6", // gray-100
        secondaryText: "#fecaca", // red-200
        cardBackground: "rgba(255, 255, 255, 0.15)",
        cardBorder: "rgba(255, 255, 255, 0.25)",
        cardBorderColor: "rgba(255, 255, 255, 0.25)",
        cardStyle: "glass",
        cardShadow: "0 8px 32px rgba(249, 115, 22, 0.3)",
        backdropBlur: "10px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    twilight: {
        backgroundColor: "linear-gradient(135deg, #9333ea 0%, #4338ca 100%)", // purple-600 to indigo-700
        backgroundType: "gradient",
        primaryColor: "#e9d5ff", // purple-200
        textColor: "#ffffff",
        secondaryText: "#c7d2fe", // indigo-200
        cardBackground: "rgba(255, 255, 255, 0.1)",
        cardBorder: "rgba(255, 255, 255, 0.2)",
        cardBorderColor: "rgba(255, 255, 255, 0.2)",
        cardStyle: "glass",
        cardShadow: "0 8px 32px rgba(147, 51, 234, 0.3)",
        backdropBlur: "10px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    emerald: {
        backgroundColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)", // emerald-500 to green-600
        backgroundType: "gradient",
        primaryColor: "#d1fae5", // green-100
        textColor: "#f3f4f6", // gray-100
        secondaryText: "#6ee7b7", // emerald-300
        cardBackground: "rgba(255, 255, 255, 0.12)",
        cardBorder: "rgba(255, 255, 255, 0.22)",
        cardBorderColor: "rgba(255, 255, 255, 0.22)",
        cardStyle: "glass",
        cardShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
        backdropBlur: "10px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    aurora: {
        backgroundColor: "linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)", // teal-500 to cyan-600
        backgroundType: "gradient",
        primaryColor: "#a5f3fc", // cyan-200
        textColor: "#ffffff",
        secondaryText: "#cffafe", // cyan-100
        cardBackground: "rgba(255, 255, 255, 0.1)",
        cardBorder: "rgba(255, 255, 255, 0.2)",
        cardBorderColor: "rgba(255, 255, 255, 0.2)",
        cardStyle: "glass",
        cardShadow: "0 8px 32px rgba(20, 184, 166, 0.3)",
        backdropBlur: "10px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    dawn: {
        backgroundColor: "linear-gradient(135deg, #ec4899 0%, #ea580c 100%)", // pink-500 to orange-600
        backgroundType: "gradient",
        primaryColor: "#fbcfe8", // pink-200
        textColor: "#ffffff",
        secondaryText: "#fed7aa", // orange-200
        cardBackground: "rgba(255, 255, 255, 0.15)",
        cardBorder: "rgba(255, 255, 255, 0.25)",
        cardBorderColor: "rgba(255, 255, 255, 0.25)",
        cardStyle: "glass",
        cardShadow: "0 8px 32px rgba(236, 72, 153, 0.3)",
        backdropBlur: "10px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },

    // 🔮 Premium Glass Effects
    frost: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backgroundType: "glass",
        primaryColor: "#ffffff",
        textColor: "#ffffff",
        secondaryText: "#d1d5db", // gray-300
        cardBackground: "rgba(255, 255, 255, 0.2)",
        cardBorder: "rgba(255, 255, 255, 0.3)",
        cardBorderColor: "rgba(255, 255, 255, 0.3)",
        cardStyle: "frosted",
        cardShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        backdropBlur: "10px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    smoke: {
        backgroundColor: "rgba(17, 24, 39, 0.8)", // gray-900/80
        backgroundType: "glass",
        primaryColor: "#f9fafb", // gray-50
        textColor: "#f9fafb", // gray-50
        secondaryText: "#d1d5db", // gray-300
        cardBackground: "rgba(31, 41, 55, 0.6)", // gray-800/60
        cardBorder: "rgba(255, 255, 255, 0.1)",
        cardBorderColor: "rgba(255, 255, 255, 0.1)",
        cardStyle: "smoky",
        cardShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        backdropBlur: "10px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    crystal: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backgroundType: "glass",
        primaryColor: "#ffffff",
        textColor: "#ffffff",
        secondaryText: "#d1d5db", // gray-300
        cardBackground: "rgba(255, 255, 255, 0.3)",
        cardBorder: "rgba(255, 255, 255, 0.3)",
        cardBorderColor: "rgba(255, 255, 255, 0.3)",
        cardStyle: "frosted",
        cardShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        backdropBlur: "10px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
    obsidian: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backgroundType: "glass",
        primaryColor: "#f9fafb", // gray-50
        textColor: "#f9fafb", // gray-50
        secondaryText: "#d1d5db", // gray-300
        cardBackground: "rgba(17, 24, 39, 0.5)", // gray-900/50
        cardBorder: "rgba(243, 244, 246, 0.2)", // gray-100/20
        cardBorderColor: "rgba(243, 244, 246, 0.2)", // gray-100/20
        cardStyle: "smoky",
        cardShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        backdropBlur: "10px",
        fontFamily: "Inter, sans-serif",
        borderRadius: 8,
        layout: "grid",
        cardPadding: "16px",
    },
};

export const components = [
    { id: "link", name: "Link", icon: LinkIcon, type: "link" },
    { id: "social", name: "Social", icon: Instagram, type: "social" },
    { id: "music", name: "Music", icon: Music, type: "music" },
    { id: "video", name: "Video", icon: Video, type: "video" },
    { id: "image", name: "Image", icon: ImageIcon, type: "image" },
    { id: "contact", name: "Contact", icon: Mail, type: "contact" },
    { id: "event", name: "Event", icon: Calendar, type: "event" },
    { id: "gallery", name: "Gallery", icon: ImageIcon, type: "gallery" },
]

export const socialIcons = {
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    github: Github,
    globe: Globe,
}
