import { sampleVideoSrc } from '@/app/utils/Object';
import Link from 'next/link';
const VideoSection = () => {
    return (
        <div className=' mx-auto py-20 my-4 bg-secondary'>
            <h5 className='text-2xl sm:text-3xl md:text-4xl  text-text_color text-center my-5 font-bold '>Video</h5>
            <div className=" rounded-lg p-5 bg-primary container mx-auto my-5">
                <div className="flex  md:flex-row lg:flex-row items-center justify-between gap-2 lg:gap-8 flex-col">
                    <video width={640} height={480} src={sampleVideoSrc} controls loop muted className={`rounded-md`} />
                    <p className='lg:w-[60vw] capitalize w-full text-center md:text-left text-text_color text-sm sm:text-lg  '>Engage with High-Quality Videos Access a diverse range of videos, from cinematic clips to dynamic motion graphics. Ideal for filmmakers, marketers, and creators looking to elevate their projects with motion.</p>
                </div>
                <Link href={`/videos`} className='text-lg text-white bg-teal-500 shadow-lg hover:bg-teal-600 transition-all hover:scale-105 p-2 block text-center rounded-xl mt-4 mx-auto'>Discover More</Link>
            </div >
        </div>
    );
}

export default VideoSection;