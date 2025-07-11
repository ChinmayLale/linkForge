import React from 'react'
import BioCountColoumn from './misc/BioCountColoumn'



const numbers = [
    { number: 252, title: "Links" },
    { number: 415, title: "Clicks" },
    { number: 48.95, title: "CTR" },
]
function BioCounts() {
    return (
        <div className='w-[40%] h-fit flex flex-row items-center justify-start mt-4 space-x-12'>
            {numbers.map((item, index) => (
                <BioCountColoumn number={item.number} title={item.title} key={index} />
            ))}
        </div>
    )
}

export default BioCounts
