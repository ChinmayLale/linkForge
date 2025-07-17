"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Layout,
  Type,
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
  Edit3,
  VideoIcon,
  SquareIcon,
  MusicIcon,
  Music2Icon,
  FileIcon,
  PhoneIcon,
  MapPinIcon,
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

interface LinkItem {
  id: string
  type: "link" | "social" | "image"
  title: string
  url: string
  icon?: string
  color: string
  visible: boolean
  style: "default" | "outline" | "fill"
}

interface ProfileData {
  name: string
  bio: string
  avatar: string
  username: string
}

interface ThemeSettings {
  backgroundColor: string
  backgroundType: "solid" | "gradient"
  primaryColor: string
  textColor: string
  fontFamily: string
  borderRadius: number
  cardStyle: "default" | "glass" | "minimal" | "bordered" | "soft" | "bubble" | "terminal"
}

const templates = [
  { id: "minimal", name: "Minimal", preview: "bg-white text-black" },
  { id: "dark", name: "Dark", preview: "bg-gray-900 text-white" },
  { id: "gradient", name: "Gradient", preview: "bg-gradient-to-br from-purple-500 to-pink-500 text-white" },
  { id: "neon", name: "Neon", preview: "bg-black text-green-400" },
  { id: "professional", name: "Professional", preview: "bg-white border text-neutral-800" },
  { id: "aesthetic", name: "Aesthetic", preview: "bg-beige text-brown" },
  { id: "creator", name: "Creator", preview: "bg-pink-100 text-purple-800" },
  { id: "hacker", name: "Hacker", preview: "bg-black text-green-500 font-mono" },
]

const components = [
  { id: "link", name: "Link", icon: LinkIcon, type: "link" },
  { id: "social", name: "Social", icon: Instagram, type: "social" },
  { id: "image", name: "Image", icon: ImageIcon, type: "image" },
  { id: "text", name: "Text", icon: Type, type: "text" },

  { id: "video", name: "Video", icon: VideoIcon, type: "video" },
  { id: "button", name: "Button", icon: SquareIcon, type: "button" },
  { id: "music", name: "Music", icon: MusicIcon, type: "music" },
  { id: "file", name: "File", icon: FileIcon, type: "file" },
  // { id: "form", name: "Form", icon: PencilIcon, type: "form" },
  { id: "contact", name: "Contact", icon: PhoneIcon, type: "contact" },
  // { id: "calendar", name: "Calendar", icon: CalendarIcon, type: "calendar" },
  { id: "map", name: "Map", icon: MapPinIcon, type: "map" },
]

const socialIcons = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  github: Github,
  globe: Globe,
}

