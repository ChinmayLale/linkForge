// components/Navbar/NavWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import DashboardNavBar from './UserNavbar';
import LandingNavBar from './NavBar';

export default function NavWrapper() {
    const pathname = usePathname();

    const isDashboard = pathname.startsWith('/dashboard');

    return isDashboard ? <DashboardNavBar /> : <LandingNavBar />;
}
