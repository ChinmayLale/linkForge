import React from 'react'
import GeneralCard from '../misc/GeneralCard'

function AnalyticsHeader() {
    return (
        <div className='w-full h-fit flex-row items-center  justify-center  bg-[var(--primary-bg)] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8'>
            <GeneralCard />
            <GeneralCard />
            <GeneralCard />
            <GeneralCard />
        </div>
    )
}

export default AnalyticsHeader
