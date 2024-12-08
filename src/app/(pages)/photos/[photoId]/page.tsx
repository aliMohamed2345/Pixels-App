'use client'
import { useSearchParams } from "next/navigation";
import Image from 'next/image'
import Link from 'next/link'
import { copyToClipboard } from '@/app/utils/handleCopyBtn'
import { handleDownload } from "@/app/utils/handleDownloadLink";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaRegClipboard } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { photoDataProps } from "../page";
import Picture from "@/app/Components/Photo/Picture";
const PhotoId = () => {
    const { imageId, tags, type, width, height, src } = Object.fromEntries(useSearchParams().entries())
    const [filteredData, setFilteredData] = useState<photoDataProps[]>([])
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const filterData = () => {
            const apiUrl = `${process.env.NEXT_PUBLIC_PHOTOS_API}?key=${process.env.NEXT_PUBLIC_PHOTOS_API_KEY}&safesearch=true`;
            const filteredLink = `${apiUrl}&q=${encodeURIComponent(tags.split(', ').join(" "))}`;
            fetch(filteredLink)
                .then(res => res.json())
                .then(data => {
                    setFilteredData(data.hits);
                })
                .catch(error => console.error("Error fetching data:", error));
        };
        filterData();
    }, [tags])
    return (
        <div className="flex gap-3 flex-col">
            <div className='pt-20 flex flex-col lg:flex-row container mx-auto px-5 items-center justify-around gap-3 '>
                <Image src={src} width={+width} height={+height} alt={imageId} loading="lazy" className="rounded-md" />
                <div className="shadow-lg rounded-lg p-5 bg-secondary text-text_color flex flex-col gap-5 w-[65vw] text-center  ">
                    <h4>{tags.split(', ')[0]} photo</h4>
                    <div className="gap-2 flex items-center flex-wrap justify-center">
                        {tags.split(', ').map((tag, i) =>
                            (<Link href={{ pathname: `/search/photos/${tag}`, query: { q: tag } }} className="hover:bg-background_hover bg-primary transition-all text-text_color rounded-lg p-2" key={i}>{tag}</Link>))
                        }
                    </div>
                    <p>Type : {type}</p>
                    <p>width : {width}px</p>
                    <p>height : {height}px</p>
                    <div className="flex gap-3 items-center justify-center">
                        <button onClick={() => handleDownload(src, `${tags.split(', ')[0]} image from pixels`)} className="rounded-full flex-1 p-3 bg-green-500 text-white text-center transition-all font-bold hover:scale-105">download</button>
                        <button type="button" className="text-2xl bg-red text-rose-500 hover:bg-background_hover transition-all rounded-full p-1" onClick={(e) => { e.preventDefault(); setIsFavorite((prev) => !prev); }} >
                            {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
                        </button>
                        <button title="copy link" className="hover:bg-background_hover rounded-full p-2 transition-all" onClick={() => copyToClipboard(src)}><FaRegClipboard /></button>
                    </div>
                </div>
            </div >
            <div className="flex container mx-auto px-5 flex-col">
                <p className="text-secondary_text_color text-xl font-bold my-5">Related photo</p>
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-2 place-items-center">
                    {filteredData.map((photo, i) => {
                        const { tags, id, webformatHeight, webformatURL, webformatWidth, type } = photo
                        return (<Picture key={i} width={webformatWidth} height={webformatHeight} src={webformatURL} imageId={id} alt={tags} tags={tags} type={type} />)
                    })}
                </div>
            </div>
        </div>
    );
}

export default PhotoId;