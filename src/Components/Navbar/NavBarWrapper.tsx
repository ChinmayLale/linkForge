// components/Navbar/NavWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import DashboardNavBar from './UserNavbar';
import LandingNavBar from './NavBar';
// import { Progress } from '../ui/progress';

export default function NavWrapper() {
    const pathname = usePathname();

    const isDashboard = pathname.startsWith('/dashboard');

    return (
        <div className='w-full h-fit sticky top-0 z-10'>
            {/* <Progress
                value={68}
                color="var(--muted-foreground)"
                className="h-1 w-full z-50 bg-background"
            /> */}

            {isDashboard ? <DashboardNavBar /> : <LandingNavBar />}
        </div>
    )
}
