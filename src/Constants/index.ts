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




export const templates = [
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
    }
]

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
