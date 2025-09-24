"use client";
import React from "react";

interface LoadingProps {
  darkMode?: boolean;
}

export default function Loading({ darkMode = false }: LoadingProps) {
  const bgBase = darkMode ? "bg-gray-800" : "bg-gray-100";
  const bgCard = darkMode ? "bg-gray-700" : "bg-gray-300";
  const bgBorder = darkMode ? "border-gray-600" : "border-gray-200";

  return (
    <div className={`w-full min-h-screen ${bgBase} animate-pulse`}>
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Profile Header Skeleton */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className={`w-20 h-20 rounded-full ${bgCard} mx-auto`}></div>
            <div
              className={`absolute -bottom-1 -right-1 w-6 h-6 ${bgCard} rounded-full border-2 ${bgBorder}`}
            ></div>
          </div>

          <div className={`h-5 w-32 ${bgCard} mx-auto mb-2 rounded`}></div>
          <div className={`h-3 w-40 ${bgCard} mx-auto mb-4 rounded`}></div>

          <div className="flex justify-center gap-2 flex-wrap">
            <div className={`h-5 w-20 ${bgCard} rounded`}></div>
            <div className={`h-5 w-16 ${bgCard} rounded`}></div>
          </div>
        </div>

        {/* Links Section Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`h-12 ${bgCard} rounded-lg w-full`}></div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className={`text-center mt-8 pt-6 border-t ${bgBorder}`}>
          <div className={`h-3 w-40 ${bgCard} mx-auto rounded`}></div>
        </div>
      </div>
    </div>
  );
}