export default function LinkBuilder() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile")
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [templatesOpen, setTemplatesOpen] = useState(true)
  const [componentsOpen, setComponentsOpen] = useState(true)

  const [profile, setProfile] = useState<ProfileData>({
    name: "Alex Johnson",
    bio: "Digital Creator & Entrepreneur",
    avatar: "/placeholder.svg?height=120&width=120",
    username: "alexjohnson",
  })

  const [links, setLinks] = useState<LinkItem[]>([
    {
      id: "1",
      type: "link",
      title: "My Portfolio",
      url: "https://alexjohnson.dev",
      color: "#3b82f6",
      visible: true,
      style: "default",
    },
    {
      id: "2",
      type: "social",
      title: "Instagram",
      url: "https://instagram.com/alexjohnson",
      icon: "instagram",
      color: "#e1306c",
      visible: true,
      style: "fill",
    },
    {
      id: "3",
      type: "link",
      title: "Latest Blog Post",
      url: "https://blog.alexjohnson.dev",
      color: "#10b981",
      visible: true,
      style: "outline",
    },
  ])

  const [theme, setTheme] = useState<ThemeSettings>({
    backgroundColor: "#ffffff",
    backgroundType: "solid",
    primaryColor: "#3b82f6",
    textColor: "#1f2937",
    fontFamily: "Inter",
    borderRadius: 12,
    cardStyle: "default",
  })

  const addComponent = (type: string) => {
    const newItem: LinkItem = {
      id: Date.now().toString(),
      type: type as "link" | "social" | "image",
      title: type === "link" ? "New Link" : type === "social" ? "Social Link" : "Image",
      url: "https://example.com",
      color: theme.primaryColor,
      visible: true,
      style: "default",
    }
    setLinks([...links, newItem])
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
      professional: {
        backgroundColor: "#ffffff",
        backgroundType: "solid" as const,
        primaryColor: "#1f2937",
        textColor: "#1f2937",
        cardStyle: "bordered" as const,
      },
      aesthetic: {
        backgroundColor: "#fdf6e3", // beige tone
        backgroundType: "solid" as const,
        primaryColor: "#7b3f00", // brown
        textColor: "#4b2e2e",
        cardStyle: "soft" as const,
      },
      creator: {
        backgroundColor: "#ffe4e6", // pink-100
        backgroundType: "solid" as const,
        primaryColor: "#7e22ce", // purple-800
        textColor: "#7e22ce",
        cardStyle: "bubble" as const,
      },
      hacker: {
        backgroundColor: "#000000",
        backgroundType: "solid" as const,
        primaryColor: "#00ff00",
        textColor: "#00ff00",
        cardStyle: "terminal" as const,
      },
    }

    const template = templateStyles[templateId as keyof typeof templateStyles]
    if (template) {
      setTheme({ ...theme, ...template })
    }
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

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
              <h1 className="text-lg font-semibold">Page Builder</h1>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs">
                linktr.ee/{profile.username}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard.writeText(`https://linktr.ee/${profile.username}`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Publish
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-3.5rem)]">
          {/* Left Sidebar */}
          <div
            className={`border-r bg-muted/50 transition-all duration-300 ${sidebarCollapsed ? "w-0" : "w-80"} overflow-hidden`}
          >
            <ScrollArea className="h-full">
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
                          <div
                            className={`w-full h-6 rounded text-xs flex items-center justify-center ${template.preview}`}
                          >
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

                <Separator />

                {/* Quick Settings */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Quick Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Background</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={theme.backgroundColor.startsWith("#") ? theme.backgroundColor : "#ffffff"}
                          onChange={(e) =>
                            setTheme({ ...theme, backgroundColor: e.target.value, backgroundType: "solid" })
                          }
                          className="h-8 w-16 p-1"
                        />
                        <Select
                          value={theme.backgroundType}
                          onValueChange={(value: "solid" | "gradient") => setTheme({ ...theme, backgroundType: value })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solid">Solid</SelectItem>
                            <SelectItem value="gradient">Gradient</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Primary Color</Label>
                      <Input
                        type="color"
                        value={theme.primaryColor}
                        onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                        className="h-8 w-full p-1 mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Main Preview Canvas */}
          <div className="flex-1 flex flex-col">
            {/* Canvas Header */}
            <div className="border-b bg-background p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant={previewMode === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("mobile")}
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Mobile
                  </Button>
                  <Button
                    variant={previewMode === "desktop" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("desktop")}
                  >
                    <Monitor className="h-4 w-4 mr-2" />
                    Desktop
                  </Button>
                </div>
                <Badge variant="outline">Live Preview</Badge>
              </div>
            </div>

            {/* Canvas Content */}
            <div className="flex-1 bg-muted/30 p-8 overflow-auto">
              <div className="flex justify-center">
                <div
                  className={`
                    transition-all duration-300 shadow-2xl border
                    ${previewMode === "mobile"
                      ? "w-[375px] h-[667px] rounded-[2.5rem] border-8 border-gray-800"
                      : "w-full max-w-md h-full min-h-[600px] rounded-lg border-gray-200"
                    }
                    overflow-hidden relative
                  `}
                >
                  {/* Phone Frame Elements */}
                  {previewMode === "mobile" && (
                    <>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-10"></div>
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full z-10"></div>
                    </>
                  )}

                  {/* Page Content */}
                  <div className="w-full h-full overflow-y-auto" style={getBackgroundStyle()}>
                    <div className="p-8 text-center">
                      {/* Profile Section */}
                      <div className="mb-8">
                        <img
                          src={profile.avatar || "/placeholder.svg"}
                          alt={profile.name}
                          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20 shadow-lg"
                        />
                        <h1 className="text-2xl font-bold mb-2" style={{ color: theme.textColor }}>
                          {profile.name}
                        </h1>
                        <p className="text-sm opacity-80" style={{ color: theme.textColor }}>
                          {profile.bio}
                        </p>
                      </div>

                      {/* Links */}
                      <div className="space-y-4">
                        {links
                          .filter((link) => link.visible)
                          .map((link) => {
                            const IconComponent = link.icon
                              ? socialIcons[link.icon as keyof typeof socialIcons]
                              : LinkIcon
                            return (
                              <div
                                key={link.id}
                                className={`
                                  group relative p-4 transition-all duration-200 cursor-pointer
                                  ${selectedElement === link.id ? "ring-2 ring-blue-500" : ""}
                                  ${theme.cardStyle === "glass"
                                    ? "backdrop-blur-sm bg-white/10 border border-white/20"
                                    : theme.cardStyle === "minimal"
                                      ? "border-2 border-current"
                                      : "bg-white/90 border border-gray-200 shadow-sm"
                                  }
                                  ${link.style === "outline"
                                    ? "bg-transparent border-2"
                                    : link.style === "fill"
                                      ? "text-white"
                                      : ""
                                  }
                                  hover:scale-105 hover:shadow-lg
                                `}
                                style={{
                                  borderRadius: `${theme.borderRadius}px`,
                                  backgroundColor:
                                    link.style === "fill"
                                      ? link.color
                                      : link.style === "outline"
                                        ? "transparent"
                                        : theme.cardStyle === "glass"
                                          ? "rgba(255,255,255,0.1)"
                                          : "rgba(255,255,255,0.9)",
                                  borderColor: link.style === "outline" ? link.color : "transparent",
                                  color:
                                    link.style === "fill"
                                      ? "white"
                                      : link.style === "outline"
                                        ? link.color
                                        : theme.textColor,
                                }}
                                onClick={() => setSelectedElement(link.id)}
                              >
                                <div className="flex items-center justify-center gap-3">
                                  {IconComponent && <IconComponent className="w-5 h-5" />}
                                  <span className="font-medium">{link.title}</span>
                                </div>

                                {/* Edit overlay */}
                                <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                  <Edit3 className="w-4 h-4 text-blue-600" />
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Settings Panel */}
          <div className="w-80 border-l bg-background">
            <ScrollArea className="h-full">
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
                                  onValueChange={(value: "default" | "outline" | "fill") =>
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
                                  </SelectContent>
                                </Select>
                              </div>

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

                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteLink(element.id)}
                                className="w-full"
                              >
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
                              onValueChange={(value: "default" | "glass" | "minimal") =>
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
                            <Select
                              value={theme.fontFamily}
                              onValueChange={(value) => setTheme({ ...theme, fontFamily: value })}
                            >
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
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
