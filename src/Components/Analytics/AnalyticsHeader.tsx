import React from 'react'
import GeneralCard from '../misc/GeneralCard'
import { Eye, Link, Users } from 'lucide-react'

function AnalyticsHeader() {
    return (
        <div className='w-full h-fit flex-row items-center  justify-center  bg-[var(--primary-bg)] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8'>
            <GeneralCard
                title="Total Views"
                desc="1232"
                trend="+14%"
                icon={<Eye className="h-4 w-4 text-muted-foreground" />}
                subtext1="Today: 132"
                subtext2="Last week: 1080"
            />

            <GeneralCard
                title="Unique Visitors"
                desc="876"
                trend="+9%"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                subtext1="New: 643"
                subtext2="Returning: 233"
            />

            <GeneralCard
                title="Link Clicks"
                desc="542"
                trend="+18%"
                icon={<Link className="h-4 w-4 text-muted-foreground" />}
                subtext1="CTR: 44.5%"
                subtext2="Avg/Visitor: 2.3"
            />

            <GeneralCard
                title="Top Link"
                desc="Instagram"
                trend="154 clicks"
                icon={<Link className="h-4 w-4 text-muted-foreground" />}
                subtext1="Last Clicked: 2h ago"
                subtext2="Profile: @chinmay.lale"
            />
        </div>
    )
}

export default AnalyticsHeader
