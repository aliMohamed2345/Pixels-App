'use client'
import { useSearchParams } from "next/navigation";
import Link from 'next/link'
import { copyToClipboard } from '@/app/utils/handleCopyBtn'
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaRegClipboard } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { videoDataProps } from "../page";
import Video from "@/app/Components/Video/Video";
import DownloadVideos from "@/app/Components/Video/DownloadVideos";
import ResponsiveDownloadVideos from "@/app/Components/Video/ResponsiveDownloadVideos";
import { getDuration } from "@/app/utils/getDuration";


const VideoId = () => {
    const { tags, type, width, height, src, duration } = Object.fromEntries(useSearchParams().entries())
    const videos = useSearchParams().get('videos')
    const videosData = JSON.parse(videos ?? "")
    const [filteredData, setFilteredData] = useState<videoDataProps[]>([])
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const filterData = async () => {
            try {
                const apiUrl = `${process.env.NEXT_PUBLIC_VIDEOS_API}?key=${process.env.NEXT_PUBLIC_VIDEOS_API_KEY}&safesearch=true`;
                const filteredLink = `${apiUrl}&q=${encodeURIComponent(tags.split(', ').join(' '))}`;
                
                const res = await fetch(filteredLink);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status} - ${await res.text()}`);
                }
    
                const data = await res.json();
                setFilteredData(data.hits || []);
            } catch {
                console.error("Error fetching data");
            }
        };
    
        filterData();
    }, [tags]);
    
    return (
        <div className="flex gap-3 flex-col">
            <div className='pt-20 flex flex-col lg:flex-row container mx-auto px-5 items-center justify-around gap-3 '>
                <video width={600} height={400} src={src} autoPlay controls className={`rounded - md  object - cover transition - opacity`} />
                <div className="shadow-lg rounded-lg p-5 bg-secondary text-text_color flex flex-col gap-5 w-[65vw] text-center  ">
                    <h4>{tags.split(', ')[0]} photo</h4>
                    <div className="gap-2 flex items-center flex-wrap justify-center">
                        {tags.split(', ').map((tag, i) =>
                            (<Link href={{ pathname: `/search/videos/${tag} `, query: { q: tag } }} className="hover:bg-background_hover bg-primary transition-all text-text_color rounded-lg p-2" key={i}>{tag}</Link>))
                        }
                    </div>
                    <p>height : {height}px</p>
                    <p>width : {width}px</p>
                    <p>Type : {type}</p>
                    <p>duration : {getDuration(+duration)}</p>
                    <div className="flex gap-3 items-center relative justify-center flex-col sm:flex-row md:flex-row">
                        <div className="flex flex-between items-center gap-5">
                            <button onClick={(e) => { e.preventDefault(); setIsFavorite((prev) => !prev); }} type="button" title="favorite" className="relative overflow-hidden cursor-pointer group hover:overflow-visible focus-visible:outline-none text-2xl bg-red text-rose-500 hover:bg-background_hover transition-all rounded-full p-1" aria-describedby="tooltip-05">
                                {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
                                <span className="invisible absolute bottom-full left-1/2 z-10 mb-2 w-auto -translate-x-1/2 rounded bg-green-500 text-secondary p-2 text-xs text-white opacity-0 transition-all before:invisible  group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100">Favorite</span>
                            </button>
                            <button onClick={() => copyToClipboard(src)} type="button" title="copy photo" className="relative overflow-hidden cursor-pointer group hover:overflow-visible focus-visible:outline-none text-2xl   hover:bg-background_hover transition-all rounded-full p-1" >
                                <FaRegClipboard />
                                <span className="invisible absolute bottom-full left-1/2 z-10 mb-2 w-20 -translate-x-1/2 rounded bg-green-500 text-secondary p-2 text-xs text-white opacity-0 transition-all before:invisible  group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100">Copy Photo</span>
                            </button>
                        </div>
                        <div className="hidden md:block">
                            <DownloadVideos src={src} tags={tags} videos={videosData} />
                        </div>
                        <div className="block md:hidden">
                            <ResponsiveDownloadVideos src={src} tags={tags} videos={videosData} />
                        </div>
                    </div>
                </div>
            </div >
            <div className="flex container mx-auto px-5 flex-col ">
                <p className="text-secondary_text_color text-xl font-bold my-5">Related Videos</p>
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-2 place-items-center">
                    {filteredData.map((video, i) => {
                        const { tags, id, type, duration } = video;
                        const { width, height, url, thumbnail } = video.videos.tiny
                        return (<Video videos={video.videos} key={i} width={+width} height={+height} src={url} videoId={+id} alt={tags} tags={tags} type={type} duration={+duration} thumbnailSrc={thumbnail}  />)
                    })}
                </div>
            </div>
        </div>
    );
}

export default VideoId;