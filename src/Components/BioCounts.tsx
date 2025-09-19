import React from 'react'
import BioCountColoumn from './misc/BioCountColoumn'



function BioCounts({ links, clicks, ctr }: { links: number, clicks: number, ctr: number }) {
    return (
        <div className='w-[40%] h-fit flex flex-row items-center justify-start mt-4 space-x-12'>
            <BioCountColoumn number={links} title={"Links"} />
            <BioCountColoumn number={clicks} title={"Clicks"} />
            <BioCountColoumn number={ctr} title={"CTR"} />
        </div>
    )
}

export default BioCounts
