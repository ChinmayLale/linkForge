"use client";

// import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import { ChartData } from "@/types";

export const description = "A radar chart with a custom label";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

const chartConfig = {
  desktop: {
    label: "views",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "clicks",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function ChartRadarLabelCustom({ chartData }: { chartData: ChartData[] }) {
  console.log("Data Reviced Iss===============");
  console.log({ chartData });
  return (
    <Card className="w-[50%] max-[800px]:w-full h-[50%] max-[800px]:my-2">
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart - Custom Label</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 w-[100%] px-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-video max-h-[250px] px-1 w-[100%]"
        >
          <RadarChart
            data={chartData}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            className="w-[100%]"
            outerRadius={80} // optional, controls the size of the radar
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey="title"
              tick={({ x, y, textAnchor, index, ...props }) => {
                const data = chartData[index];
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    fontSize={12}
                    fontWeight={500}
                    {...props}
                    className="fill-muted-foreground"
                  >
                    {data.title}
                  </text>
                );
              }}
            />
            <PolarGrid />
            <Radar
              name="Views"
              dataKey="views"
              stroke="var(--color-desktop)"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
            <Radar
              name="Clicks"
              dataKey="clicks"
              stroke="var(--color-mobile)"
              fill="var(--color-mobile)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          January - June 2024
        </div>
      </CardFooter> */}
    </Card>
  );
}

export default ChartRadarLabelCustom;
