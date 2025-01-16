import Link from 'next/link';
import flower from '../../../../public/marguerite-729510.jpg'
const PhotosSection = () => {
    return (<div className='container mx-auto my-10'>
        <h5 className='text-2xl sm:text-3xl md:text-4xl  text-text_color text-center my-5 font-bold'>Photo</h5>
        <div className="bg-secondary rounded-lg p-5 ">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-2 lg:gap-8">
                <img
                    loading='lazy'
                    src={flower.src}
                    alt='flower'
                    width={640}
                    height={480}
                    className='rounded-md'
                />
                <p className='capitalize w-full text-center md:text-left text-text_color lg:w-[30vw] text-sm sm:text-lg md:text-xl '>Discover Stunning Images Explore a vast collection of high-quality photos that capture beauty, emotion, and creativity. Perfect for designers, content creators, and anyone seeking visual inspiration.</p>
            </div>
            <Link href={`/photos`} className='text-lg text-white bg-teal-500 shadow-lg hover:bg-teal-600 transition-all hover:scale-105 p-2 block text-center rounded-xl mt-4 mx-auto'>Discover More</Link>
        </div >
    </div>
    );
}

export default PhotosSection;