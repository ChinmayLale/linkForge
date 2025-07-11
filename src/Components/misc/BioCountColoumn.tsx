import React from 'react'

// Component to display a column for bio counts
interface BioCountColoumnProps {
    number: number;
    title: string;
}

function BioCountColoumn({ number = 0, title = "none" }: BioCountColoumnProps) {
    return (
        <div className='flex flex-col w-full items-start'>
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                {number}
            </h3>
            <p className="leading-7 w-full">
                {title}
            </p>
        </div>
    )
}

export default BioCountColoumn
