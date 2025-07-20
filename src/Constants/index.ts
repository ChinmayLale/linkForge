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
