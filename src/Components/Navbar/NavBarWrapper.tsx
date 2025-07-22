'use client';

import { usePathname } from 'next/navigation';
import DashboardNavBar from './UserNavbar';
import LandingNavBar from './NavBar';

export default function NavWrapper() {
    const pathname = usePathname();

    const isDashboard = pathname.startsWith('/dashboard');

    // Hide on /login, /signup, or a top-level dynamic username route like /chinmay
    const hideNav = (
        pathname === '/login' ||
        pathname === '/signup' ||
        /^\/[^/]+$/.test(pathname) && !isDashboard && pathname !== '/'
    );

    if (hideNav) return null;

    return (
        <div className='w-full h-fit sticky top-0 z-10'>
            {isDashboard ? <DashboardNavBar /> : <LandingNavBar />}
        </div>
    );
}
