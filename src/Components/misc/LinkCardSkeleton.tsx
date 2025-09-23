import React from "react";

function LinkCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 p-4 bg-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-lg" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
}

export default LinkCardSkeleton;
