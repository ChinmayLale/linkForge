// types.ts

export interface MusicMetadata {
    artist: string;
    duration: string;
    thumbnail?: string;
}

export interface VideoMetadata {
    thumbnail?: string;
    duration: string;
    description?: string;
}

export interface EventMetadata {
    date: string;
    location: string;
    description?: string;
}

export interface GalleryMetadata {
    images: string[];
}

export type LinkMetadata =
    | MusicMetadata
    | VideoMetadata
    | EventMetadata
    | GalleryMetadata
    | Record<string, unknown>; // fallback for others

export type LinkType = "music" | "video" | "event" | "gallery" | "contact" | "social" | "default";

export interface LinkItem {
    id: string;
    type: LinkType;
    title: string;
    url: string;
    icon?: string;
    color: string;
    active: boolean;
    style: string;
    metadata?: LinkMetadata;
    thumbnail?: string; // Optional thumbnail for links
    clicks?: number; // Optional clicks count for analytics
    duration?: string; // Optional duration for music or video links
    images?: string[]; // Optional images for gallery links
}

export interface ProfileData {
    name: string
    bio: string
    avatar: string
    username: string
    coverImage?: string
}

export interface ThemeSettings {
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image" | "glass";
    primaryColor: string;
    textColor: string;
    fontFamily?: string;
    borderRadius?: number;
    cardStyle: string;
    layout?: "stack" | "grid" | "masonry";
    cardBackground: string;
    cardBorderColor?: string;
    cardShadow?: string;
    cardPadding?: string;
    cardBorder: string;
    backdropBlur: string;
    shadow?: string;
    secondaryText: string;
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


export interface UpdateUserProfileInput {
    username?: string;
    name?: string;
    bio?: string;
    tags?: string[];
    avatarUrl?: string;
    coverImageUrl?: string;
    isProfilePublic?: boolean;
}