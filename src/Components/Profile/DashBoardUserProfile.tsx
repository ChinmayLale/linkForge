"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BioCounts from "../BioCounts";
import { Button } from "@/Components/ui/button";
import { Eye, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { userThunks } from "@/store/thunks/user";
import { Skeleton } from "../ui/skeleton";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function DashBoardUserProfile({ user = "Chinmay" }: { user?: string }) {
  const {
    username,
    name,
    bio,
    avatarUrl,
    loading,
    error,
    totalClicks = 0,
    totalLinks = 0,
    ctr = 0.0,
  } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const [src, setSrc] = useState(
    avatarUrl || `https://avatar.iran.liara.run/username?username=${username}`
  );

  useEffect(() => {
    if (session?.customToken && !username) {
      dispatch(
        userThunks.getUserProfileThunk({
          username: user,
          token: session.customToken,
        })
      );
    }
  }, [session, username]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (!loading && !username) return null;

  if (loading) {
    return (
      <div className="w-full flex flex-col md:flex-row gap-6 p-6 bg-sidebar rounded-2xl">
        <Skeleton className="w-20 h-20 rounded-full" />
        <div className="flex flex-col gap-3 flex-1">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-sidebar rounded-2xl shadow-md">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <Avatar className="rounded-full border-4 border-ring shadow-sm object-cover w-28 h-28">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>
            <AvatarImage
              src={
                avatarUrl ||
                `https://avatar.iran.liara.run/username?username=${username}`
              }
              alt={username}
            />
          </AvatarFallback>
        </Avatar>
      </div>

      {/* User Info */}
      <div className="flex flex-col flex-1 gap-2 text-center md:text-left">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">@{username}</h2>
          <p className="text-muted-foreground text-lg">{name}</p>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          {bio ||
            "This user has not set a bio yet. You can add one in the settings."}
        </p>
        <BioCounts links={totalLinks} clicks={totalClicks} ctr={ctr} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4 md:mt-0">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:scale-105 transition-transform"
          onClick={() => toast.info("Previewing Profile")}
        >
          <Eye size={16} /> Preview
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:scale-105 transition-transform"
          onClick={() => toast.info("Link Copied to Clipboard")}
        >
          <Share2 size={16} /> Share
        </Button>
      </div>
    </div>
  );
}

export default DashBoardUserProfile;
