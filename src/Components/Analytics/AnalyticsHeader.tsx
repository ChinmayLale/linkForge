import GeneralCard from "@/Components/misc/GeneralCard";
import {
  Eye,
  Link,
  Users,
  Star,
  BarChart3,
  MousePointer,
  Globe,
  Clock,
} from "lucide-react";

function AnalyticsHeader() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Analytics Overview
            </h1>
            <p className="text-muted-foreground">
              Track your performance and engagement metrics
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GeneralCard
          title="Total Views"
          desc="12,847"
          trend="+14.2%"
          icon={<Eye className="h-5 w-5" />}
          subtext1="Today: 1,247"
          subtext2="Yesterday: 1,092"
          trendDirection="up"
          color="blue"
        />

        <GeneralCard
          title="Unique Visitors"
          desc="8,429"
          trend="+9.1%"
          icon={<Users className="h-5 w-5" />}
          subtext1="New: 5,643"
          subtext2="Returning: 2,786"
          trendDirection="up"
          color="green"
        />

        <GeneralCard
          title="Link Clicks"
          desc="3,542"
          trend="+18.7%"
          icon={<MousePointer className="h-5 w-5" />}
          subtext1="CTR: 27.6%"
          subtext2="Avg/User: 4.2"
          trendDirection="up"
          color="purple"
        />

        <GeneralCard
          title="Top Performer"
          desc="Instagram"
          trend="2,154 clicks"
          icon={<Star className="h-5 w-5" />}
          subtext1="Last Click: 12m ago"
          subtext2="Growth: +23%"
          trendDirection="up"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GeneralCard
          title="Bounce Rate"
          desc="24.3%"
          trend="-3.2%"
          icon={<Globe className="h-5 w-5" />}
          subtext1="Industry Avg: 32%"
          subtext2="Best Day: 18.1%"
          trendDirection="up"
          color="green"
        />

        <GeneralCard
          title="Avg. Session"
          desc="4m 32s"
          trend="+12.4%"
          icon={<Clock className="h-5 w-5" />}
          subtext1="Pages/Session: 3.2"
          subtext2="Mobile: 3m 45s"
          trendDirection="up"
          color="blue"
        />

        <GeneralCard
          title="Conversion Rate"
          desc="3.8%"
          trend="+0.7%"
          icon={<BarChart3 className="h-5 w-5" />}
          subtext1="Goal: 5.0%"
          subtext2="Best Source: 6.2%"
          trendDirection="up"
          color="purple"
        />

        <GeneralCard
          title="Revenue Impact"
          desc="$2,847"
          trend="+28.3%"
          icon={<Link className="h-5 w-5" />}
          subtext1="Per Click: $0.80"
          subtext2="Monthly: $8,541"
          trendDirection="up"
          color="orange"
        />
      </div>
    </div>
  );
}

export default AnalyticsHeader;
