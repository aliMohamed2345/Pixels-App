import { ReactNode } from "react";
import { IoHome, IoHeart, IoImage, IoVideocam, } from "react-icons/io5";
import { IoMdDownload, IoMdSearch } from "react-icons/io";
interface sideMenuProps {
    name: string,
    logo: ReactNode
}
export const sideMenuOptions: sideMenuProps[] = [
    { name: `Home`, logo: <IoHome /> },
    { name: `Photos`, logo: <IoImage /> },
    { name: `Videos`, logo: <IoVideocam /> },
    { name: `Favorites`, logo: <IoHeart /> }
]
export const samplePhotoData = {
    width: 640,
    type: 'photo',
    height: 425,
    src: `https://pixabay.com/get/g554b890ce65f55803d4ceb3cf38e861b94956e1da825b19934d7ee98ce27c9f64b8e10aea367f82adfca83576cdf7e67df47cdea13065d77efd93ca1437e05cd_640.jpg`,
    alt: `butterfly, bloom, insects`,
    tags: `butterfly`,
    imageId: `9306937`,
    Favorite: true
}
export const sampleVideoData = {
    tags: `leaves, water, river`,
    width: 1280,
    height: 720,
    src: `https://cdn.pixabay.com/video/2024/11/07/240320_tiny.mp4`,
    thumbnailSrc: `https://cdn.pixabay.com/video/2024/11/07/240320_tiny.jpg`,
    duration: 30,
    type: `film`,
    videoId: 240320,
    Favorite: true,
    alt: `leaves`,
    videos: {
        large: {
            url: 'https://cdn.pixabay.com/video/2024/11/07/240320_large.mp4',
            width: 3840,
            height: 2160,
            size: 160187047,
            thumbnail: 'https://cdn.pixabay.com/video/2024/11/07/240320_large.jpg'
        },
        medium: {
            url: 'https://cdn.pixabay.com/video/2024/11/07/240320_medium.mp4',
            width: 2560,
            height: 1440,
            size: 91032136,
            thumbnail: 'https://cdn.pixabay.com/video/2024/11/07/240320_medium.jpg'
        },
        small: {
            url: 'https://cdn.pixabay.com/video/2024/11/07/240320_small.mp4',
            width: 1920,
            height: 1080,
            size: 60491445,
            thumbnail: 'https://cdn.pixabay.com/video/2024/11/07/240320_small.jpg'
        },
        tiny: {
            url: 'https://cdn.pixabay.com/video/2024/11/07/240320_tiny.mp4',
            width: 1280,
            height: 720,
            size: 28106960,
            thumbnail: 'https://cdn.pixabay.com/video/2024/11/07/240320_tiny.jpg'
        }
    }
}
export const servicesSectionData = [
    {
        logo: <IoMdDownload size={60} className="p-3 text-green-500 rounded-full bg-primary mx-auto hover:scale-105 transition-all" />,
        header: `Download`
        , description: `Download any photo or video you love in high quality, ensuring that you have the best assets for your projects, all at your fingertips`
    }, {
        logo: <IoHeart size={60} className="p-3 text-rose-500 rounded-full bg-primary mx-auto hover:scale-105 transition-all" />,
        header: `Favorites`
        , description: `Easily save and organize your favorite photos and videos in a dedicated section, making it simple to revisit and enjoy your top picks whenever you want.`
    },
    {
        logo: <IoMdSearch size={60} className="p-3 text-blue-500 rounded-full bg-primary mx-auto hover:scale-105 transition-all" />,
        header: `Search`
        , description: `Find exactly what you're looking for with our powerful search functionality. Whether it's a specific photo or video, you can search through our entire collection with ease.`
    },
]