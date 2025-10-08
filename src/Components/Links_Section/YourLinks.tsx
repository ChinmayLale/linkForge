"use client";
import {
  Edit3,
  ExternalLink,
  Filter,
  MoreVertical,
  Search,
  ToggleLeft,
  ToggleRight,
  Trash2,
  MousePointer2,
  Link,
} from "lucide-react";
import React from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
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
import LinkCardSkeleton from "@/Components/misc/LinkCardSkeleton";
// import file from "../../../public/file.svg";
import Image from "next/image";
import { setTabName, TabName } from "@/store/slices/navigationSlice";

function YourLinks() {
  const dispatch = useDispatch();
  const { links, loading } = useSelector((state: RootState) => state.link);

  const toggleLinkStatus = (id: string) => {
    console.log("Toggle Link Status Called for ID:", id);
  };

  const deleteLink = (id: string) => {
    console.log("Delete Link For ID:", id);
  };

  if (loading) {
    return (
      <div className="rounded-2xl shadow-sm border border-border/30 p-4 sm:p-6 bg-background/95">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <LinkCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl shadow-sm border border-border/30 p-4 sm:p-6 bg-background/95">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
            Your Links
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and organize your links
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search links..."
              className="pl-9 text-sm bg-background/50 border-border/30 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-border/50 hover:bg-accent/20"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            {/* Uncomment and implement Add Link Dialog if needed */}
            {/* <Button variant="default" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Link
            </Button> */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Card
            key={link.id}
            className={`group hover:shadow-md transition-all duration-200 border-border/30 bg-card/80 ${
              !link.active ? "opacity-60" : ""
            } rounded-lg overflow-hidden`}
          >
            <CardContent
              className="p-4"
              onClick={() => {
                dispatch(setTabName("Design" as TabName));
              }}
            >
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center text-white text-lg shrink-0`}
                  >
                    {link.images?.[0] || link.thumbnail ? (
                      <Image
                        src={link.images?.[0] || link.thumbnail || ""}
                        alt={link.title}
                        width={40}
                        height={40}
                        className="rounded-lg h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                        <Link className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-medium text-foreground truncate">
                      {link.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      {link.url}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-accent/20"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-card/95 border-border/30"
                  >
                    <DropdownMenuItem className="hover:bg-accent/20">
                      <Edit3 className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-accent/20">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 hover:bg-red-100/50"
                      onClick={() => deleteLink(link.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                    <MousePointer2 className="h-4 w-4" />
                    <span>{link?.clicks?.toLocaleString() || 0}</span>
                  </div>
                  <Badge
                    variant={link.active ? "default" : "secondary"}
                    className="text-xs"
                  >
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
