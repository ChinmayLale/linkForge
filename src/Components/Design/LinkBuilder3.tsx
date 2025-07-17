"use client"

import { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Layout,
  LinkIcon,
  ImageIcon,
  Instagram,
  Twitter,
  Youtube,
  Github,
  Globe,
  Plus,
  Eye,
  Upload,
  Save,
  Settings,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  Copy,
  Trash2,
  Music,
  Video,
  Mail,
  Calendar,
  MapPin,
  Play,
  Pause,
  Heart,
  Share,
  ExternalLink,
  Menu,
  Tablet,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Badge } from "@/Components/ui/badge"
import { Separator } from "@/Components/ui/separator"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Textarea } from "@/Components/ui/textarea"
import { Switch } from "@/Components/ui/switch"
import { Slider } from "@/Components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"
import { Progress } from "@/Components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"

interface LinkItem {
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

interface ProfileData {
  name: string
  bio: string
  avatar: string
  username: string
  coverImage?: string
}

interface ThemeSettings {
  backgroundColor: string
  backgroundType: "solid" | "gradient" | "image"
  primaryColor: string
  textColor: string
  fontFamily: string
  borderRadius: number
  cardStyle: "default" | "glass" | "minimal" | "neumorphism"
  layout: "stack" | "grid" | "masonry"
}

const templates = [
  { id: "minimal", name: "Minimal", preview: "bg-white text-black" },
  { id: "dark", name: "Dark", preview: "bg-gray-900 text-white" },
  { id: "gradient", name: "Gradient", preview: "bg-gradient-to-br from-purple-500 to-pink-500 text-white" },
  { id: "neon", name: "Neon", preview: "bg-black text-green-400" },
  { id: "glassmorphism", name: "Glass", preview: "bg-gradient-to-br from-blue-400 to-purple-600 text-white" },
]

const components = [
  { id: "link", name: "Link", icon: LinkIcon, type: "link" },
  { id: "social", name: "Social", icon: Instagram, type: "social" },
  { id: "music", name: "Music", icon: Music, type: "music" },
  { id: "video", name: "Video", icon: Video, type: "video" },
  { id: "image", name: "Image", icon: ImageIcon, type: "image" },
  { id: "contact", name: "Contact", icon: Mail, type: "contact" },
  { id: "event", name: "Event", icon: Calendar, type: "event" },
  { id: "gallery", name: "Gallery", icon: ImageIcon, type: "gallery" },
]

const socialIcons = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  github: Github,
  globe: Globe,
}

