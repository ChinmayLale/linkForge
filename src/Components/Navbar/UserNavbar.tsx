/* eslint-disable @typescript-eslint/no-unused-vars */
"use Client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Home,
  Link,
  Palette,
  Settings,
  User,
  Bell,
  HelpCircle,
  Eye,
  Copy,
  CreditCard,
  LogOut,
  Plus,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { Separator } from "@/Components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { setTabName, TabName } from "@/store/slices/navigationSlice";
import { RootState } from "@/store/store";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

// Mock user data
// const mockUser = {
//   name: "John Doe",
//   email: "john@example.com",
//   avatar: "",
//   username: "john",
//   plan: "Pro",
// };

interface NavItemType {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number | null;
}

interface NavItemProps {
  item: NavItemType;
  isMobile?: boolean;
  isActive: boolean;
  onClick: () => void;
}

interface ProfileDropdownProps {
  name: string;
  email: string;
  avatarUrl: string;
  username: string;
  onLogout: () => void;
}

interface QuickActionsProps {
  notifications: number;
  setTheme: (theme: string) => void;
}

interface MobileSheetProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  navItems: NavItemType[];
  renderNavItem: (item: NavItemType, isMobile: boolean) => React.ReactNode;
}

// Memoized NavItem component
const NavItem = React.memo<NavItemProps>(
  ({ item, isMobile = false, isActive, onClick }) => {
    const Icon = item.icon;

    const buttonClassName = useMemo(() => {
      return `
      ${isMobile ? "flex flex-col h-14 p-2" : "flex items-center gap-2 h-9"}
      ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      }
      transition-colors
    `;
    }, [isMobile, isActive]);

    return (
      <Button
        variant={isActive ? "default" : "ghost"}
        className={buttonClassName}
        onClick={onClick}
      >
        <Icon className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
        <span className={`${isMobile ? "text-xs mt-1" : "text-sm"}`}>
          {item.label}
        </span>
        {item.badge && !isMobile && (
          <Badge variant="secondary" className="ml-auto text-xs">
            {item.badge}
          </Badge>
        )}
      </Button>
    );
  }
);

NavItem.displayName = "NavItem";

// Memoized ProfileDropdown component
const ProfileDropdown = React.memo<ProfileDropdownProps>(
  ({ name, email, avatarUrl, username, onLogout }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={
                avatarUrl ||
                `https://avatar.iran.liara.run/username?username=${username}`
              }
              alt={name}
            />
            <AvatarFallback>
              <AvatarImage
                src={`https://avatar.iran.liara.run/username?username=${username}`}
                alt={name}
              />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          <span>View My Page</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy Page Link</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Edit Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing & Plans</span>
          <Badge variant="outline" className="ml-auto">
            Update This
          </Badge>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="mr-2 h-4 w-4" />
          <span>Notifications</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
);

ProfileDropdown.displayName = "ProfileDropdown";

// Memoized QuickActions component
const QuickActions = React.memo<QuickActionsProps>(
  ({ notifications, setTheme }) => (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        <Eye className="h-4 w-4 mr-2" />
        View Page
      </Button>
      <Button variant="ghost" size="sm" className="relative">
        <Bell className="h-4 w-4" />
        {notifications > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
            {notifications}
          </Badge>
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
);

QuickActions.displayName = "QuickActions";

// Memoized MobileSheet component
const MobileSheet = React.memo<MobileSheetProps>(
  ({ mobileMenuOpen, setMobileMenuOpen, navItems, renderNavItem }) => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle className="text-left">
            <div className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              LinkForge
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-2">
          {navItems.map((item) => (
            <div
              key={item.id}
              className="w-full items-center justify-center pl-4"
            >
              {renderNavItem(item, false)}
            </div>
          ))}
        </div>
        <Separator className="my-6" />
        <div className="space-y-2 px-2">
          <Button variant="outline" className="w-full justify-start">
            <Eye className="h-4 w-4 mr-2" />
            View My Page
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
);

MobileSheet.displayName = "MobileSheet";

const DashboardNavigation: React.FC = () => {
  const { username, name, avatarUrl, email } = useSelector(
    (state: RootState) => state.user
  );

  const links = useSelector((state: RootState) => state.link.links);

  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [notifications] = useState<number>(2);
  const [linkCount, setLinkCount] = useState<number>(links.length || 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { setTheme } = useTheme();

  const currentTabName = useSelector((state: RootState) => state.nav.tabName);

  useEffect(() => {
    if (currentTabName) {
      setActiveTab(currentTabName.toLowerCase());
    }
  }, [currentTabName]);

  // Memoize navItems array
  const navItems = useMemo<NavItemType[]>(
    () => [
      { id: "dashboard", label: "Dashboard", icon: Home, badge: null },
      { id: "links", label: "Links", icon: Link, badge: linkCount },
      { id: "design", label: "Design", icon: Palette, badge: null },
      // { id: "analytics", label: "Analytics", icon: BarChart3, badge: null },
      { id: "settings", label: "Settings", icon: Settings, badge: null },
    ],
    [linkCount]
  );

  // Memoized logout handler
  const handleLogOut = useCallback(async (): Promise<void> => {
    try {
      signOut({ callbackUrl: "/" });
      console.log("User logged out successfully");
      setActiveTab("dashboard");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  // Memoized nav item click handler
  const handleNavItemClick = useCallback(
    (itemId: string, itemLabel: string, isMobile: boolean): void => {
      setActiveTab(itemId);
      dispatch(setTabName(itemLabel as TabName));
      if (isMobile) setMobileMenuOpen(false);
    },
    [dispatch, currentTabName]
  );

  // Render function for NavItem to avoid creating new functions in render
  const renderNavItem = useCallback(
    (item: NavItemType, isMobile: boolean): React.ReactNode => {
      return (
        <NavItem
          key={item.id}
          item={item}
          isMobile={isMobile}
          isActive={activeTab === item.id}
          onClick={() => handleNavItemClick(item.id, item.label, isMobile)}
        />
      );
    },
    [activeTab, handleNavItemClick]
  );

  return (
    <div className="min-h-fit bg-background">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-background border-b sticky top-0 z-50">
        <div className="flex items-center justify-between w-full px-6 py-3">
          <div className="flex items-center space-x-8">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Link className="h-6 w-6" />
              LinkForge
            </div>
            <div className="flex items-center space-x-1">
              {navItems.map((item) => renderNavItem(item, false))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <QuickActions notifications={notifications} setTheme={setTheme} />
            <ProfileDropdown
              name={name || ""}
              email={email || ""}
              avatarUrl={avatarUrl || ""}
              username={username}
              onLogout={handleLogOut}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Header */}
      <nav className="md:hidden bg-background border-b sticky top-0 z-[9999]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <MobileSheet
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              navItems={navItems}
              renderNavItem={renderNavItem}
            />
            <div className="flex items-center gap-2 text-lg font-bold">
              <Link className="h-5 w-5" />
              LinkForge
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
            <ProfileDropdown
              name={name || ""}
              email={email || ""}
              avatarUrl={avatarUrl || ""}
              username={username}
              onLogout={handleLogOut}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavigation;
