import MyChart from '@/Components/Charts/LineChart';
import LinkPerformanceSection from './LinkPerformance';


function SectionTwo() {
    return (
        <div className='w-full md:max-h-[90%] h-fit flex md:flex-row flex-col items-start justify-between gap-1 md:p-4 bg-background '>
            <MyChart />
            <div className='md:w-[50%] w-full  h-full '>
            <LinkPerformanceSection />
            </div>
        </div>
    )
}

export default SectionTwo
