"use client"
import AnalyticsHeader from '@/Components/Analytics/AnalyticsHeader'
// import LinkBuilder from '@/Components/Design/LinkBuilder'
// import LinkBuilder3 from '@/Components/Design/LinkBuilder3'
import LinkBuilder from '@/Components/Design/LinkBuilder'
import LinkPerformanceSection from '@/Components/Links_Section/LinkPerformance'
import TopLinks from '@/Components/Links_Section/SectionTwo'
import YourLinks from '@/Components/Links_Section/YourLinks'
import DashBoardUserProfile from '@/Components/Profile/DashBoardUserProfile'
import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'


type Props = {
    params: Promise<{ username: string }>;
};

const Tab = ({ username }: { username: string }) => {
    if (typeof window !== "undefined") {
        console.log(localStorage.getItem("token"));
    }
    switch (useSelector((state: RootState) => state.nav.tabName)) {
        case "Dashboard":
            return (
                <div className='w-full h-fit flex flex-col  justify-center gap-4  bg-[var(--primary-bg)]'>
                    <DashBoardUserProfile user={username} />
                    <YourLinks />
                    <TopLinks />
                </div>
            );
        case "Links":
            return (
                <div className='w-full h-fit flex flex-col  justify-center gap-4  bg-[var(--primary-bg)]'>
                    <DashBoardUserProfile user={username} />
                    {/* <YourLinks /> */}
                    <LinkPerformanceSection />
                </div>
            );
        case "Analytics":
            return (
                <div className='w-full h-fit flex flex-col  justify-center gap-4  bg-[var(--primary-bg)]'>
                    <DashBoardUserProfile user={username} />
                    <AnalyticsHeader />
                </div>
            );
        case "Design":
            return (
                <div className='w-full h-fit flex flex-col  justify-center bg-[var(--primary-bg)]'>
                    <LinkBuilder />
                </div>
            );
        case "Settings":
            return "Settings";
        default:
            return "Dashboard";
    }
}

async function page({ params }: Props) {
    const { username } = await params;

    if (!username) {
        return <div className='w-full h-full flex items-center justify-center'>Please Login to view your dashboard</div>
    }

    return (
        <div className='w-full h-fit flex flex-col overflow-y-auto  justify-center gap-4 p-4 bg-[var(--primary-bg)]'>
            {/* <DashBoardUserProfile /> */}
            <Tab username={username} />
        </div>
    )
}

export default page
