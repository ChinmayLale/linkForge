"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { Badge } from "@/Components/ui/badge";
import type { ProfileData, ThemeSettings, LinkItem } from "@/types";
import { LinkComponents } from "@/Components/Design/LinkComponents";
import Loading from "./_Components/loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface PageProps {
  params: {
    username: string;
  };
}

// Default link component renderer

const PublicProfile = ({ params }: PageProps) => {
  const { username } = params;
  const [loading, setLoading] = useState(true);

  const theme = useSelector((state: RootState) => state.theme.theme);
  const profile = useSelector((state: RootState) => state.user);

  const getBackgroundStyle = () => {
    // if (theme.backgroundType === "gradient") {
    //   return { background: theme.backgroundColor };
    // }
    // return { backgroundColor: theme.backgroundColor };
  };

  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [playingMusic, setPlayingMusic] = useState<string | null>(null);

  const renderComponent = (link: LinkItem) => {
    return (
      <LinkComponents
        key={link.id}
        link={link}
        theme={theme}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        playingMusic={playingMusic}
        setPlayingMusic={setPlayingMusic}
      />
    );
  };

  if (loading) {
    return <Loading darkMode />;
  }

  return (
    <div
      className={`w-full min-h-screen ${className}`}
      style={getBackgroundStyle()}
    >
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-20 h-20 rounded-full border-4 border-white/30 shadow-xl object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <h1
            className="text-xl font-bold mb-2"
            style={{ color: theme.textColor }}
          >
            {profile.name}
          </h1>

          <p
            className="text-sm opacity-80 mb-4 leading-relaxed"
            style={{ color: theme.textColor }}
          >
            {profile.bio}
          </p>

          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              🎵 Music Producer
            </Badge>
            <Badge variant="secondary" className="text-xs">
              ✨ Creator
            </Badge>
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-4">
          {links
            .filter((link) => link.active)
            .map((link) => (
              <div key={link.id}>
                {renderComponent ? renderComponent(link) : <p>Null is here </p>}
              </div>
            ))}
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
