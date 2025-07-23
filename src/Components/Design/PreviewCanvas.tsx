"use client"
import { Button } from "@/Components/ui/button"
import { Badge } from "../ui/badge"
import type React from "react"

import { Smartphone, Tablet, Monitor, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import type { PreviewMode, ScreenSize, ProfileData, ThemeSettings, LinkItem } from "../../types"
import { useCallback, useEffect, useState } from "react"

interface PreviewCanvasProps {
    previewMode: PreviewMode
    setPreviewMode: (mode: PreviewMode) => void
    screenSize: ScreenSize
    profile: ProfileData
    theme: ThemeSettings
    links: LinkItem[]
    renderComponent: (link: LinkItem) => React.ReactNode
    setSelectedElement: () => void
}

export function PreviewCanvas({
    previewMode,
    setPreviewMode,
    screenSize,
    profile,
    theme,
    links,
    renderComponent,
    setSelectedElement
}: PreviewCanvasProps) {
    const [zoomLevel, setZoomLevel] = useState(1)
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
    const [isRotated, setIsRotated] = useState(false)



    const handleZoomIn = useCallback(() => {
        setZoomLevel((prev) => Math.min(3, prev + 0.1))
    }, [])

    const handleZoomOut = useCallback(() => {
        setZoomLevel((prev) => Math.max(0.3, prev - 0.1))
    }, [])

    const handleZoomReset = useCallback(() => {
        setZoomLevel(1)
        setPanOffset({ x: 0, y: 0 })
    }, [])

    useEffect(() => {
        if (zoomLevel === 1) {
            setPanOffset({ x: 0, y: 0 })
        }
        setIsRotated(false)
    }, [zoomLevel, previewMode, isRotated])


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

    const getBackgroundStyle = () => {
        if (theme.backgroundType === "gradient") {
            return { background: theme.backgroundColor }
        }
        return { backgroundColor: theme.backgroundColor }
    }

    return (
        <div className="flex-1 flex flex-col min-w-0">
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
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Button variant="ghost" size="sm" onClick={handleZoomOut} className="text-xs sm:text-sm">
                            <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleZoomReset}
                            className="text-xs text-muted-foreground min-w-[3rem] hover:bg-muted transition-colors bg-transparent"
                            title="Reset zoom and pan"
                        >
                            {Math.round(zoomLevel * 100)}%
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleZoomIn} className="text-xs sm:text-sm">
                            <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4 " />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleZoomReset} className="text-xs sm:text-sm">
                            <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                    </div>
                    <Badge variant="outline" className="text-xs">
                        Live Preview
                    </Badge>
                </div>
            </div>
            <div
                className="flex-1 bg-muted/30 p-2 sm:p-4 lg:p-8 overflow-auto"

            >
                <div className="flex justify-center">
                    <div
                        className={`
                            transition-all duration-300 shadow-2xl border
                            ${getPreviewSize()}
                            ${previewMode === "mobile" && screenSize !== "mobile"
                                ? "rounded-[2.5rem] border-8 border-gray-800"
                                : previewMode === "tablet"
                                    ? "rounded-[1.5rem] border-4 border-gray-700"
                                    : "rounded-lg border-gray-200"
                            }
                            overflow-hidden relative
                        `}
                        style={{
                            transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                            transformOrigin: "center center",
                        }}
                    >
                        {previewMode === "mobile" && screenSize !== "mobile" && (
                            <>
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-10"></div>
                                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full z-10"></div>
                            </>
                        )}
                        {previewMode === "tablet" && (
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full z-10 px-100"></div>
                        )}
                        <div className="w-full h-full overflow-y-auto" style={getBackgroundStyle()}>
                            <div className="relative">
                                <div className="px-4 sm:px-6 py-6 sm:py-8">
                                    <div className="text-center mb-6 sm:mb-8">
                                        <div className="relative inline-block mb-3 sm:mb-4">
                                            <img
                                                src={profile.avatar || "https://images.unsplash.com/photo-1744878150591-6ebf3a050d4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"}
                                                alt={profile.name}
                                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/30 shadow-xl"

                                                onClick={() => { setSelectedElement() }}
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white"></div>
                                        </div>
                                        <h1 className="text-lg sm:text-xl font-bold mb-2" style={{ color: theme.textColor }}
                                            onClick={() => { setSelectedElement() }}
                                        >
                                            {profile.name}
                                        </h1>
                                        <p className="text-xs sm:text-sm opacity-80 mb-3 sm:mb-4" style={{ color: theme.textColor }}
                                            onClick={() => { setSelectedElement() }}
                                        >
                                            {profile.bio}
                                        </p>
                                        <div className="flex justify-center gap-2 flex-wrap"
                                            onClick={() => { setSelectedElement() }}
                                        >
                                            <Badge variant="secondary" className="text-xs">
                                                🎵 Music Producer
                                            </Badge>
                                            <Badge variant="secondary" className="text-xs">
                                                ✨ Creator
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-3 sm:space-y-4">
                                        {links.filter((link) => link.visible).map((link) => renderComponent(link))}
                                    </div>
                                    <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20"
                                        onClick={() => { setSelectedElement() }}
                                    >
                                        <p className="text-xs opacity-60" style={{ color: theme.textColor }}>
                                            Made with ❤️ using linkForge
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
