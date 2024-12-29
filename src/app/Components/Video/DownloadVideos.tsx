'use client'
import { useState } from "react";
import { VideosProps } from "@/app/(pages)/videos/page";
import { IoMdArrowDropdown } from "react-icons/io";
import { handleDownload } from "@/app/utils/handleDownloadLink";
import { getSize } from "@/app/utils/getSize";
export interface DownloadVideosProps {
    src: string;
    videos: VideosProps
    tags: string;
}

const DownloadVideos = ({ src, tags, videos }: DownloadVideosProps) => {
    const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false)
    const [currentLink, setCurrentLink] = useState<string>(src)
    const [currentOption, setCurrentOption] = useState<string>('tiny');
     function handleSelectOption(src: string, title: string) {
        setCurrentLink(src);
        setCurrentOption(title)
    }
    return (<>
        <button onClick={() => setIsWindowOpen(prev => !prev)} className=" relative rounded-full flex-1 p-3 bg-green-500 text-white text-center transition-all font-bold hover:scale-105 flex items-center justify-between px-4 ">Download <IoMdArrowDropdown className={`${isWindowOpen && `-rotate-180`}`} /></button>
        <div className={` bg-primary text-text_color transition-all absolute w-[300px] bottom-[-240px] left-[95px] py-2 rounded-md z-10 ${isWindowOpen ? `opacity-100 scale-100` : `opacity-0 scale-75`}`}>
            <ul>
                {Object.entries(videos).map(([size, video]) => (
                    <li onClick={() => handleSelectOption(video.url, size)} key={size} className={`flex items-center justify-between p-2 hover:bg-background_hover transition-all rounded-md cursor-pointer ${currentOption === size && `bg-background_hover`}`}>
                        <span>{size}</span>
                        <span>{video.width}X{video.height}</span>
                        <span>{getSize(video.size)}</span>
                    </li>))}
            </ul>
            <div className="flex items-center justify-around pt-5 text-white">
                <button className="p-2 bg-green-500 rounded-lg transition-all hover:scale-105" onClick={() => handleDownload(currentLink, `${tags.split(', ')[0]}`)} title="DownLoad">DownLoad</button>
                <a className="p-2 bg-green-500 rounded-lg transition-all hover:scale-105" target="__blank" href={currentLink} title="Preview">Preview</a>
            </div>
        </div>
    </>);
}

export default DownloadVideos;