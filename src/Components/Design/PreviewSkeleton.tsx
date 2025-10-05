import { Skeleton } from "@/Components/ui/skeleton";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Smartphone,
  Tablet,
  Monitor,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

interface PreviewSkeletonProps {
  previewMode?: "mobile" | "tablet" | "desktop";
  screenSize?: "mobile" | "tablet" | "desktop";
}

const PreviewSkeleton = ({
  previewMode = "mobile",
  screenSize = "desktop",
}: PreviewSkeletonProps) => {
  const getPreviewSize = () => {
    switch (previewMode) {
      case "mobile":
        return "w-[375px] h-[667px]";
      case "tablet":
        return "w-[768px] h-[1024px]";
      case "desktop":
        return "w-full max-w-[1200px] h-[800px]";
      default:
        return "w-[375px] h-[667px]";
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header Controls */}
      <div className="border-b bg-background p-2 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant={previewMode === "mobile" ? "default" : "outline"}
              size="sm"
              disabled
              className="text-xs sm:text-sm"
            >
              <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Mobile</span>
            </Button>
            <Button
              variant={previewMode === "tablet" ? "default" : "outline"}
              size="sm"
              disabled
              className="text-xs sm:text-sm"
            >
              <Tablet className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Tablet</span>
            </Button>
            <Button
              variant={previewMode === "desktop" ? "default" : "outline"}
              size="sm"
              disabled
              className="text-xs sm:text-sm"
            >
              <Monitor className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Desktop</span>
            </Button>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled
              className="text-xs sm:text-sm"
            >
              <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="text-xs text-muted-foreground min-w-[3rem]"
            >
              100%
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled
              className="text-xs sm:text-sm"
            >
              <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled
              className="text-xs sm:text-sm"
            >
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
          <Badge variant="outline" className="text-xs">
            Loading...
          </Badge>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-muted/30 p-2 sm:p-4 lg:p-8 overflow-auto">
        <div className="flex justify-center">
          <div
            className={`
              transition-all duration-300 shadow-2xl border 
              ${getPreviewSize()}
              ${
                previewMode === "mobile" && screenSize !== "mobile"
                  ? "rounded-[2.5rem] border-8 border-gray-800"
                  : previewMode === "tablet"
                  ? "rounded-[1.5rem] border-4 border-gray-700"
                  : "rounded-lg border-gray-200"
              }
              overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100
            `}
          >
            {/* Mobile Notch */}
            {previewMode === "mobile" && screenSize !== "mobile" && (
              <>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-10"></div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full z-10"></div>
              </>
            )}

            {/* Tablet Notch */}
            {previewMode === "tablet" && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full z-10"></div>
            )}

            {/* Content Skeleton */}
            <div className="w-full h-full overflow-y-auto bg-white">
              <div
                className={`relative h-full ${
                  screenSize === "desktop" && "w-[80%] mx-auto"
                }`}
              >
                <div className="px-4 sm:px-6 py-6 sm:py-8 h-full">
                  {/* Profile Section */}
                  <div className="text-center mb-6 sm:mb-8 space-y-4">
                    {/* Avatar */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" />
                    </div>

                    {/* Name */}
                    <Skeleton className="h-6 w-32 sm:w-40 mx-auto" />

                    {/* Bio */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48 sm:w-64 mx-auto" />
                      <Skeleton className="h-4 w-40 sm:w-56 mx-auto" />
                    </div>

                    {/* Badges */}
                    <div className="flex justify-center gap-2">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>

                  {/* Links Section */}
                  <div className="space-y-3 sm:space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton
                        key={i}
                        className="h-12 sm:h-14 w-full rounded-lg"
                      />
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <Skeleton className="h-3 w-40 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSkeleton;
