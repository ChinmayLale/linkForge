"use client";
import { useState } from "react";
import {
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  BarChart3,
  ExternalLink,
  Copy,
  Share2,
  LayoutGrid,
  ListIcon,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/Components/ui/select";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

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

function makeSparkline(link: LinkPerf) {
  // deterministic mini series based on clicks and views
  const base = Math.max(10, Math.round(link.clicks / 100));
  return Array.from({ length: 12 }).map((_, i) => ({
    x: i,
    y: Math.max(
      5,
      base +
        Math.round(Math.sin(i / 2) * (link.trend === "up" ? 8 : -6)) +
        (i % 3 === 0 ? 4 : -2)
    ),
  }));
}

function LinkPerformanceSection() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
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
            <div className="flex gap-2 w-full justify-end">
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-transparent"
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-transparent"
              >
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <CardTitle className="text-xl font-semibold text-card-foreground">
                  Link Performance Analytics
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Search, filter, and compare link engagement at a glance
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  aria-pressed={viewMode === "grid"}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4 mr-1" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  aria-pressed={viewMode === "table"}
                  onClick={() => setViewMode("table")}
                >
                  <ListIcon className="h-4 w-4 mr-1" />
                  Table
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:items-center">
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
                    <SelectItem value="views:desc">
                      Views • High → Low
                    </SelectItem>
                    <SelectItem value="views:asc">
                      Views • Low → High
                    </SelectItem>
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
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {sorted.map((link, idx) => {
                const data = makeSparkline(link);
                return (
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
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Detailed Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share Link
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy URL
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="mt-4 h-20 rounded-md border border-border/60 bg-muted/20">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={data}
                            margin={{ left: 6, right: 6, top: 8, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient
                                id={`grad-${link.id}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="hsl(var(--primary))"
                                  stopOpacity={0.7}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="hsl(var(--primary))"
                                  stopOpacity={0.05}
                                />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="x" hide />
                            <YAxis hide />
                            <RechartsTooltip
                              contentStyle={{
                                background: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                              }}
                              labelStyle={{
                                color: "hsl(var(--muted-foreground))",
                              }}
                              formatter={(value) => [`${value}`, "Activity"]}
                            />
                            <Area
                              type="monotone"
                              dataKey="y"
                              stroke="hsl(var(--primary))"
                              fillOpacity={1}
                              fill={`url(#grad-${link.id})`}
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-md bg-muted/30 p-3">
                          <div className="text-2xs text-muted-foreground">
                            Views
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="h-3.5 w-3.5 text-chart-1" />
                            <div className="text-sm font-semibold">
                              {link.views.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="rounded-md bg-muted/30 p-3">
                          <div className="text-2xs text-muted-foreground">
                            Clicks
                          </div>
                          <div className="flex items-center gap-2">
                            <MousePointer className="h-3.5 w-3.5 text-chart-2" />
                            <div className="text-sm font-semibold">
                              {link.clicks.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="rounded-md bg-muted/30 p-3">
                          <div className="flex items-center justify-between">
                            <div className="text-2xs text-muted-foreground">
                              CTR
                            </div>
                            <div className="text-xs font-semibold">
                              {link.clickRate}%
                            </div>
                          </div>
                          <Progress
                            value={link.clickRate}
                            className="h-1 mt-2"
                          />
                        </div>
                        <div className="rounded-md bg-muted/30 p-3">
                          <div className="flex items-center justify-between">
                            <div className="text-2xs text-muted-foreground">
                              Trend
                            </div>
                            <div
                              className={`text-xs font-semibold ${
                                link.change > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {link.change > 0 ? "+" : ""}
                              {link.change}%
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-xs">
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
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-[1.5fr,0.8fr,0.8fr,0.6fr,0.6fr,0.6fr,40px] text-xs px-4 py-2 text-muted-foreground">
                  <div>Link</div>
                  <div>Views</div>
                  <div>Clicks</div>
                  <div>CTR</div>
                  <div>Change</div>
                  <div>Conv</div>
                  <div className="text-right">⋯</div>
                </div>
                <div className="divide-y divide-border rounded-md border border-border/60 bg-background/60">
                  {sorted.map((link, idx) => (
                    <div
                      key={link.id}
                      className="grid grid-cols-[1.5fr,0.8fr,0.8fr,0.6fr,0.6fr,0.6fr,40px] items-center px-4 py-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 bg-muted rounded-full flex items-center justify-center text-[10px] text-muted-foreground shrink-0">
                          #{idx + 1}
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-md flex items-center justify-center text-base border border-border/50 shrink-0">
                          {link.thumbnail}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-semibold truncate">
                              {link.title}
                            </div>
                            <Badge
                              variant="secondary"
                              className="text-2xs px-1.5 py-0"
                            >
                              {link.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-muted-foreground min-w-0">
                            <ExternalLink className="h-3 w-3" />
                            <span className="truncate">{link.url}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold">
                        {link.views.toLocaleString()}
                      </div>
                      <div className="text-sm font-semibold">
                        {link.clicks.toLocaleString()}
                      </div>
                      <div className="text-sm">{link.clickRate}%</div>
                      <div
                        className={`text-sm ${
                          link.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {link.change > 0 ? "+" : ""}
                        {link.change}%
                      </div>
                      <div className="text-sm">{link.conversionRate}%</div>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Detailed Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share Link
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy URL
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default LinkPerformanceSection;
