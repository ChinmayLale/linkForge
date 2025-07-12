"use client"
import React from 'react'
import { ArrowLeft, TrendingUp, TrendingDown, MousePointer, Eye, Users, Download, MoreVertical } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"

const linkPerformance = [
    {
        id: 1,
        title: "My Portfolio Website",
        url: "https://alexjohnson.dev",
        clicks: 2341,
        views: 3200,
        clickRate: 73.2,
        thumbnail: "🌐",
        color: "bg-blue-500",
        change: 15.3,
    },
    {
        id: 2,
        title: "Instagram Profile",
        url: "https://instagram.com/alexj",
        clicks: 1892,
        views: 2800,
        clickRate: 67.6,
        thumbnail: "📸",
        color: "bg-pink-500",
        change: 8.7,
    },
    {
        id: 3,
        title: "YouTube Channel",
        url: "https://youtube.com/alexjohnson",
        clicks: 1567,
        views: 2100,
        clickRate: 74.6,
        thumbnail: "🎥",
        color: "bg-red-500",
        change: -3.2,
    },
    {
        id: 4,
        title: "Latest Blog Post",
        url: "https://blog.alexjohnson.dev/latest",
        clicks: 987,
        views: 1500,
        clickRate: 65.8,
        thumbnail: "📝",
        color: "bg-green-500",
        change: 22.1,
    },
    {
        id: 5,
        title: "Latest Blog Post",
        url: "https://blog.alexjohnson.dev/latest",
        clicks: 987,
        views: 1500,
        clickRate: 65.8,
        thumbnail: "📝",
        color: "bg-green-500",
        change: 22.1,
    },
    {
        id: 6,
        title: "Latest Blog Post",
        url: "https://blog.alexjohnson.dev/latest",
        clicks: 987,
        views: 1500,
        clickRate: 65.8,
        thumbnail: "📝",
        color: "bg-green-500",
        change: 22.1,
    },
]

function LinkPerformanceSection() {
    return (
        <div className="w-full max-h-full" >
            <Card className='w-full h-full bg-background max-h-full'>
                <CardHeader>
                    <CardTitle>Individual Link Performance</CardTitle>
                    <CardDescription>Detailed analytics for each of your links</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {linkPerformance.map((link) => (
                            <Card key={link.id} className="p-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                                        <div
                                            className={`w-10 h-10 sm:w-12 sm:h-12 ${link.color} rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0`}
                                        >
                                            {link.thumbnail}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-medium truncate">{link.title}</h4>
                                            <p className="text-sm text-gray-500 truncate">{link.url}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 sm:space-x-8 w-full sm:w-auto justify-between sm:justify-end">
                                        <div className="text-center">
                                            <div className="text-base sm:text-lg font-bold">{link.views.toLocaleString()}</div>
                                            <div className="text-xs text-gray-500">Views</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-base sm:text-lg font-bold">{link.clicks.toLocaleString()}</div>
                                            <div className="text-xs text-gray-500">Clicks</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-base sm:text-lg font-bold">{link.clickRate}%</div>
                                            <div className="text-xs text-gray-500">CTR</div>
                                        </div>
                                        <div className="text-center">
                                            <div
                                                className={`text-base sm:text-lg font-bold ${link.change > 0 ? "text-green-600" : "text-red-600"}`}
                                            >
                                                {link.change > 0 ? "+" : ""}
                                                {link.change}%
                                            </div>
                                            <div className="text-xs text-gray-500">Change</div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Export Data</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LinkPerformanceSection
