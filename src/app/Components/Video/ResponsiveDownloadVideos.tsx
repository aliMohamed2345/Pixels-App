'use client'
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { getSize } from "@/app/utils/getSize";
import { handleDownload } from "@/app/utils/handleDownloadLink";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
const ResponsiveDownloadVideos = () => {
    const { src, tags, videos } = useSelector((state: RootState) => state.DownloadVideos)
    const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);
    const [currentLink, setCurrentLink] = useState<string>(src)
    const [currentOption, setCurrentOption] = useState<string>('tiny');
    function handleSelectOption(src: string, title: string) {
        setCurrentLink(src);
        setCurrentOption(title)
    }
    return (
        <>
            <button onClick={() => setIsWindowOpen(prev => !prev)} className=" relative rounded-full flex-1 p-3 bg-green-500 text-white text-center transition-all font-bold hover:scale-105 flex items-center justify-between px-4 ">Download</button>
            {isWindowOpen && (
                <div
                    onClick={() => setIsWindowOpen(false)}
                    className="fixed inset-0 bg-black/80 z-10"
                ></div>
            )}
            <div
                className={`w-[90vw] h-auto overflow-auto p-3 z-10 bg-primary duration-300 transform -translate-x-1/2 -translate-y-1/2 fixed left-[50%] text-text_color transition-all ${isWindowOpen ? `opacity-100 scale-100 top-[50%]` : `opacity-0 scale-0 top-[-300px]`} rounded-lg container mx-auto`}>
                <button
                    title="close"
                    onClick={() => setIsWindowOpen(false)}
                    className="block justify-self-end p-2  rounded-full transition-all hover:bg-background_hover w-8 h-8"
                >
                    <MdClose className="text-text_color" />
                </button>

                <div className="flex gap-3  mx-auto justify-around items-center flex-col lg:flex-row md:flex-row">
                </div>
                <div className="flex items-center my-4 justify-center gap-3 flex-wrap">
                </div>
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
            </div >
        </>
    );
};


export default ResponsiveDownloadVideos;