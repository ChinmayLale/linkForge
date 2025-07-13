import MyChart from '@/Components/Charts/LineChart';
import LinkPerformanceSection from './LinkPerformance';


function SectionTwo() {
    return (
        <div className='w-full md:max-h-[90vh] h-fit flex md:flex-row flex-col items-start justify-between gap-1 md:p-4 bg-background overflow-hidden '>
            <MyChart />
            <div className='md:w-[50%] w-full overflow-y-auto '>
                <LinkPerformanceSection />
            </div>
        </div>
    )
}

export default SectionTwo
