import { sampleVideoData } from '@/app/utils/Object';
import Link from 'next/link';
import Video from '../Video/Video';
const PhotosSection = () => {
    const { width, height, src, videoId, duration, videos, type, tags, Favorite, alt, thumbnailSrc } = sampleVideoData
    return (
        <div className=' mx-auto py-20 my-4 bg-secondary'>
            <h5 className='text-2xl sm:text-3xl md:text-4xl  text-text_color text-center my-5 font-bold '>Video</h5>
            <div className=" rounded-lg p-5 bg-primary container mx-auto my-5">
                <div className="flex  md:flex-row lg:flex-row items-center justify-between gap-2 lg:gap-8 flex-col">
                    <Video duration={duration} width={width} height={height} src={src} alt={alt} thumbnailSrc={thumbnailSrc} videoId={+videoId} type={type} tags={tags} Favorite={Favorite} videos={videos} />
                    <p className='lg:w-[60vw] capitalize w-full text-center md:text-left text-text_color text-sm sm:text-lg  '>Engage with High-Quality Videos Access a diverse range of videos, from cinematic clips to dynamic motion graphics. Ideal for filmmakers, marketers, and creators looking to elevate their projects with motion.</p>
                </div>
                <Link href={`/videos`} className='text-lg text-white bg-teal-500 shadow-lg hover:bg-teal-600 transition-all hover:scale-105 p-2 block text-center rounded-xl mt-4 mx-auto'>Discover More</Link>
            </div >
        </div>
    );
}

export default PhotosSection;