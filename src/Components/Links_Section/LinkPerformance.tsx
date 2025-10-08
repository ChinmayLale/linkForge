"use client";

import * as React from "react";

type LinkRow = {
  id: string | number;
  title: string;
  url?: string;
  views?: number;
  clicks?: number;
};

type Props = {
  // Pass only what you have; category/change/trend are NOT required
  data?: LinkRow[];
  className?: string;
  totalViews?: number;
};

function formatNumber(n?: number) {
  if (n === undefined || n === null) return "—";
  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(n);
}

function computeCtr(views?: number, clicks?: number) {
  if (!views || !clicks || views <= 0) return undefined;
  const pct = (clicks / views) * 100;
  return `${pct.toFixed(1)}%`;
}

export default function LinkPerformanceSimple({
  data = [],
  className,
  totalViews = 0,
}: Props) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((r) => {
      const t = `${r.title} ${r.url ?? ""}`.toLowerCase();
      return t.includes(q);
    });
  }, [data, query]);

  return (
    <section className={["w-full h-full", className].filter(Boolean).join(" ")}>
      <header className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-lg font-medium text-foreground text-pretty">
          Link Performance
        </h2>
      </header>

      <div className="mb-3">
        <label className="sr-only" htmlFor="link-search">
          Search links
        </label>
        <input
          id="link-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search links..."
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-sm text-muted-foreground rounded-md border border-dashed border-border p-6 text-center">
          No links found.
        </div>
      ) : (
        <div className="space-y-2">
          {/* Desktop / md+ grid header */}
          <div className="hidden md:grid grid-cols-[minmax(0,1fr)_96px_96px_96px] items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
            <span className="truncate">Link</span>
            <span className="text-right">Views</span>
            <span className="text-right">Clicks</span>
            <span className="text-right">CTR</span>
          </div>

          {/* Rows */}
          <ul className="space-y-2">
            {filtered.map((row) => {
              // console.log("------------------------------------------------");
              // console.log({ totalViews, Clicks: row.clicks });
              // console.log("------------------------------------------------");
              const ctr = computeCtr(totalViews, row.clicks);
              return (
                <li
                  key={row.id}
                  className="rounded-lg border border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60"
                >
                  {/* Desktop row */}
                  <div className="hidden md:grid grid-cols-[minmax(0,1fr)_96px_96px_96px] items-center gap-2 px-3 py-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="size-6 rounded-md bg-muted shrink-0"
                          aria-hidden
                        />
                        <div className="min-w-0">
                          <div className="text-sm text-foreground truncate">
                            {row.title}
                          </div>
                          {row.url ? (
                            <a
                              href={row.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-muted-foreground hover:underline truncate block"
                              title={row.url}
                            >
                              {row.url}
                            </a>
                          ) : (
                            <div className="text-xs text-muted-foreground">
                              —
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-foreground text-right tabular-nums">
                      {formatNumber(row.views || 0)}
                    </div>
                    <div className="text-sm text-foreground text-right tabular-nums">
                      {formatNumber(row.clicks || 0)}
                    </div>
                    <div className="text-sm text-foreground text-right tabular-nums">
                      {ctr ?? "—"}
                    </div>
                  </div>

                  {/* Mobile card */}
                  <div className="md:hidden px-3 py-3">
                    <div className="flex items-start gap-3">
                      <div
                        className="size-8 rounded-md bg-muted shrink-0"
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-foreground truncate">
                          {row.title}
                        </div>
                        {row.url ? (
                          <a
                            href={row.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-muted-foreground hover:underline truncate block"
                            title={row.url}
                          >
                            {row.url}
                          </a>
                        ) : (
                          <div className="text-xs text-muted-foreground">—</div>
                        )}

                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="rounded-md border border-border bg-muted/30 p-2 text-center">
                            <div className="text-[10px] text-muted-foreground">
                              Views
                            </div>
                            <div className="text-sm text-foreground tabular-nums">
                              {formatNumber(row.views || 0)}
                            </div>
                          </div>
                          <div className="rounded-md border border-border bg-muted/30 p-2 text-center">
                            <div className="text-[10px] text-muted-foreground">
                              Clicks
                            </div>
                            <div className="text-sm text-foreground tabular-nums">
                              {formatNumber(row.clicks || 0)}
                            </div>
                          </div>
                          <div className="rounded-md border border-border bg-muted/30 p-2 text-center">
                            <div className="text-[10px] text-muted-foreground">
                              CTR
                            </div>
                            <div className="text-sm text-foreground tabular-nums">
                              {ctr ?? "—"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
