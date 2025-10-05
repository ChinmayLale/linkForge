"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";
import {
  Play,
  Pause,
  Heart,
  Share,
  Calendar,
  MapPin,
  Mail,
  ExternalLink,
  LinkIcon,
} from "lucide-react";
import type {
  EventMetadata,
  GalleryMetadata,
  LinkItem,
  LinkMetadata,
  ThemeSettings,
  VideoMetadata,
} from "../../types";
import { socialIcons } from "../../Constants";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

interface LinkComponentsProps {
  link: LinkItem;
  theme: ThemeSettings;
  selectedElement: string | null;
  setSelectedElement: (id: string) => void;
  playingMusic: string | null;
  setPlayingMusic: (id: string | null) => void;
}

export function LinkComponents({
  link,
  theme,
  selectedElement,
  setSelectedElement,
  playingMusic,
  setPlayingMusic,
}: LinkComponentsProps) {
  // Enhanced base classes using all theme properties
  const baseClasses = `
    group relative transition-all duration-300 cursor-pointer overflow-hidden
    ${selectedElement === link.id ? "ring-2 ring-opacity-60" : ""}
    hover:scale-[1.02] active:scale-[0.98]
  `;

  // Dynamic styles based on theme properties
  const getCardStyles = () => {
    const styles: React.CSSProperties = {
      backgroundColor: theme.cardBackground,
      borderColor: theme.cardBorder,
      color: theme.textColor,
      boxShadow: theme.shadow,
      borderRadius: `${theme.borderRadius || 16}px`,
    };

    // Apply backdrop blur for glass themes
    if (theme.backdropBlur) {
      styles.backdropFilter = "blur(12px)";
      styles.WebkitBackdropFilter = "blur(12px)";
    }

    return styles;
  };

  // Get text colors based on theme
  const getTextStyles = () => ({
    primary: { color: theme.textColor },
    secondary: { color: theme.secondaryText },
    accent: { color: theme.primaryColor },
  });

  // Enhanced style classes for different link styles

  const getStyleClasses = (style: string, color: string) => {
    const textStyles = getTextStyles();

    switch (style) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: color,
          color: color,
        };
      case "fill":
        return {
          backgroundColor: color,
          borderWidth: "0",
          color: "#ffffff",
        };
      case "gradient":
        return {
          background: `linear-gradient(135deg, ${color} 0%, ${theme.primaryColor} 100%)`,
          borderWidth: "0",
          color: "#ffffff",
        };
      case "neon":
        return {
          backgroundColor: "#000000",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: color,
          color: color,
          boxShadow: `0 0 20px ${color}33`,
        };
      default:
        return {
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorder,
          color: textStyles.primary.color,
        };
    }
  };

  const customStyles = getStyleClasses(link.style, link.color);
  const textStyles = getTextStyles();

  // Ring color for selected state
  const ringColor = {
    "--tw-ring-color": theme.primaryColor,
  } as React.CSSProperties;

  switch (link.type) {
    case "music":
      return (
        <div
          key={link.id}
          className={`${baseClasses} p-3 sm:p-4 border`}
          style={{
            ...getCardStyles(),
            ...customStyles,
            ...(selectedElement === link.id ? ringColor : {}),
          }}
          onClick={() => setSelectedElement(link.id)}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex-shrink-0">
              <Image
                width={10}
                height={10}
                src={
                  link.thumbnail ||
                  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"
                }
                alt="Track"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute inset-0 w-full h-full bg-black/40 hover:bg-black/60 text-white rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setPlayingMusic(playingMusic === link.id ? null : link.id);
                }}
              >
                {playingMusic === link.id ? (
                  <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </Button>
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="font-semibold text-xs sm:text-sm truncate"
                style={textStyles.primary}
              >
                {link.title}
              </h3>
              <p className="text-xs" style={textStyles.secondary}>
                Link-artist-here
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Progress
                  value={playingMusic === link.id ? 45 : 0}
                  className="flex-1 h-1"
                  style={{ accentColor: theme.primaryColor }}
                />
                <span className="text-xs" style={textStyles.secondary}>
                  {link.duration || "00:00"}
                </span>
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button
                size="sm"
                variant="ghost"
                className="w-6 h-6 sm:w-8 sm:h-8 p-0 opacity-60 hover:opacity-100"
                style={{ color: theme.primaryColor }}
              >
                <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="w-6 h-6 sm:w-8 sm:h-8 p-0 opacity-60 hover:opacity-100"
                style={{ color: theme.primaryColor }}
              >
                <Share className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>
      );

    case "video":
      // Utility function to extract YouTube video ID and determine if it's a Short
      const getYouTubeVideoInfo = (
        url: string
      ): { videoId: string | null; isShort: boolean } => {
        try {
          const urlObj = new URL(url);
          const hostname = urlObj.hostname.toLowerCase();
          const pathname = urlObj.pathname;

          // Standard YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
          if (
            hostname.includes("youtube.com") &&
            urlObj.searchParams.get("v")
          ) {
            return { videoId: urlObj.searchParams.get("v"), isShort: false };
          }
          // YouTube Shorts URL (e.g., https://www.youtube.com/shorts/VIDEO_ID)
          if (
            hostname.includes("youtube.com") &&
            pathname.startsWith("/shorts/")
          ) {
            return { videoId: pathname.split("/")[2], isShort: true };
          }
          // Shortened YouTube URL (e.g., https://youtu.be/VIDEO_ID)
          if (hostname.includes("youtu.be")) {
            return { videoId: pathname.split("/")[1], isShort: false }; // Treat as standard video
          }
          return { videoId: null, isShort: false };
        } catch {
          return { videoId: null, isShort: false };
        }
      };

      // Format duration for Shorts (e.g., convert "45" to "0:45")
      const formatDuration = (duration: string): string => {
        try {
          const seconds = parseInt(duration);
          if (isNaN(seconds)) return duration;
          const minutes = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${minutes}:${secs.toString().padStart(2, "0")}`;
        } catch {
          return duration;
        }
      };

      const { videoId, isShort } = getYouTubeVideoInfo(link.url);
      const isVideoMetadata = (
        metadata: LinkMetadata | undefined
      ): metadata is VideoMetadata => {
        return !!metadata && "duration" in metadata;
      };

      return (
        <div
          key={link.id}
          className={`${baseClasses} p-0 overflow-hidden border`}
          style={{
            ...getCardStyles(),
            ...customStyles,
            ...(selectedElement === link.id ? ringColor : {}),
          }}
          onClick={() => setSelectedElement(link.id)}
        >
          <div
            className="relative w-full"
            style={{
              paddingBottom: isShort
                ? "177.78%"
                : "56.25%" /* 9:16 for Shorts, 16:9 for standard */,
            }}
          >
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
                title={link.title}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <Image
                src={
                  link.thumbnail ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=200&fit=crop"
                }
                height={32}
                width={32}
                alt="Video thumbnail"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            )}
            {!videoId && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button
                  size="lg"
                  variant="ghost"
                  className="rounded-full"
                  style={{
                    backgroundColor: `${theme.primaryColor}33`,
                    color: theme.primaryColor,
                  }}
                >
                  <Play className="w-4 h-4 sm:w-6 sm:h-6 ml-1" />
                </Button>
              </div>
            )}
            <Badge
              className="absolute top-2 right-2 text-xs"
              style={{
                backgroundColor: theme.cardBackground,
                color: theme.textColor,
              }}
            >
              {link.metadata && isVideoMetadata(link.metadata)
                ? formatDuration(link.metadata.duration)
                : "N/A"}
            </Badge>
          </div>
          <div className="p-3 sm:p-4">
            <h3
              className="font-semibold text-xs sm:text-sm mb-1"
              style={textStyles.primary}
            >
              {link.title}
            </h3>
            <p className="text-xs line-clamp-2" style={textStyles.secondary}>
              {link.metadata && isVideoMetadata(link.metadata)
                ? link.metadata.description || "No description"
                : "No description"}
            </p>
          </div>
        </div>
      );

    case "event":
      return (
        <div
          key={link.id}
          className={`${baseClasses} p-3 sm:p-4 border`}
          style={{
            ...getCardStyles(),
            ...customStyles,
            ...(selectedElement === link.id ? ringColor : {}),
          }}
          onClick={() => setSelectedElement(link.id)}
        >
          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-lg flex-shrink-0"
              style={{ backgroundColor: `${theme.primaryColor}20` }}
            >
              <Calendar
                className="w-4 h-4 sm:w-5 sm:h-5"
                style={{ color: textStyles.secondary.color, opacity: 0.8 }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="font-semibold text-xs sm:text-sm mb-1"
                style={textStyles.primary}
              >
                {link.title}
              </h3>
              <div
                className="flex items-center gap-2 text-xs mb-1"
                style={textStyles.secondary}
              >
                <Calendar className="w-3 h-3" />
                <span>
                  {(link.metadata as EventMetadata)?.date || "dd-mm-yyyy"}
                </span>
              </div>
              <div
                className="flex items-center gap-2 text-xs mb-2"
                style={textStyles.secondary}
              >
                <MapPin className="w-3 h-3" />
                <span className="truncate">
                  {(link.metadata as EventMetadata)?.location || "India"}
                </span>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-xs px-2 sm:px-3 flex-shrink-0"
              style={{
                backgroundColor: textStyles.primary.color,
                color: textStyles.secondary.color,
              }}
            >
              Tickets
            </Button>
          </div>
        </div>
      );

    case "gallery":
      function isGalleryMetadata(
        metadata: LinkMetadata | undefined
      ): metadata is GalleryMetadata {
        return (
          !!metadata && "images" in metadata && Array.isArray(metadata.images)
        );
      }
      return (
        <Card
          key={link.id}
          onClick={() => setSelectedElement(link.id)}
          className={`group cursor-pointer transition-shadow border hover:shadow-lg rounded-2xl ${
            selectedElement === link.id ? "ring-2 ring-offset-2" : ""
          }`}
          style={{
            ...getCardStyles(),
            ...customStyles,
            ...(selectedElement === link.id ? ringColor : {}),
          }}
        >
          <CardContent className="px-4 py-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3
                className="font-semibold text-sm sm:text-base truncate"
                style={textStyles.primary}
              >
                {link.title}
              </h3>
              <Badge
                variant="secondary"
                className="text-xs"
                style={{
                  backgroundColor: theme.backgroundColor,
                  color: theme.secondaryText,
                }}
              >
                {link.metadata && isGalleryMetadata(link.metadata)
                  ? link.metadata.images.length
                  : 0}{" "}
                {link.metadata &&
                isGalleryMetadata(link.metadata) &&
                link.metadata.images.length === 1
                  ? "photo"
                  : "photos"}
              </Badge>
            </div>

            {/* Gallery Grid */}
            {link.type === "gallery" &&
            link.metadata &&
            isGalleryMetadata(link.metadata) ? (
              <div
                className={`grid gap-1.5 rounded overflow-hidden ${
                  link.metadata.images.length === 1
                    ? "grid-cols-1"
                    : link.metadata.images.length === 2
                    ? "grid-cols-2"
                    : link.metadata.images.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-4"
                }`}
              >
                {link.metadata.images
                  .slice(0, 4)
                  .map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="aspect-square overflow-hidden rounded-sm relative"
                    >
                      <img
                        src={img}
                        alt={`${link.title} - Image ${idx + 1}`}
                        className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-110"
                        style={{
                          borderRadius: `${(theme.borderRadius || 16) / 4}px`,
                        }}
                      />
                      {idx === 3 &&
                        link.metadata &&
                        isGalleryMetadata(link.metadata) &&
                        link.metadata.images.length > 4 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              +{link.metadata.images.length - 4}
                            </span>
                          </div>
                        )}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-xs text-muted-foreground">No images added</p>
              </div>
            )}
          </CardContent>
        </Card>
      );

    case "contact":
      return (
        <div
          key={link.id}
          className={`${baseClasses} p-3 sm:p-4 border`}
          style={{
            ...getCardStyles(),
            ...customStyles,
            ...(selectedElement === link.id ? ringColor : {}),
          }}
          onClick={() => setSelectedElement(link.id)}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg flex-shrink-0"
              style={{ backgroundColor: `${theme.primaryColor}20` }}
            >
              <Mail
                className="w-4 h-4 sm:w-5 sm:h-5"
                style={{ color: theme.primaryColor }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="font-semibold text-xs sm:text-sm"
                style={textStyles.primary}
              >
                {link.title}
              </h3>
              <p className="text-xs" style={textStyles.secondary}>
                Get in touch with me
              </p>
            </div>
            <ExternalLink
              className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
              style={{ color: theme.primaryColor, opacity: 0.6 }}
            />
          </div>
        </div>
      );

    default:
      const IconComponent = link.icon
        ? socialIcons[link.icon as keyof typeof socialIcons]
        : LinkIcon;
      return (
        <div
          key={link.id}
          className={`${baseClasses} p-3 sm:p-4 border`}
          style={{
            ...getCardStyles(),
            ...customStyles,
            ...(selectedElement === link.id ? ringColor : {}),
          }}
          onClick={() => setSelectedElement(link.id)}
        >
          <div className="flex items-center justify-center gap-3">
            {IconComponent && (
              <IconComponent
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                style={{ color: textStyles.secondary.color, opacity: 0.8 }}
              />
            )}
            <span
              className="font-medium text-xs sm:text-sm truncate"
              style={textStyles.primary}
            >
              {link.title}
            </span>
            {link.type === "social" && (
              <ExternalLink
                className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                style={{ color: textStyles.secondary.color, opacity: 0.8 }}
              />
            )}
          </div>
        </div>
      );
  }
}
