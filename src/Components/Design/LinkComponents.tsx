"use client"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { Progress } from "@/Components/ui/progress"
import { Play, Pause, Heart, Share, Calendar, MapPin, Mail, ExternalLink, LinkIcon } from "lucide-react"
import type { LinkItem, ThemeSettings } from "../../types"
import { socialIcons } from "../../Constants"

interface LinkComponentsProps {
  link: LinkItem
  theme: ThemeSettings
  selectedElement: string | null
  setSelectedElement: (id: string) => void
  playingMusic: string | null
  setPlayingMusic: (id: string | null) => void
}

export function LinkComponents({
  link,
  theme,
  selectedElement,
  setSelectedElement,
  playingMusic,
  setPlayingMusic,
}: LinkComponentsProps) {
  const baseClasses = `
        group relative transition-all duration-300 cursor-pointer overflow-hidden
        ${selectedElement === link.id ? "ring-2 ring-blue-400 ring-opacity-60" : ""}
        ${
          theme.cardStyle === "glass"
            ? "backdrop-blur-md bg-white/10 border border-white/20"
            : theme.cardStyle === "minimal"
              ? "border-2 border-white/30"
              : theme.cardStyle === "neumorphism"
                ? "bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] shadow-lg"
                : "bg-white/90 border border-white/20 shadow-lg"
        }
        hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]
    `

  const getStyleClasses = (style: string, color: string) => {
    switch (style) {
      case "outline":
        return `bg-transparent border-2 text-white`
      case "fill":
        return `text-white border-0`
      case "gradient":
        return `bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0`
      case "neon":
        return `bg-black border-2 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]`
      default:
        return theme.cardStyle === "glass" ? "text-white" : "text-gray-800"
    }
  }

  const styleClasses = getStyleClasses(link.style, link.color)

  switch (link.type) {
    case "music":
      return (
        <div
          key={link.id}
          className={`${baseClasses} ${styleClasses} p-3 sm:p-4 rounded-2xl`}
          style={{
            borderRadius: `${theme.borderRadius}px`,
            backgroundColor: link.style === "fill" || link.style === "gradient" ? link.color : undefined,
            borderColor: link.style === "outline" || link.style === "neon" ? link.color : undefined,
          }}
          onClick={() => setSelectedElement(link.id)}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={
                  link.metadata?.thumbnail ||
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
                  e.stopPropagation()
                  setPlayingMusic(playingMusic === link.id ? null : link.id)
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
              <h3 className="font-semibold text-xs sm:text-sm truncate">{link.title}</h3>
              <p className="text-xs opacity-70">{link.metadata?.artist}</p>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={playingMusic === link.id ? 45 : 0} className="flex-1 h-1" />
                <span className="text-xs opacity-60">{link.metadata?.duration}</span>
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button size="sm" variant="ghost" className="w-6 h-6 sm:w-8 sm:h-8 p-0 opacity-60 hover:opacity-100">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="w-6 h-6 sm:w-8 sm:h-8 p-0 opacity-60 hover:opacity-100">
                <Share className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>
      )

    case "video":
      return (
        <div
          key={link.id}
          className={`${baseClasses} ${styleClasses} p-0 rounded-2xl overflow-hidden`}
          style={{
            borderRadius: `${theme.borderRadius}px`,
            backgroundColor: link.style === "fill" || link.style === "gradient" ? link.color : undefined,
            borderColor: link.style === "outline" || link.style === "neon" ? link.color : undefined,
          }}
          onClick={() => setSelectedElement(link.id)}
        >
          <div className="relative">
            <img
              src={
                link.metadata?.thumbnail ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=200&fit=crop"
              }
              alt="Video thumbnail"
              className="w-full h-24 sm:h-32 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button size="lg" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                <Play className="w-4 h-4 sm:w-6 sm:h-6 ml-1" />
              </Button>
            </div>
            <Badge className="absolute top-2 right-2 bg-black/60 text-white text-xs">{link.metadata?.duration}</Badge>
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="font-semibold text-xs sm:text-sm mb-1">{link.title}</h3>
            <p className="text-xs opacity-70 line-clamp-2">{link.metadata?.description}</p>
          </div>
        </div>
      )

    case "event":
      return (
        <div
          key={link.id}
          className={`${baseClasses} ${styleClasses} p-3 sm:p-4 rounded-2xl`}
          style={{
            borderRadius: `${theme.borderRadius}px`,
            backgroundColor: link.style === "fill" || link.style === "gradient" ? link.color : undefined,
            borderColor: link.style === "outline" || link.style === "neon" ? link.color : undefined,
          }}
          onClick={() => setSelectedElement(link.id)}
        >
          <div className="flex items-start gap-3">
            <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-xs sm:text-sm mb-1">{link.title}</h3>
              <div className="flex items-center gap-2 text-xs opacity-70 mb-1">
                <Calendar className="w-3 h-3" />
                <span>{link.metadata?.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs opacity-70 mb-2">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{link.metadata?.location}</span>
              </div>
              <p className="text-xs opacity-80 line-clamp-2">{link.metadata?.description}</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="bg-white/20 hover:bg-white/30 text-xs px-2 sm:px-3 flex-shrink-0"
            >
              Tickets
            </Button>
          </div>
        </div>
      )

    case "gallery":
      return (
        <div
          key={link.id}
          className={`${baseClasses} ${styleClasses} p-3 sm:p-4 rounded-2xl`}
          style={{
            borderRadius: `${theme.borderRadius}px`,
            backgroundColor: link.style === "fill" || link.style === "gradient" ? link.color : undefined,
            borderColor: link.style === "outline" || link.style === "neon" ? link.color : undefined,
          }}
          onClick={() => setSelectedElement(link.id)}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-xs sm:text-sm">{link.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {link.metadata?.images?.length || 0} photos
            </Badge>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {link.metadata?.images?.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=200&fit=crop"}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-10 sm:h-12 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )

    case "contact":
      return (
        <div
          key={link.id}
          className={`${baseClasses} ${styleClasses} p-3 sm:p-4 rounded-2xl`}
          style={{
            borderRadius: `${theme.borderRadius}px`,
            backgroundColor: link.style === "fill" || link.style === "gradient" ? link.color : undefined,
            borderColor: link.style === "outline" || link.style === "neon" ? link.color : undefined,
          }}
          onClick={() => setSelectedElement(link.id)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-xs sm:text-sm">{link.title}</h3>
              <p className="text-xs opacity-70">Get in touch with me</p>
            </div>
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-60 flex-shrink-0" />
          </div>
        </div>
      )

    default:
      const IconComponent = link.icon ? socialIcons[link.icon as keyof typeof socialIcons] : LinkIcon
      return (
        <div
          key={link.id}
          className={`${baseClasses} ${styleClasses} p-3 sm:p-4 rounded-2xl`}
          style={{
            borderRadius: `${theme.borderRadius}px`,
            backgroundColor: link.style === "fill" || link.style === "gradient" ? link.color : undefined,
            borderColor: link.style === "outline" || link.style === "neon" ? link.color : undefined,
          }}
          onClick={() => setSelectedElement(link.id)}
        >
          <div className="flex items-center justify-center gap-3">
            {IconComponent && <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />}
            <span className="font-medium text-xs sm:text-sm truncate">{link.title}</span>
            {link.type === "social" && <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-60 flex-shrink-0" />}
          </div>
        </div>
      )
  }
}
