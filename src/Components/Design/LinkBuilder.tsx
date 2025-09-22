"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { ScrollArea } from "@/Components/ui/scroll-area";
import "../../styles/animation.css"; // Add this import
import { Header } from "./Header";
import { MobileSidebar } from "./MobileSidebar";
import { SettingsPanel } from "./SettingsPanel";
import { PreviewCanvas } from "./PreviewCanvas";
import { LinkComponents } from "./LinkComponents";
import type {
  LinkItem,
  ProfileData,
  ThemeSettings,
  ScreenSize,
  PreviewMode,
} from "../../types";
import { templateStyles } from "@/Constants";

export default function LinkBuilder4() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("mobile");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [templatesOpen, setTemplatesOpen] = useState(true);
  const [componentsOpen, setComponentsOpen] = useState(true);
  const [playingMusic, setPlayingMusic] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<ScreenSize>("desktop");

  // Responsive hook
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
        setSidebarCollapsed(true);
      } else if (width < 1024) {
        setScreenSize("tablet");
        setSidebarCollapsed(false);
      } else {
        setScreenSize("desktop");
        setSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [profile, setProfile] = useState<ProfileData>({
    name: "Alex Johnson",
    bio: "Digital Creator & Music Producer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    username: "alexjohnson",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
  });

  const [links, setLinks] = useState<LinkItem[]>([]);

  const [theme, setTheme] = useState<ThemeSettings>(templateStyles.clean);

  const addComponent = (type: string) => {
    const componentDefaults = {
      link: { title: "New Link", url: "https://example.com" },
      social: {
        title: "Social Link",
        url: "https://social.com",
        icon: "globe",
      },
      music: {
        title: "New Track",
        url: "https://spotify.com",
        metadata: {
          artist: "Artist",
          duration: "3:00",
          thumbnail:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop",
        },
      },
      video: {
        title: "New Video",
        url: "https://youtube.com",
        metadata: {
          duration: "2:30",
          thumbnail:
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=120&fit=crop",
        },
      },
      image: {
        title: "Image",
        url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=200&fit=crop",
      },
      contact: { title: "Contact Me", url: "mailto:contact@example.com" },
      event: {
        title: "New Event",
        url: "https://event.com",
        metadata: { date: "TBD", location: "Location TBD" },
      },
      gallery: {
        title: "Gallery",
        url: "#gallery",
        metadata: {
          images: [
            "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=80&h=80&fit=crop",
          ],
        },
      },
    };
    const defaults =
      componentDefaults[type as keyof typeof componentDefaults] ||
      componentDefaults.link;
    const newItem: LinkItem = {
      id: Date.now().toString(),
      type: type as LinkItem["type"],
      color: theme.primaryColor,
      active: true,
      style: "default",
      ...defaults,
    };
    setLinks([...links, newItem]);
    setMobileMenuOpen(false);
  };

  const updateLink = useCallback(
    (id: string, updates: Partial<LinkItem>) => {
      setLinks(
        links.map((link) => (link.id === id ? { ...link, ...updates } : link))
      );
    },
    [links]
  );

  const deleteLink = useCallback(
    (id: string) => {
      setLinks(links.filter((link) => link.id !== id));
      if (selectedElement === id) {
        setSelectedElement(null);
      }
    },
    [links, selectedElement]
  );

  const applyTemplate = (templateId: string) => {
    const template = templateStyles[templateId as keyof typeof templateStyles];
    if (template) {
      setTheme(template);
    }
    setMobileMenuOpen(false);
  };

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

  const MobileSidebarComponent = () => (
    <MobileSidebar
      templatesOpen={templatesOpen}
      setTemplatesOpen={setTemplatesOpen}
      componentsOpen={componentsOpen}
      setComponentsOpen={setComponentsOpen}
      applyTemplate={applyTemplate}
      addComponent={addComponent}
    />
  );

  const SettingsPanelComponent = useMemo(
    () => (
      <SettingsPanel
        selectedElement={selectedElement}
        links={links}
        updateLink={updateLink}
        deleteLink={deleteLink}
        profile={profile}
        setProfile={setProfile}
        theme={theme}
        setTheme={setTheme}
      />
    ),
    [selectedElement, links, profile, theme, deleteLink, updateLink]
  );

  return (
    <div className={`min-h-screen bg-background text-foreground`}>
      <div className="min-h-screen bg-background text-foreground">
        <Header
          screenSize={screenSize}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          settingsPanelOpen={settingsPanelOpen}
          setSettingsPanelOpen={setSettingsPanelOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          username={profile.username}
          MobileSidebar={MobileSidebarComponent}
          SettingsPanel={SettingsPanelComponent}
        />
        <div className="flex h-[calc(100vh-3rem)] sm:h-[calc(100vh-3.5rem)]">
          {screenSize !== "mobile" && (
            <div
              className={`border-r bg-muted/50 transition-all duration-300 ${
                sidebarCollapsed ? "w-0" : "w-64 lg:w-80"
              } overflow-hidden`}
            >
              <ScrollArea className="h-full">
                <MobileSidebarComponent />
              </ScrollArea>
            </div>
          )}
          <PreviewCanvas
            previewMode={previewMode}
            setPreviewMode={setPreviewMode}
            screenSize={screenSize}
            profile={profile}
            theme={theme}
            links={links}
            renderComponent={renderComponent}
            setSelectedElement={() => setSelectedElement(null)}
          />
          {screenSize !== "mobile" && (
            <div className="w-64 lg:w-80 border-l bg-background">
              <ScrollArea className="h-full">
                <SettingsPanel
                  selectedElement={selectedElement}
                  links={links}
                  updateLink={updateLink}
                  deleteLink={deleteLink}
                  profile={profile}
                  setProfile={setProfile}
                  theme={theme}
                  setTheme={setTheme}
                />
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
