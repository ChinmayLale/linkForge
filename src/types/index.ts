export interface LinkItem {
    id: string
    type: "link" | "social" | "image" | "music" | "video" | "contact" | "gallery" | "event"
    title: string
    url: string
    icon?: string
    color: string
    visible: boolean
    style: "default" | "outline" | "fill" | "gradient" | "neon"
    metadata?: {
        artist?: string
        duration?: string
        thumbnail?: string
        description?: string
        date?: string
        location?: string
        images?: string[]
    }
}

export interface ProfileData {
    name: string
    bio: string
    avatar: string
    username: string
    coverImage?: string
}

export interface ThemeSettings {
    backgroundColor: string
    backgroundType: "solid" | "gradient" | "image"
    primaryColor: string
    textColor: string
    fontFamily: string
    borderRadius: number
    cardStyle: "default" | "glass" | "minimal" | "neumorphism"
    layout: "stack" | "grid" | "masonry"
}

export type ScreenSize = "mobile" | "tablet" | "desktop"
export type PreviewMode = "mobile" | "tablet" | "desktop"



export interface PublishedDesign {
    id: string
    title: string
    profile: ProfileData
    theme: ThemeSettings
    links: LinkItem[]
    publishedAt: Date
    lastModified: Date
    views: number
    isPublic: boolean
    slug: string
    thumbnail?: string
    status: "published" | "draft" | "archived"
    category?: string
    tags?: string[]
}