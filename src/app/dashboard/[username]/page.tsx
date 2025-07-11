import YourLinks from '@/Components/Links_Section/YourLinks'
import DashBoardUserProfile from '@/Components/Profile/DashBoardUserProfile'
import React from 'react'

function page() {
    return (
        <div className='w-full h-fit flex flex-col  justify-center gap-4 p-4 bg-[var(--primary-bg)]'>
            <DashBoardUserProfile />
            <YourLinks />
        </div>
    )
}

export default page