export default function LinkBuilder3() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [previewMode, setPreviewMode] = useState<"mobile" | "tablet" | "desktop">("mobile")
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [templatesOpen, setTemplatesOpen] = useState(true)
  const [componentsOpen, setComponentsOpen] = useState(true)
  const [playingMusic, setPlayingMusic] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false)
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop")

  // Responsive hook
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setScreenSize("mobile")
        setSidebarCollapsed(true)
      } else if (width < 1024) {
        setScreenSize("tablet")
        setSidebarCollapsed(false)
      } else {
        setScreenSize("desktop")
        setSidebarCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const [profile, setProfile] = useState<ProfileData>({
    name: "Alex Johnson",
    bio: "Digital Creator & Music Producer",
    avatar: "/placeholder.svg?height=120&width=120",
    username: "alexjohnson",
    coverImage: "/placeholder.svg?height=200&width=400",
  })

  const [links, setLinks] = useState<LinkItem[]>([
    {
      id: "1",
      type: "music",
      title: "Latest Track - Midnight Vibes",
      url: "https://spotify.com/track/123",
      color: "#1db954",
      visible: true,
      style: "gradient",
      metadata: {
        artist: "Alex Johnson",
        duration: "3:42",
        thumbnail: "/placeholder.svg?height=60&width=60",
      },
    },
    {
      id: "2",
      type: "video",
      title: "Behind the Scenes",
      url: "https://youtube.com/watch?v=123",
      color: "#ff0000",
      visible: true,
      style: "default",
      metadata: {
        thumbnail: "/placeholder.svg?height=120&width=200",
        duration: "5:23",
        description: "Creating my latest music video",
      },
    },
    {
      id: "3",
      type: "social",
      title: "Follow on Instagram",
      url: "https://instagram.com/alexjohnson",
      icon: "instagram",
      color: "#e1306c",
      visible: true,
      style: "fill",
    },
    {
      id: "4",
      type: "event",
      title: "Live Concert - NYC",
      url: "https://tickets.com/alex-concert",
      color: "#8b5cf6",
      visible: true,
      style: "neon",
      metadata: {
        date: "Dec 15, 2024",
        location: "Madison Square Garden",
        description: "Don't miss the biggest show of the year!",
      },
    },
    {
      id: "5",
      type: "gallery",
      title: "Photo Gallery",
      url: "#gallery",
      color: "#f59e0b",
      visible: true,
      style: "default",
      metadata: {
        images: [
          "/placeholder.svg?height=80&width=80",
          "/placeholder.svg?height=80&width=80",
          "/placeholder.svg?height=80&width=80",
          "/placeholder.svg?height=80&width=80",
        ],
      },
    },
  ])

  const [theme, setTheme] = useState<ThemeSettings>({
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    backgroundType: "gradient",
    primaryColor: "#3b82f6",
    textColor: "#ffffff",
    fontFamily: "Inter",
    borderRadius: 16,
    cardStyle: "glass",
    layout: "stack",
  })

  const addComponent = (type: string) => {
    const componentDefaults = {
      link: { title: "New Link", url: "https://example.com" },
      social: { title: "Social Link", url: "https://social.com", icon: "globe" },
      music: {
        title: "New Track",
        url: "https://spotify.com",
        metadata: { artist: "Artist", duration: "3:00", thumbnail: "/placeholder.svg?height=60&width=60" },
      },
      video: {
        title: "New Video",
        url: "https://youtube.com",
        metadata: { duration: "2:30", thumbnail: "/placeholder.svg?height=120&width=200" },
      },
      image: { title: "Image", url: "/placeholder.svg?height=200&width=300" },
      contact: { title: "Contact Me", url: "mailto:contact@example.com" },
      event: {
        title: "New Event",
        url: "https://event.com",
        metadata: { date: "TBD", location: "Location TBD" },
      },
      gallery: {
        title: "Gallery",
        url: "#gallery",
        metadata: { images: ["/placeholder.svg?height=80&width=80"] },
      },
    }

    const defaults = componentDefaults[type as keyof typeof componentDefaults] || componentDefaults.link

    const newItem: LinkItem = {
      id: Date.now().toString(),
      type: type as LinkItem["type"],
      color: theme.primaryColor,
      visible: true,
      style: "default",
      ...defaults,
    }
    setLinks([...links, newItem])
    setMobileMenuOpen(false) // Close mobile menu after adding
  }

  const updateLink = (id: string, updates: Partial<LinkItem>) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, ...updates } : link)))
  }

  const deleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id))
    if (selectedElement === id) {
      setSelectedElement(null)
    }
  }

  const applyTemplate = (templateId: string) => {
    const templateStyles = {
      minimal: {
        backgroundColor: "#ffffff",
        backgroundType: "solid" as const,
        primaryColor: "#000000",
        textColor: "#1f2937",
        cardStyle: "minimal" as const,
      },
      dark: {
        backgroundColor: "#111827",
        backgroundType: "solid" as const,
        primaryColor: "#3b82f6",
        textColor: "#f9fafb",
        cardStyle: "default" as const,
      },
      gradient: {
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundType: "gradient" as const,
        primaryColor: "#ffffff",
        textColor: "#ffffff",
        cardStyle: "glass" as const,
      },
      neon: {
        backgroundColor: "#000000",
        backgroundType: "solid" as const,
        primaryColor: "#00ff88",
        textColor: "#00ff88",
        cardStyle: "default" as const,
      },
      glassmorphism: {
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundType: "gradient" as const,
        primaryColor: "#ffffff",
        textColor: "#ffffff",
        cardStyle: "glass" as const,
      },
    }

    const template = templateStyles[templateId as keyof typeof templateStyles]
    if (template) {
      setTheme({ ...theme, ...template })
    }
    setMobileMenuOpen(false) // Close mobile menu after applying template
  }

  const getBackgroundStyle = () => {
    if (theme.backgroundType === "gradient") {
      return { background: theme.backgroundColor }
    }
    return { backgroundColor: theme.backgroundColor }
  }

  const getSelectedElement = () => {
    return links.find((link) => link.id === selectedElement)
  }

  const getPreviewSize = () => {
    switch (previewMode) {
      case "mobile":
        return screenSize === "mobile" ? "w-full max-w-[320px] h-[568px]" : "w-[375px] h-[667px]"
      case "tablet":
        return screenSize === "mobile" ? "w-full max-w-[400px] h-[600px]" : "w-[768px] h-[1024px]"
      case "desktop":
        return "w-full max-w-md h-full min-h-[600px]"
      default:
        return "w-[375px] h-[667px]"
    }
  }

  const renderComponent = (link: LinkItem) => {
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
                  src={link.metadata?.thumbnail || "/placeholder.svg"}
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
                src={link.metadata?.thumbnail || "/placeholder.svg"}
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
                  src={img || "/placeholder.svg"}
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
        // Default link and social components
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

  // Mobile Sidebar Component
  const MobileSidebar = () => (
    <div className="p-4 space-y-4">
      {/* Templates Section */}
      <Collapsible open={templatesOpen} onOpenChange={setTemplatesOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-2">
            <div className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              <span className="font-medium">Templates</span>
            </div>
            <ChevronRight className={`h-4 w-4 transition-transform ${templatesOpen ? "rotate-90" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          <div className="grid grid-cols-2 gap-2">
            {templates.map((template) => (
              <Button
                key={template.id}
                variant="outline"
                className="h-16 p-2 flex flex-col gap-1 bg-transparent"
                onClick={() => applyTemplate(template.id)}
              >
                <div className={`w-full h-6 rounded text-xs flex items-center justify-center ${template.preview}`}>
                  {template.name}
                </div>
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Components Section */}
      <Collapsible open={componentsOpen} onOpenChange={setComponentsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-2">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="font-medium">Components</span>
            </div>
            <ChevronRight className={`h-4 w-4 transition-transform ${componentsOpen ? "rotate-90" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          <div className="grid grid-cols-2 gap-2">
            {components.map((component) => (
              <Button
                key={component.id}
                variant="outline"
                className="h-16 p-2 flex flex-col gap-1 bg-transparent"
                onClick={() => addComponent(component.type)}
              >
                <component.icon className="h-5 w-5" />
                <span className="text-xs">{component.name}</span>
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )

  // Settings Panel Component
  const SettingsPanel = () => (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-4 w-4" />
        <h2 className="font-semibold">Settings</h2>
      </div>

      {selectedElement ? (
        /* Element Settings */
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Element Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const element = getSelectedElement()
                if (!element) return null

                return (
                  <>
                    <div>
                      <Label className="text-xs">Title</Label>
                      <Input
                        value={element.title}
                        onChange={(e) => updateLink(element.id, { title: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">URL</Label>
                      <Input
                        value={element.url}
                        onChange={(e) => updateLink(element.id, { url: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Color</Label>
                      <Input
                        type="color"
                        value={element.color}
                        onChange={(e) => updateLink(element.id, { color: e.target.value })}
                        className="h-10 w-full p-1 mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Style</Label>
                      <Select
                        value={element.style}
                        onValueChange={(value: "default" | "outline" | "fill" | "gradient" | "neon") =>
                          updateLink(element.id, { style: value })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="outline">Outline</SelectItem>
                          <SelectItem value="fill">Fill</SelectItem>
                          <SelectItem value="gradient">Gradient</SelectItem>
                          <SelectItem value="neon">Neon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Type-specific settings */}
                    {element.type === "music" && (
                      <>
                        <div>
                          <Label className="text-xs">Artist</Label>
                          <Input
                            value={element.metadata?.artist || ""}
                            onChange={(e) =>
                              updateLink(element.id, {
                                metadata: { ...element.metadata, artist: e.target.value },
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Duration</Label>
                          <Input
                            value={element.metadata?.duration || ""}
                            onChange={(e) =>
                              updateLink(element.id, {
                                metadata: { ...element.metadata, duration: e.target.value },
                              })
                            }
                            className="mt-1"
                            placeholder="3:42"
                          />
                        </div>
                      </>
                    )}

                    {element.type === "event" && (
                      <>
                        <div>
                          <Label className="text-xs">Date</Label>
                          <Input
                            value={element.metadata?.date || ""}
                            onChange={(e) =>
                              updateLink(element.id, {
                                metadata: { ...element.metadata, date: e.target.value },
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Location</Label>
                          <Input
                            value={element.metadata?.location || ""}
                            onChange={(e) =>
                              updateLink(element.id, {
                                metadata: { ...element.metadata, location: e.target.value },
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                      </>
                    )}

                    {element.type === "social" && (
                      <div>
                        <Label className="text-xs">Social Platform</Label>
                        <Select
                          value={element.icon || "globe"}
                          onValueChange={(value) => updateLink(element.id, { icon: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="github">GitHub</SelectItem>
                            <SelectItem value="globe">Website</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Visible</Label>
                      <Switch
                        checked={element.visible}
                        onCheckedChange={(checked) => updateLink(element.id, { visible: checked })}
                      />
                    </div>

                    <Button variant="destructive" size="sm" onClick={() => deleteLink(element.id)} className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Element
                    </Button>
                  </>
                )
              })()}
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Global Settings */
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="text-xs">
              Profile
            </TabsTrigger>
            <TabsTrigger value="theme" className="text-xs">
              Theme
            </TabsTrigger>
            <TabsTrigger value="layout" className="text-xs">
              Layout
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">Username</Label>
                  <Input
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Display Name</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Bio</Label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-xs">Avatar URL</Label>
                  <Input
                    value={profile.avatar}
                    onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Cover Image URL</Label>
                  <Input
                    value={profile.coverImage || ""}
                    onChange={(e) => setProfile({ ...profile, coverImage: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theme" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Theme Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">Background Color</Label>
                  <Input
                    type="color"
                    value={theme.backgroundColor.startsWith("#") ? theme.backgroundColor : "#ffffff"}
                    onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })}
                    className="h-10 w-full p-1 mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Text Color</Label>
                  <Input
                    type="color"
                    value={theme.textColor}
                    onChange={(e) => setTheme({ ...theme, textColor: e.target.value })}
                    className="h-10 w-full p-1 mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Primary Color</Label>
                  <Input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                    className="h-10 w-full p-1 mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Card Style</Label>
                  <Select
                    value={theme.cardStyle}
                    onValueChange={(value: "default" | "glass" | "minimal" | "neumorphism") =>
                      setTheme({ ...theme, cardStyle: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="glass">Glass</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="neumorphism">Neumorphism</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Layout Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">Border Radius</Label>
                  <Slider
                    value={[theme.borderRadius]}
                    onValueChange={(value) => setTheme({ ...theme, borderRadius: value[0] })}
                    max={24}
                    step={1}
                    className="mt-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">{theme.borderRadius}px</div>
                </div>

                <div>
                  <Label className="text-xs">Font Family</Label>
                  <Select value={theme.fontFamily} onValueChange={(value) => setTheme({ ...theme, fontFamily: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs">Layout Style</Label>
                  <Select
                    value={theme.layout}
                    onValueChange={(value: "stack" | "grid" | "masonry") => setTheme({ ...theme, layout: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stack">Stack</SelectItem>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="masonry">Masonry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="flex h-12 sm:h-14 items-center px-2 sm:px-4">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile Menu Button */}
              {screenSize === "mobile" ? (
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <ScrollArea className="h-full">
                      <MobileSidebar />
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                  {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
              )}
              <h1 className="text-sm sm:text-lg font-semibold">Page Builder</h1>
            </div>

            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <Badge variant="secondary" className="font-mono text-xs hidden sm:inline-flex">
                linktr.ee/{profile.username}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard.writeText(`https://linktr.ee/${profile.username}`)}
                className="hidden sm:inline-flex"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-4 sm:h-6 hidden sm:block" />

              {/* Mobile Settings Button */}
              {screenSize === "mobile" && (
                <Sheet open={settingsPanelOpen} onOpenChange={setSettingsPanelOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 p-0">
                    <ScrollArea className="h-full">
                      <SettingsPanel />
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              )}

              <Button variant="outline" size="sm" className="hidden sm:inline-flex bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Save className="h-3 h-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button size="sm">
                <Upload className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Publish</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-3rem)] sm:h-[calc(100vh-3.5rem)]">
          {/* Left Sidebar - Desktop Only */}
          {screenSize !== "mobile" && (
            <div
              className={`border-r bg-muted/50 transition-all duration-300 ${sidebarCollapsed ? "w-0" : "w-64 lg:w-80"} overflow-hidden`}
            >
              <ScrollArea className="h-full">
                <MobileSidebar />
              </ScrollArea>
            </div>
          )}

          {/* Main Preview Canvas */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Canvas Header */}
            <div className="border-b bg-background p-2 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button
                    variant={previewMode === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("mobile")}
                    className="text-xs sm:text-sm"
                  >
                    <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Mobile</span>
                  </Button>
                  <Button
                    variant={previewMode === "tablet" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("tablet")}
                    className="text-xs sm:text-sm"
                  >
                    <Tablet className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Tablet</span>
                  </Button>
                  <Button
                    variant={previewMode === "desktop" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("desktop")}
                    className="text-xs sm:text-sm"
                  >
                    <Monitor className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Desktop</span>
                  </Button>
                </div>
                <Badge variant="outline" className="text-xs">
                  Live Preview
                </Badge>
              </div>
            </div>

            {/* Canvas Content */}
            <div className="flex-1 bg-muted/30 p-2 sm:p-4 lg:p-8 overflow-auto">
              <div className="flex justify-center">
                <div
                  className={`
                    transition-all duration-300 shadow-2xl border
                    ${getPreviewSize()}
                    ${
                      previewMode === "mobile" && screenSize !== "mobile"
                        ? "rounded-[2.5rem] border-8 border-gray-800"
                        : previewMode === "tablet"
                          ? "rounded-[1.5rem] border-4 border-gray-700"
                          : "rounded-lg border-gray-200"
                    }
                    overflow-hidden relative
                  `}
                >
                  {/* Phone/Tablet Frame Elements */}
                  {previewMode === "mobile" && screenSize !== "mobile" && (
                    <>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-10"></div>
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full z-10"></div>
                    </>
                  )}

                  {previewMode === "tablet" && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full z-10"></div>
                  )}

                  {/* Page Content */}
                  <div className="w-full h-full overflow-y-auto" style={getBackgroundStyle()}>
                    <div className="relative">
                      {/* Cover Image */}
                      {profile.coverImage && (
                        <div className="relative h-24 sm:h-32 overflow-hidden">
                          <img
                            src={profile.coverImage || "/placeholder.svg"}
                            alt="Cover"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                      )}

                      <div className="px-4 sm:px-6 py-6 sm:py-8">
                        {/* Profile Section */}
                        <div className="text-center mb-6 sm:mb-8">
                          <div className="relative inline-block mb-3 sm:mb-4">
                            <img
                              src={profile.avatar || "/placeholder.svg"}
                              alt={profile.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/30 shadow-xl"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <h1 className="text-lg sm:text-xl font-bold mb-2" style={{ color: theme.textColor }}>
                            {profile.name}
                          </h1>
                          <p className="text-xs sm:text-sm opacity-80 mb-3 sm:mb-4" style={{ color: theme.textColor }}>
                            {profile.bio}
                          </p>
                          <div className="flex justify-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="text-xs">
                              🎵 Music Producer
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              ✨ Creator
                            </Badge>
                          </div>
                        </div>

                        {/* Components */}
                        <div className="space-y-3 sm:space-y-4">
                          {links.filter((link) => link.visible).map((link) => renderComponent(link))}
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20">
                          <p className="text-xs opacity-60" style={{ color: theme.textColor }}>
                            Made with ❤️ using PageBuilder
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Settings Panel - Desktop/Tablet Only */}
          {screenSize !== "mobile" && (
            <div className="w-64 lg:w-80 border-l bg-background">
              <ScrollArea className="h-full">
                <SettingsPanel />
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
