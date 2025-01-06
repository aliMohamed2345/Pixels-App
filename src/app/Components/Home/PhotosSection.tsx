import Picture from '../Photo/Picture';
import { samplePhotoData } from '@/app/utils/Object';
import Link from 'next/link';
const PhotosSection = () => {
    const { width, height, src, imageId, type, tags, Favorite, alt } = samplePhotoData
    return (<div className='container mx-auto my-10'>
        <h5 className='text-2xl sm:text-3xl md:text-4xl  text-text_color text-center my-5 font-bold'>Photo</h5>
        <div className="bg-secondary rounded-lg p-5 ">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-2 lg:gap-8">
                <Picture width={width} height={height} src={src} alt={alt} imageId={String(imageId)} type={type} tags={tags} Favorite={Favorite} />
                <p className='capitalize w-full text-center md:text-left text-text_color lg:w-[30vw] text-sm sm:text-lg md:text-xl '>Discover Stunning Images Explore a vast collection of high-quality photos that capture beauty, emotion, and creativity. Perfect for designers, content creators, and anyone seeking visual inspiration.</p>
            </div>
            <Link href={`/photos`} className='text-lg text-white bg-teal-500 shadow-lg hover:bg-teal-600 transition-all hover:scale-105 p-2 block text-center rounded-xl mt-4 mx-auto'>Discover More</Link>
        </div >
    </div>
    );
}

export default PhotosSection;