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
  const [copiedId, setCopiedId] = useState<number | null>(null);

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

  const handleCopy = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full bg-card border-border flex flex-col">
        <CardHeader className="pb-3 px-4 sm:px-6 pt-4 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-lg font-semibold text-card-foreground">
                Link Performance
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                Track engagement metrics across all your links
              </CardDescription>
            </div>
            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs px-3 bg-transparent"
              >
                Export
              </Button>
            </div>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search links..."
                className="pl-8 h-9 text-sm"
                aria-label="Search links"
              />
            </div>
            <div className="flex gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[130px] h-9 text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
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
                <SelectTrigger className="w-[140px] h-9 text-sm">
                  <div className="flex items-center gap-1.5">
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    <SelectValue placeholder="Sort" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clicks:desc">Clicks ↓</SelectItem>
                  <SelectItem value="clicks:asc">Clicks ↑</SelectItem>
                  <SelectItem value="views:desc">Views ↓</SelectItem>
                  <SelectItem value="views:asc">Views ↑</SelectItem>
                  <SelectItem value="ctr:desc">CTR ↓</SelectItem>
                  <SelectItem value="ctr:asc">CTR ↑</SelectItem>
                  <SelectItem value="change:desc">Change ↓</SelectItem>
                  <SelectItem value="change:asc">Change ↑</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
          <div className="space-y-2.5">
            {sorted.map((link, idx) => (
              <Card
                key={link.id}
                className="group hover:shadow-md hover:border-primary/20 transition-all duration-200 border-border bg-background/50"
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-11 h-11 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-xl flex items-center justify-center text-xl border border-border/50">
                          {link.thumbnail}
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-muted rounded-full flex items-center justify-center text-[10px] font-semibold text-muted-foreground border border-background">
                          {idx + 1}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <div className="font-semibold text-sm text-card-foreground truncate">
                            {link.title}
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0 h-4 shrink-0"
                          >
                            {link.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <ExternalLink className="h-3 w-3 shrink-0" />
                          <span className="truncate">{link.url}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(link.url, link.id)}
                            className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                            aria-label="Copy URL"
                          >
                            <Copy
                              className={`h-3 w-3 ${
                                copiedId === link.id ? "text-green-500" : ""
                              }`}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                      <div className="flex flex-col items-center px-3 py-1.5 rounded-lg bg-muted/40 min-w-[70px]">
                        <div className="flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5 text-chart-1" />
                          <div className="text-sm font-semibold">
                            {link.views.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          views
                        </div>
                      </div>

                      <div className="flex flex-col items-center px-3 py-1.5 rounded-lg bg-muted/40 min-w-[70px]">
                        <div className="flex items-center gap-1.5">
                          <MousePointer className="h-3.5 w-3.5 text-chart-2" />
                          <div className="text-sm font-semibold">
                            {link.clicks.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          clicks
                        </div>
                      </div>

                      <div className="flex flex-col items-center px-3 py-1.5 rounded-lg bg-muted/40 min-w-[60px]">
                        <div className="text-sm font-semibold">
                          {link.clickRate}%
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          CTR
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/60 bg-background/50">
                        {link.trend === "up" ? (
                          <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                        )}
                        <span
                          className={`text-xs font-semibold ${
                            link.change > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {link.change > 0 ? "+" : ""}
                          {link.change}%
                        </span>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 shrink-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>
                          <ExternalLink className="h-3.5 w-3.5 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-3.5 w-3.5 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCopy(link.url, link.id)}
                        >
                          <Copy className="h-3.5 w-3.5 mr-2" />
                          Copy
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="sm:hidden mt-3 grid grid-cols-4 gap-2">
                    <div className="flex flex-col items-center py-2 rounded-lg bg-muted/40">
                      <Eye className="h-3.5 w-3.5 text-chart-1 mb-1" />
                      <div className="text-xs font-semibold">
                        {link.views.toLocaleString()}
                      </div>
                      <div className="text-[9px] text-muted-foreground">
                        views
                      </div>
                    </div>
                    <div className="flex flex-col items-center py-2 rounded-lg bg-muted/40">
                      <MousePointer className="h-3.5 w-3.5 text-chart-2 mb-1" />
                      <div className="text-xs font-semibold">
                        {link.clicks.toLocaleString()}
                      </div>
                      <div className="text-[9px] text-muted-foreground">
                        clicks
                      </div>
                    </div>
                    <div className="flex flex-col items-center py-2 rounded-lg bg-muted/40">
                      <div className="text-xs font-semibold">
                        {link.clickRate}%
                      </div>
                      <div className="text-[9px] text-muted-foreground">
                        CTR
                      </div>
                    </div>
                    <div className="flex flex-col items-center py-2 rounded-lg bg-muted/40">
                      {link.trend === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5 text-green-500 mb-1" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-red-500 mb-1" />
                      )}
                      <div
                        className={`text-xs font-semibold ${
                          link.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {link.change > 0 ? "+" : ""}
                        {link.change}%
                      </div>
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
