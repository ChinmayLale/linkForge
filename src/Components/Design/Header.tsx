"use client";
import type React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "@/Components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Copy,
  Settings,
  Eye,
  Save,
  Upload,
  //   Sun,
  //   Moon,
} from "lucide-react";
import { ScrollArea } from "@/Components/ui/scroll-area";
import type { LinkItem, ScreenSize } from "../../types/index";
// import { useTheme } from "next-themes";

interface HeaderProps {
  screenSize: ScreenSize;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  settingsPanelOpen: boolean;
  setSettingsPanelOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  username: string;
  MobileSidebar: React.ComponentType;
  SettingsPanel: React.ReactNode;
  handleSaveLink: () => void;
}

export function Header({
  screenSize,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
  settingsPanelOpen,
  setSettingsPanelOpen,
  darkMode,
  setDarkMode,
  username,
  MobileSidebar,
  SettingsPanel,
  handleSaveLink,
}: HeaderProps) {
  //   const { setTheme, theme } = useTheme();
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-8 sm:h-14 items-center px-2 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4">
          {screenSize === "mobile" ? (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <ScrollArea className="h-full">
                  <MobileSidebar />
                </ScrollArea>
              </SheetContent>
            </Sheet>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
          <h1 className="text-sm sm:text-lg font-semibold">Page Builder</h1>
        </div>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Badge
            variant="secondary"
            className="font-mono text-xs hidden sm:inline-flex"
          >
            linktr.ee/{username}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigator.clipboard.writeText(`https://linktr.ee/${username}`)
            }
            className="hidden sm:inline-flex"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Separator
            orientation="vertical"
            className="h-4 sm:h-6 hidden sm:block"
          />
          {screenSize === "mobile" && (
            <Sheet open={settingsPanelOpen} onOpenChange={setSettingsPanelOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <ScrollArea className="h-full">{SettingsPanel}</ScrollArea>
              </SheetContent>
            </Sheet>
          )}
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex bg-transparent"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveLink}>
            <Save className="h-3 h-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">Save</span>
          </Button>
          <Button size="sm">
            <Upload className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">Publish</span>
          </Button>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (theme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
          >
            {theme !== "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button> */}
        </div>
      </div>
    </header>
  );
}
