"use client";
import { Plus, Settings, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Switch } from "@/Components/ui/switch";
import { Button } from "@/Components/ui/button";
import { Slider } from "@/Components/ui/slider";
import { useState } from "react";
import type { LinkItem, ProfileData, ThemeSettings } from "../../types";

interface SettingsPanelProps {
  selectedElement: string | null;
  links: LinkItem[];
  updateLink: (id: string, updates: Partial<LinkItem>) => void;
  deleteLink: (id: string) => void;
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
  theme: ThemeSettings;
  setTheme: (theme: ThemeSettings) => void;
}

export function SettingsPanel({
  selectedElement,
  links,
  updateLink,
  deleteLink,
  profile,
  setProfile,
  theme,
  setTheme,
}: SettingsPanelProps) {
  // Add state to control which tab is active
  const [activeTab, setActiveTab] = useState<"profile" | "theme" | "layout">(
    "profile"
  );

  const getSelectedElement = () => {
    return links.find((link) => link.id === selectedElement);
  };

  const updateProfile = (updates: Partial<ProfileData>) => {
    const nextProfile = { ...profile, ...updates };
    if (JSON.stringify(profile) !== JSON.stringify(nextProfile)) {
      setProfile(nextProfile);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-4 w-4" />
        <h2 className="font-semibold">Settings</h2>
      </div>
      {selectedElement ? (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Element Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const element = getSelectedElement();
                if (!element) return null;
                return (
                  <>
                    <div>
                      <Label className="text-xs">Title</Label>
                      <Input
                        value={element.title}
                        onChange={(e) =>
                          updateLink(element.id, { title: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">URL</Label>
                      <Input
                        value={element.url}
                        onChange={(e) =>
                          updateLink(element.id, { url: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Color</Label>
                      <Input
                        type="color"
                        value={element.color}
                        onChange={(e) =>
                          updateLink(element.id, { color: e.target.value })
                        }
                        className="h-10 w-full p-1 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Style</Label>
                      <Select
                        value={element.style}
                        onValueChange={(
                          value:
                            | "default"
                            | "outline"
                            | "fill"
                            | "gradient"
                            | "neon"
                        ) => updateLink(element.id, { style: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="outline">Outline</SelectItem>
                          <SelectItem value="fill">Fill</SelectItem>
                          <SelectItem value="gradient">Gradient</SelectItem>
                          <SelectItem value="neon">Neon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {element.type === "music" && (
                      <>
                        <div>
                          <Label className="text-xs">Artist</Label>
                          <Input
                            value={"artist name here"}
                            onChange={(e) =>
                              updateLink(element.id, {
                                metadata: {
                                  ...element.metadata,
                                  artist: e.target.value,
                                },
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Duration</Label>
                          <Input
                            value={"duration here"}
                            onChange={(e) =>
                              updateLink(element.id, {
                                metadata: {
                                  ...element.metadata,
                                  duration: e.target.value,
                                },
                              })
                            }
                            className="mt-1"
                            placeholder="3:42"
                          />
                        </div>
                      </>
                    )}
                    {element.type === "event" && (
                      <>
                        <div>
                          <Label className="text-xs">Date</Label>
                          <Input
                            value={"date here"}
                            onChange={(e) =>
                              updateLink(element.id, {
                                metadata: {
                                  ...element.metadata,
                                  date: e.target.value,
                                },
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Location</Label>
                          <Input
                            value={"location here"}
                            onChange={(e) =>
                              updateLink(element.id, {
                                metadata: {
                                  ...element.metadata,
                                  location: e.target.value,
                                },
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                      </>
                    )}
                    {element.type === "social" && (
                      <div>
                        <Label className="text-xs">Social Platform</Label>
                        <Select
                          value={element.icon || "globe"}
                          onValueChange={(value) =>
                            updateLink(element.id, { icon: value })
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="github">GitHub</SelectItem>
                            <SelectItem value="globe">Website</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {element.type === "gallery" && (
                      <>
                        <div>
                          <Label className="text-xs">Gallery Images</Label>
                          <div className="space-y-2 mt-1">
                            {element.images?.map((image, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={image}
                                  onChange={(e) => {
                                    const newImages = [
                                      ...(element.images || []),
                                    ];
                                    newImages[index] = e.target.value;
                                    updateLink(element.id, {
                                      metadata: {
                                        ...element.metadata,
                                        images: newImages,
                                      },
                                    });
                                  }}
                                  placeholder="Image URL"
                                  className="flex-1"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newImages =
                                      element.images?.filter(
                                        (_, i) => i !== index
                                      ) || [];
                                    updateLink(element.id, {
                                      metadata: {
                                        ...element.metadata,
                                        images: newImages,
                                      },
                                    });
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newImages = [
                                  ...(element.images || []),
                                  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=80&h=80&fit=crop",
                                ];
                                updateLink(element.id, {
                                  metadata: {
                                    ...element.metadata,
                                    images: newImages,
                                  },
                                });
                              }}
                              className="w-full"
                            >
                              <Plus className="h-3 w-3 mr-2" />
                              Add Image
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Gallery Description</Label>
                          <Textarea
                            value={"desc here"}
                            onChange={(e) =>
                              updateLink(element.id, {
                                metadata: {
                                  ...element.metadata,
                                  description: e.target.value,
                                },
                              })
                            }
                            className="mt-1 resize-none"
                            rows={2}
                            placeholder="Gallery description..."
                          />
                        </div>
                      </>
                    )}
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Visible</Label>
                      <Switch
                        checked={element.active}
                        onCheckedChange={(checked) =>
                          updateLink(element.id, { active: checked })
                        }
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteLink(element.id)}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Element
                    </Button>
                  </>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={(val) =>
            setActiveTab(val as "profile" | "theme" | "layout")
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="text-xs">
              Profile
            </TabsTrigger>
            <TabsTrigger value="theme" className="text-xs">
              Theme
            </TabsTrigger>
            <TabsTrigger value="layout" className="text-xs">
              Layout
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">Username</Label>
                  <Input
                    value={profile.username}
                    onChange={() => console.log("Cant Change Username")}
                    readOnly
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Display Name</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Bio</Label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>
                <div>
                  <Label className="text-xs">Avatar URL</Label>
                  <Input
                    value={profile.avatar}
                    onChange={(e) =>
                      setProfile({ ...profile, avatar: e.target.value })
                    }
                    className="mt-1"
                    placeholder="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face"
                  />
                </div>
                <div>
                  <Label className="text-xs">Cover Image URL</Label>
                  <Input
                    value={profile.coverImage || ""}
                    onChange={(e) =>
                      updateProfile({ coverImage: e.target.value })
                    }
                    className="mt-1"
                    placeholder="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="theme" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Theme Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">Background Color</Label>
                  <Input
                    type="color"
                    value={
                      theme.backgroundColor.startsWith("#")
                        ? theme.backgroundColor
                        : "#ffffff"
                    }
                    onChange={(e) =>
                      setTheme({ ...theme, backgroundColor: e.target.value })
                    }
                    className="h-10 w-full p-1 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Text Color</Label>
                  <Input
                    type="color"
                    value={theme.textColor}
                    onChange={(e) =>
                      setTheme({ ...theme, textColor: e.target.value })
                    }
                    className="h-10 w-full p-1 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Primary Color</Label>
                  <Input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) =>
                      setTheme({ ...theme, primaryColor: e.target.value })
                    }
                    className="h-10 w-full p-1 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Card Style</Label>
                  <Select
                    value={theme.cardStyle}
                    onValueChange={(
                      value: "default" | "glass" | "minimal" | "neumorphism"
                    ) => setTheme({ ...theme, cardStyle: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="glass">Glass</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="neumorphism">Neumorphism</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="layout" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Layout Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">Border Radius</Label>
                  <Slider
                    value={[theme.borderRadius || 0]}
                    onValueChange={(value) =>
                      setTheme({ ...theme, borderRadius: value[0] })
                    }
                    max={24}
                    step={1}
                    className="mt-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {theme.borderRadius}px
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Font Family</Label>
                  <Select
                    value={theme.fontFamily}
                    onValueChange={(value) =>
                      setTheme({ ...theme, fontFamily: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Layout Style</Label>
                  <Select
                    value={theme.layout}
                    onValueChange={(value: "stack" | "grid" | "masonry") =>
                      setTheme({ ...theme, layout: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stack">Stack</SelectItem>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="masonry">Masonry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
