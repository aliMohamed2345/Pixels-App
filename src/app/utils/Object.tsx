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
export const sampleVideoSrc = `https://cdn.pixabay.com/video/2024/11/07/240320_tiny.mp4`

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