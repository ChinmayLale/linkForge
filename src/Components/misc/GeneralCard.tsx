import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, TrendingUp, TrendingDown, Activity } from "lucide-react";

interface GeneralCardProps {
  title?: string;
  desc?: string | number;
  trend?: string;
  icon?: React.ReactNode;
  subtext1?: string;
  subtext2?: string;
  trendDirection?: "up" | "down" | "neutral";
  color?: "blue" | "green" | "purple" | "orange" | "red";
}

function GeneralCard({
  title = "Total Views",
  desc = "1232",
  trend = "+14%",
  icon = <Eye className="h-5 w-5" />,
  subtext1 = "This is Subtext",
  subtext2 = "subtext2",
  trendDirection = "up",
  color = "blue",
}: GeneralCardProps) {
  const colorSchemes = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/20",
      border: "border-blue-200 dark:border-blue-800/30",
      icon: "text-blue-600 dark:text-blue-400",
      accent: "bg-blue-100 dark:bg-blue-900/30",
    },
    green: {
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
      border: "border-emerald-200 dark:border-emerald-800/30",
      icon: "text-emerald-600 dark:text-emerald-400",
      accent: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/20",
      border: "border-purple-200 dark:border-purple-800/30",
      icon: "text-purple-600 dark:text-purple-400",
      accent: "bg-purple-100 dark:bg-purple-900/30",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-950/20",
      border: "border-orange-200 dark:border-orange-800/30",
      icon: "text-orange-600 dark:text-orange-400",
      accent: "bg-orange-100 dark:bg-orange-900/30",
    },
    red: {
      bg: "bg-red-50 dark:bg-red-950/20",
      border: "border-red-200 dark:border-red-800/30",
      icon: "text-red-600 dark:text-red-400",
      accent: "bg-red-100 dark:bg-red-900/30",
    },
  };

  const scheme = colorSchemes[color];
  const TrendIcon =
    trendDirection === "up"
      ? TrendingUp
      : trendDirection === "down"
      ? TrendingDown
      : Activity;

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${scheme.bg} ${scheme.border} border-2`}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${scheme.accent}`}
      />

      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        <div
          className={`p-2 rounded-lg ${scheme.accent} transition-all duration-300 group-hover:scale-110`}
        >
          <div className={scheme.icon}>{icon}</div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-3">
        <div className="space-y-1">
          <div className="text-3xl font-bold tracking-tight text-foreground">
            {desc}
          </div>

          <div
            className={`flex items-center text-sm font-medium ${
              trendDirection === "up"
                ? "text-emerald-600 dark:text-emerald-400"
                : trendDirection === "down"
                ? "text-red-600 dark:text-red-400"
                : "text-muted-foreground"
            }`}
          >
            <TrendIcon className="h-4 w-4 mr-1" />
            {trend}
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border/50">
          {subtext1 && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {subtext1.split(":")[0]}:
              </span>
              <span className="font-medium text-foreground">
                {subtext1.split(":")[1]}
              </span>
            </div>
          )}
          {subtext2 && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {subtext2.split(":")[0]}:
              </span>
              <span className="font-medium text-foreground">
                {subtext2.split(":")[1]}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default GeneralCard;
