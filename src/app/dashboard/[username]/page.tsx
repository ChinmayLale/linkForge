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


const Tab = () => {
    switch (useSelector((state: RootState) => state.nav.tabName)) {
        case "Dashboard":
            return (
                <div className='w-full h-fit flex flex-col  justify-center gap-4  bg-[var(--primary-bg)]'>
                    <DashBoardUserProfile />
                    <YourLinks />
                    <TopLinks />
                </div>
            );
        case "Links":
            return (
                <div className='w-full h-fit flex flex-col  justify-center gap-4  bg-[var(--primary-bg)]'>
                    <DashBoardUserProfile />
                    {/* <YourLinks /> */}
                    <LinkPerformanceSection />
                </div>
            );
        case "Analytics":
            return (
                <div className='w-full h-fit flex flex-col  justify-center gap-4  bg-[var(--primary-bg)]'>
                    <DashBoardUserProfile />
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

function page() {
    return (
        <div className='w-full h-fit flex flex-col overflow-y-auto  justify-center gap-4 p-4 bg-[var(--primary-bg)]'>
            {/* <DashBoardUserProfile /> */}
            <Tab />
        </div>
    )
}

export default page
