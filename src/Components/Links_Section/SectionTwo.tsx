"use client";

import MyChart from "@/Components/Charts/LineChart";
import LinkPerformanceSection from "./LinkPerformance";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { setTabName, TabName } from "@/store/slices/navigationSlice";
import { Skeleton } from "@/Components/ui/skeleton"; // 👈 import Skeleton
import { useEffect } from "react";
import { linksThunks } from "@/store/thunks/links";
import { useSession } from "next-auth/react";

function SectionTwo() {
  const links = useSelector((state: RootState) => state.link.links);
  const loading = useSelector((state: RootState) => state.link.loading); // 👈 optional if you track it
  const dispatch = useDispatch<AppDispatch>();
  const views = useSelector((state: RootState) => state.user.views);
  const { data } = useSession();
  const hasLinks = links && links.length > 0;
  const chartData = useSelector((state: RootState) => state.link.chartData);
  // You can fake a loading state here for testing:
  // const loading = true;

  useEffect(() => {
    console.log("Session data is ");
    console.log({ data });
    if (data?.customToken) {
      dispatch(
        linksThunks.getViewsVsClickGraphDataThunk({ token: data.customToken })
      );
    }
  }, [data?.customToken]);

  if (loading) {
    return (
      <div className="w-full md:max-h-[90vh] h-fit flex md:flex-row flex-col items-start justify-between gap-1 md:p-4 bg-background overflow-hidden">
        {/* Chart skeleton */}
        <div className="md:w-[50%] w-full flex flex-col gap-4">
          <Skeleton className="w-full h-[300px] rounded-xl" />
          <Skeleton className="w-3/4 h-6 rounded-md mx-auto" />
        </div>

        {/* Link list skeleton */}
        <div className="md:w-[50%] w-full space-y-3 px-2 overflow-y-auto">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card/50 p-3 flex items-center gap-3"
            >
              <Skeleton className="h-10 w-10 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:max-h-[90vh] h-fit flex md:flex-row flex-col items-start justify-between gap-1 md:p-4 bg-background overflow-hidden">
      {hasLinks ? (
        <>
          <MyChart chartData={chartData || []} />
          <div className="md:w-[50%] w-full overflow-y-auto">
            <LinkPerformanceSection
              data={links.slice(0, 4)}
              className="px-2"
              totalViews={views || 1}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-[70vh] text-center p-6">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            No links yet
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-sm">
            You haven’t added any links yet. Add your first link to start
            tracking views, clicks, and performance insights here.
          </p>
          <Button
            className="flex items-center gap-2"
            onClick={() => dispatch(setTabName("Design" as TabName))}
          >
            <Plus className="h-4 w-4" />
            Add your first link
          </Button>
        </div>
      )}
    </div>
  );
}

export default SectionTwo;
