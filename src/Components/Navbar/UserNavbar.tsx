import React, { useState } from 'react'
import {
    Home,
    Link,
    Palette,
    BarChart3,
    Settings,
    User,
    Bell,
    HelpCircle,
    Eye,
    Copy,
    CreditCard,
    LogOut,
    Plus,
    Menu
} from 'lucide-react'

// shadcn/ui components
import { Button } from '@/Components/ui/button'
import { Badge } from '@/Components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet'
import { Separator } from '@/Components/ui/separator'

// Mock user data
const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
    username: "john",
    plan: "Pro"
}

const DashboardNavigation = () => {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [notifications] = useState(2)
    const [linkCount] = useState(12)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
        { id: 'links', label: 'Links', icon: Link, badge: linkCount },
        { id: 'design', label: 'Design', icon: Palette, badge: null },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
        { id: 'settings', label: 'Settings', icon: Settings, badge: null },
    ]

    interface NavItemProps {
        item: {
            id: string
            label: string
            icon: React.ElementType
            badge?: number | null
        }
        isMobile?: boolean
    }
    // NavItem component for both desktop and mobile
    const NavItem = ({ item, isMobile = false }:NavItemProps) => {
        const Icon = item.icon
        const isActive = activeTab === item.id

        return (
            <Button
                variant={isActive ? "default" : "ghost"}
                className={`
          ${isMobile ? 'flex flex-col h-14 p-2' : 'flex items-center gap-2 h-9'}
          ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
          transition-colors
        `}
                onClick={() => {
                    setActiveTab(item.id)
                    if (isMobile) setMobileMenuOpen(false)
                }}
            >
                <Icon className={isMobile ? 'h-5 w-5' : 'h-4 w-4'} />
                <span className={`${isMobile ? 'text-xs mt-1' : 'text-sm'}`}>
                    {item.label}
                </span>
                {item.badge && !isMobile && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                    </Badge>
                )}
            </Button>
        )
    }

    const ProfileDropdown = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                        <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{mockUser.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{mockUser.email}</p>
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
                        {mockUser.plan}
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
                <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    const QuickActions = () => (
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
            <Button variant="ghost" size="sm">
                <HelpCircle className="h-4 w-4" />
            </Button>
        </div>
    )

    const MobileSheet = () => (
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
                        <div key={item.id} className="w-full">
                            <NavItem item={item} isMobile={false} />
                        </div>
                    ))}
                </div>
                <Separator className="my-6" />
                <div className="space-y-2">
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
                            {navItems.map((item) => (
                                <NavItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <QuickActions />
                        <ProfileDropdown />
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Header */}
            <nav className="md:hidden bg-background border-b sticky top-0 z-50">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <MobileSheet />
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
                        <ProfileDropdown />
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            {/* <main className="flex-1 p-6 pb-20 md:pb-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
                        <p className="text-muted-foreground">
                            {activeTab === 'dashboard' && 'Welcome back! Here\'s your overview.'}
                            {activeTab === 'links' && 'Manage your links and organize them.'}
                            {activeTab === 'design' && 'Customize your page appearance.'}
                            {activeTab === 'analytics' && 'Track your page performance.'}
                            {activeTab === 'settings' && 'Manage your account settings.'}
                        </p>
                    </div>

                    
                    <div className="bg-card rounded-lg border p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content
                        </h2>
                        <p className="text-muted-foreground">
                            This is where the {activeTab} page content would be displayed.
                        </p>
                    </div>
                </div>
            </main> */}

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
                <div className="flex justify-around py-2">
                    {navItems.map((item) => (
                        <NavItem key={item.id} item={item} isMobile={true} />
                    ))}
                </div>
            </nav>
        </div>
    )
}

export default DashboardNavigation