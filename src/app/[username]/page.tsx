"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from "react";
import { Badge } from "@/Components/ui/badge";
import type { ProfileData, ThemeSettings, LinkItem } from "@/types";
import { LinkComponents } from "@/Components/Design/LinkComponents";
import Loading from "./_Components/loading";
import axios from "axios";
import { BASE_URL } from "@/Constants/Endpoints";
import Link from "next/link";
import { addViewsToLinkService } from "@/Services/links/addLinkViews.service";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

interface ApiResponse {
  status: number;
  message: string;
  data: {
    userProfile: {
      id: string;
      email: string;
      username: string;
      name: string;
      bio: string;
      tags: string[];
      avatarUrl: string;
      provider: string;
      password: string;
      isVerified: boolean;
      isProfilePublic: boolean;
      themeId: string;
      createdAt: string;
      updatedAt: string;
      theme: ThemeSettings;
    };
    userLinks: LinkItem[];
  };
  success: boolean;
}

interface UserPageData {
  userLinks: LinkItem[];
  userProfile: ProfileData | null;
  theme: ThemeSettings | null;
  error?: string;
}

const getUserPageData = async (username: string): Promise<UserPageData> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${BASE_URL}/user/profile/${username}`
    );
    const { data } = response.data;
    const { userLinks, userProfile } = data;

    // Transform userProfile to match ProfileData interface
    const transformedProfile: ProfileData = {
      name: userProfile.name,
      bio: userProfile.bio,
      avatar:
        userProfile.avatarUrl ||
        `https://avatar.iran.liara.run/username?username=${userProfile.username}`,
      username: userProfile.username,
      coverImage: userProfile.avatarUrl, // Add this if your ProfileData interface has it
    };

    return {
      userLinks: userLinks || [],
      userProfile: transformedProfile,
      theme: userProfile.theme,
    };
  } catch (error: unknown) {
    console.error("Something went wrong while getting user data:", error);

    let errorMessage = "Unknown error occurred";
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        errorMessage = "User not found";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error";
      } else {
        errorMessage = error.message || "Network error";
      }
    }

    return {
      userLinks: [],
      userProfile: null,
      theme: null,
      error: errorMessage,
    };
  }
};

const PublicProfile = ({ params }: PageProps) => {
  const { username } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserPageData>({
    userLinks: [],
    userProfile: null,
    theme: null,
  });
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [playingMusic, setPlayingMusic] = useState<string | null>(null);

  const [viewAdded, setViewAdded] = useState(false);

  useEffect(() => {
    const addViewsToLink = async () => {
      if (username && !viewAdded) {
        await addViewsToLinkService(username);
        setViewAdded(true);
      }
    };

    addViewsToLink();
  }, [username, viewAdded]); 

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getUserPageData(username);

      setData(result);

      if (result.userProfile) {
        document.title = `${result.userProfile.name} (@${username}) | linkForge`;
      } else {
        document.title = `@${username} | linkForge`;
      }

      setLoading(false);
    };

    fetchData();
  }, [username]);

  // Click tracking function
  const trackClick = async (linkId: string) => {
    try {
      await axios.post(`${BASE_URL}/link/analytics/addclick?linkId=${linkId}`, {
        linkId,
        username,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  const getBackgroundStyle = () => {
    if (!data.theme) return { backgroundColor: "#f3f4f6" };

    if (data.theme.backgroundType === "gradient") {
      return { background: data.theme.backgroundColor };
    }
    return { backgroundColor: data.theme.backgroundColor };
  };

  const renderComponent = (link: LinkItem) => {
    return (
      <div key={link.id} onClick={() => trackClick(link.id)}>
        <LinkComponents
          link={link}
          theme={data.theme!}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          playingMusic={playingMusic}
          setPlayingMusic={setPlayingMusic}
        />
      </div>
    );
  };

  // Loading state
  if (loading) {
    return <Loading darkMode />;
  }

  // Error state
  if (data.error || !data.userProfile || !data.theme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {data.error ||
              "The profile you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const { userLinks, userProfile, theme } = data;

  return (
    <div className="w-full min-h-screen" style={getBackgroundStyle()}>
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-20 h-20 rounded-full border-4 border-white/30 shadow-xl object-cover"
              onError={(e) => {
                // Fallback image if avatar fails to load
                e.currentTarget.src = "/default-avatar.png";
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <h1
            className="text-xl font-bold mb-2"
            style={{ color: theme.textColor }}
          >
            {userProfile.name}
          </h1>

          <p
            className="text-sm opacity-80 mb-4 leading-relaxed"
            style={{ color: theme.textColor }}
          >
            {userProfile.bio}
          </p>

          {/*   Add Tags To Peoples */}
          {/* <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              🎵 Music Producer
            </Badge>
            <Badge variant="secondary" className="text-xs">
              ✨ Creator
            </Badge>
          </div> */}
        </div>

        {/* Links Section */}
        <div className="space-y-4">
          {userLinks.length > 0 ? (
            userLinks
              .filter((link) => link.active)
              .map((link) => renderComponent(link))
          ) : (
            <div className="text-center py-8">
              <p
                className="text-sm opacity-60"
                style={{ color: theme.textColor }}
              >
                No links available
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-white/20">
          <p className="text-xs opacity-60" style={{ color: theme.textColor }}>
            Made with ❤️ using linkForge
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
