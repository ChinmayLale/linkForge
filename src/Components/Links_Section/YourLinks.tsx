"use client";
import {
  Edit3,
  ExternalLink,
  Filter,
  MoreVertical,
  MousePointer,
  Plus,
  Search,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import React from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { LinkItem } from "@/types";
import { addLink } from "@/store/slices/linkSlice";
import LinkCardSkeleton from "@/Components/misc/LinkCardSkeleton";
import file from "../../../public/file.svg";
import Image from "next/image";

function YourLinks() {
  const [isAddLinkOpen, setIsAddLinkOpen] = React.useState(false);
  const [newLink, setNewLink] = React.useState({
    title: "",
    url: "",
    thumbnail: "",
    color: "bg-blue-500",
  });

  const { links, loading } = useSelector((state: RootState) => state.link);
  const dispatch = useDispatch();

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      const newLink: LinkItem = {
        id: "6",
        type: "music",
        title: "New Track - Chill Vibes",
        url: "https://spotify.com/track/abc123",
        color: "#1db954",
        active: true,
        style: "fill",
        metadata: {
          artist: "Alex Johnson",
          duration: "3:21",
          thumbnail: "https://example.com/thumbnail.jpg",
        },
        clicks: 0, // Optional clicks count for analytics
        thumbnail: "https://avatar.iran.liara.run/public/job/operator/male", // Default thumbnail if not provided
      };

      dispatch(addLink(newLink));
      // setLinks([...links, link])
      setNewLink({ title: "", url: "", thumbnail: "", color: "bg-blue-500" });
      setIsAddLinkOpen(false);
    }
  };

  const toggleLinkStatus = (id: string) => {
    // setLinks(links.map((link) => (link.id === id ? { ...link, active: !link.active } : link)))
    console.log("Toggle Link Status Called for ID:", id);
  };

  const deleteLink = (id: string) => {
    console.log("Delete Link For ID:", id);
  };

  if (loading) {
    return (
      <div className="rounded-2xl shadow-sm border border-primary-foreground p-6 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <LinkCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl shadow-sm border border-primary-foreground p-6  bg-background">
      <div className="flex md:flex-row flex-col md:items-center md:justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Your Links</h3>
          <p className="text-gray-500 mt-1">Manage and organize your links</p>
        </div>

        <div className="flex md:flex-row flex-col md:m-0 mt-2 items-start space-x-2 ">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input placeholder="Search links..." className="w-64" />
          </div>
          <div className="flex flex-row md:m-0 mt-2 md:items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Dialog open={isAddLinkOpen} onOpenChange={setIsAddLinkOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4" />
                  Add Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Link</DialogTitle>
                  <DialogDescription>
                    Create a new link to add to your profile.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newLink.title}
                      onChange={(e) =>
                        setNewLink({ ...newLink, title: e.target.value })
                      }
                      placeholder="Enter link title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      value={newLink.url}
                      onChange={(e) =>
                        setNewLink({ ...newLink, url: e.target.value })
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="thumbnail">Icon (Emoji)</Label>
                    <Input
                      id="thumbnail"
                      value={newLink.thumbnail}
                      onChange={(e) =>
                        setNewLink({ ...newLink, thumbnail: e.target.value })
                      }
                      placeholder="🔗"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="default" size="sm" onClick={handleAddLink}>
                    Add Link
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Card
            key={link.id}
            className={`hover:shadow-md transition-all duration-200 ${
              !link.active ? "opacity-60" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center text-white text-lg`}
                  >
                    <Image
                      src={link.thumbnail || link.images?.[0] || file}
                      alt={link.title}
                      width={40}
                      height={40}
                      className="rounded-lg h-full max-w-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-secondary-foreground truncate">
                      {link.title}
                    </h4>
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
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => deleteLink(link.id)}
                    >
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
                    <span>{link?.clicks?.toLocaleString()}</span>
                  </div>
                  <Badge variant={link.active ? "default" : "secondary"}>
                    {link.active ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleLinkStatus(link.id)}
                  className="h-8 w-8 p-0"
                >
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
  );
}

export default YourLinks;
