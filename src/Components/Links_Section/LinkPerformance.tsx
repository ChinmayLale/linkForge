"use client";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  ExternalLink,
  Copy,
  Search,
  ArrowUpDown,
  MoreVertical,
  Share2,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

const linkPerformance = [
  {
    id: 1,
    title: "My Portfolio Website",
    url: "https://alexjohnson.dev",
    clicks: 2341,
    views: 3200,
    clickRate: 73.2,
    thumbnail: "🌐",
    category: "Portfolio",
    change: 15.3,
    trend: "up",
    conversionRate: 12.5,
    avgTimeOnPage: "2m 34s",
  },
  {
    id: 2,
    title: "Instagram Profile",
    url: "https://instagram.com/alexj",
    clicks: 1892,
    views: 2800,
    clickRate: 67.6,
    thumbnail: "📸",
    category: "Social",
    change: 8.7,
    trend: "up",
    conversionRate: 8.3,
    avgTimeOnPage: "1m 12s",
  },
  {
    id: 3,
    title: "YouTube Channel",
    url: "https://youtube.com/alexjohnson",
    clicks: 1567,
    views: 2100,
    clickRate: 74.6,
    thumbnail: "🎥",
    category: "Content",
    change: -3.2,
    trend: "down",
    conversionRate: 15.7,
    avgTimeOnPage: "4m 18s",
  },
  {
    id: 4,
    title: "Latest Blog Post",
    url: "https://blog.alexjohnson.dev/latest",
    clicks: 987,
    views: 1500,
    clickRate: 65.8,
    thumbnail: "📝",
    category: "Blog",
    change: 22.1,
    trend: "up",
    conversionRate: 9.2,
    avgTimeOnPage: "3m 45s",
  },
];

type LinkPerf = (typeof linkPerformance)[number];

const categories = Array.from(
  new Set(linkPerformance.map((l) => l.category))
).sort();

function LinkPerformanceSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "views" | "clicks" | "ctr" | "change" | "conversion"
  >("clicks");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = linkPerformance.filter((l) => {
    const matchesCategory = category === "all" || l.category === category;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      l.title.toLowerCase().includes(q) ||
      l.url.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    const val = (link: LinkPerf) => {
      if (sortBy === "views") return link.views;
      if (sortBy === "clicks") return link.clicks;
      if (sortBy === "ctr") return link.clickRate;
      if (sortBy === "change") return link.change;
      return link.conversionRate;
    };
    const diff = val(a) - val(b);
    return sortDir === "asc" ? diff : -diff;
  });

  return (
    <div className="w-full h-full">
      <Card className="w-full max-h-full bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="text-base font-semibold text-card-foreground">
                Link performance
              </div>
              <CardDescription className="text-muted-foreground">
                Search, filter, and sort to review engagement at a glance
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-transparent"
              >
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-transparent"
              >
                Share
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative md:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search links by title or URL"
                className="pl-9"
                aria-label="Search links"
              />
            </div>
            <div className="flex gap-3 md:ml-auto">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={`${sortBy}:${sortDir}`}
                onValueChange={(v) => {
                  const [by, dir] = v.split(":") as [
                    typeof sortBy,
                    typeof sortDir
                  ];
                  setSortBy(by);
                  setSortDir(dir);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <SelectValue placeholder="Sort" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clicks:desc">
                    Clicks • High → Low
                  </SelectItem>
                  <SelectItem value="clicks:asc">
                    Clicks • Low → High
                  </SelectItem>
                  <SelectItem value="views:desc">Views • High → Low</SelectItem>
                  <SelectItem value="views:asc">Views • Low → High</SelectItem>
                  <SelectItem value="ctr:desc">CTR • High → Low</SelectItem>
                  <SelectItem value="ctr:asc">CTR • Low → High</SelectItem>
                  <SelectItem value="change:desc">
                    Change • High → Low
                  </SelectItem>
                  <SelectItem value="change:asc">
                    Change • Low → High
                  </SelectItem>
                  <SelectItem value="conversion:desc">
                    Conversion • High → Low
                  </SelectItem>
                  <SelectItem value="conversion:asc">
                    Conversion • Low → High
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sorted.map((link, idx) => (
              <Card
                key={link.id}
                className="group hover:shadow-lg transition-all duration-300 border-border bg-background/60 backdrop-blur-sm"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0">
                        #{idx + 1}
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center text-lg border border-border/50 shrink-0">
                        {link.thumbnail}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-card-foreground truncate">
                            {link.title}
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-2xs px-2 py-0.5"
                          >
                            {link.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <ExternalLink className="h-3 w-3" />
                          <span className="truncate">{link.url}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Copy URL"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy URL
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center justify-center rounded-md bg-muted/30 p-3">
                      <div className="text-2xs text-muted-foreground">
                        Views
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <Eye className="h-3.5 w-3.5 text-chart-1" />
                        <div className="text-sm font-semibold">
                          {link.views.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-md bg-muted/30 p-3">
                      <div className="text-2xs text-muted-foreground">
                        Clicks
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <MousePointer className="h-3.5 w-3.5 text-chart-2" />
                        <div className="text-sm font-semibold">
                          {link.clicks.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-md bg-muted/30 p-3">
                      <div className="text-2xs text-muted-foreground">CTR</div>
                      <div className="mt-1 text-sm font-semibold">
                        {link.clickRate}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-md bg-muted/30 p-3">
                    <div className="text-2xs text-muted-foreground">Trend</div>
                    <div
                      className={`text-xs font-semibold ${
                        link.change > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {link.change > 0 ? "+" : ""}
                      {link.change}%
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-2xs border border-border/60">
                      {link.trend === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                      )}
                      <span className="text-muted-foreground">
                        vs. previous
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LinkPerformanceSection;
