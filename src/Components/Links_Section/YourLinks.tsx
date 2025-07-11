"use client"
import { Edit3, ExternalLink, Filter, MoreVertical, MousePointer, Plus, Search, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogDescription, DialogFooter } from '@/Components/ui/dialog'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'




const linksData = [
    {
        id: 1,
        title: "My Portfolio Website",
        url: "https://alexjohnson.dev",
        clicks: 2341,
        active: true,
        thumbnail: "🌐",
        color: "bg-blue-500",
    },
    {
        id: 2,
        title: "Instagram Profile",
        url: "https://instagram.com/alexj",
        clicks: 1892,
        active: true,
        thumbnail: "📸",
        color: "bg-pink-500",
    },
    {
        id: 3,
        title: "YouTube Channel",
        url: "https://youtube.com/alexjohnson",
        clicks: 1567,
        active: true,
        thumbnail: "🎥",
        color: "bg-red-500",
    },
    {
        id: 4,
        title: "Latest Blog Post",
        url: "https://blog.alexjohnson.dev/latest",
        clicks: 987,
        active: true,
        thumbnail: "📝",
        color: "bg-green-500",
    },
    {
        id: 5,
        title: "Twitter Profile",
        url: "https://twitter.com/alexj",
        clicks: 876,
        active: false,
        thumbnail: "🐦",
        color: "bg-sky-500",
    },
    {
        id: 6,
        title: "LinkedIn Profile",
        url: "https://linkedin.com/in/alexj",
        clicks: 654,
        active: true,
        thumbnail: "💼",
        color: "bg-blue-600",
    },
]


function YourLinks() {

    const [links, setLinks] = React.useState(linksData)
    const [isAddLinkOpen, setIsAddLinkOpen] = React.useState(false)
    const [newLink, setNewLink] = React.useState({ title: "", url: "", thumbnail: "", color: "bg-blue-500" })

    const handleAddLink = () => {
        if (newLink.title && newLink.url) {
            const link = {
                id: Date.now(),
                title: newLink.title,
                url: newLink.url,
                clicks: 0,
                active: true,
                thumbnail: newLink.thumbnail || "🔗",
                color: newLink.color,
            }
            setLinks([...links, link])
            setNewLink({ title: "", url: "", thumbnail: "", color: "bg-blue-500" })
            setIsAddLinkOpen(false)
        }
    }

    const toggleLinkStatus = (id: number) => {
        setLinks(links.map((link) => (link.id === id ? { ...link, active: !link.active } : link)))
    }

    const deleteLink = (id: number) => {
        setLinks(links.filter((link) => link.id !== id))
    }

    return (
        <div className="rounded-2xl shadow-sm border border-primary-foreground p-6  bg-[var(--secondary)]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-semibold text-foreground">Your Links</h3>
                    <p className="text-gray-500 mt-1">Manage and organize your links</p>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4 text-gray-400" />
                        <Input placeholder="Search links..." className="w-64" />
                    </div>
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Dialog open={isAddLinkOpen} onOpenChange={setIsAddLinkOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Link
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Link</DialogTitle>
                                <DialogDescription>Create a new link to add to your profile.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={newLink.title}
                                        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                        placeholder="Enter link title"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="url">URL</Label>
                                    <Input
                                        id="url"
                                        value={newLink.url}
                                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="thumbnail">Icon (Emoji)</Label>
                                    <Input
                                        id="thumbnail"
                                        value={newLink.thumbnail}
                                        onChange={(e) => setNewLink({ ...newLink, thumbnail: e.target.value })}
                                        placeholder="🔗"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddLink}>Add Link</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {links.map((link) => (
                    <Card
                        key={link.id}
                        className={`hover:shadow-md transition-all duration-200 ${!link.active ? "opacity-60" : ""}`}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center text-white text-lg`}
                                    >
                                        {link.thumbnail}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-secondary-foreground truncate">{link.title}</h4>
                                        <p className="text-sm text-gray-500 truncate">{link.url}</p>
                                    </div>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Edit3 className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Visit
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600" onClick={() => deleteLink(link.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                                        <MousePointer className="h-4 w-4" />
                                        <span>{link.clicks.toLocaleString()}</span>
                                    </div>
                                    <Badge variant={link.active ? "default" : "secondary"}>
                                        {link.active ? "Active" : "Inactive"}
                                    </Badge>
                                </div>

                                <Button variant="ghost" size="sm" onClick={() => toggleLinkStatus(link.id)} className="h-8 w-8 p-0">
                                    {link.active ? (
                                        <ToggleRight className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <ToggleLeft className="h-5 w-5 text-gray-400" />
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default YourLinks
