'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaImage, FaVideo } from "react-icons/fa6";
import Picture from "@/app/Components/Photo/Picture";
import { PictureProps } from "@/app/Components/Photo/Picture";
import Video, { VideoProps } from "@/app/Components/Video/Video";
const Favorite = () => {
    const [currentMedia, setCurrentMedia] = useState<'photos' | 'videos'>('photos');
    const [favoritePhotos, setFavoritePhotos] = useState<PictureProps[]>([]);
    const [favoriteVideos, setFavoriteVideos] = useState<VideoProps[]>([]);
    console.log(favoritePhotos.length == 0 && currentMedia === 'photos')
    useEffect(() => {
        // Fetch favorites from localStorage depend on the currentMedia
        if (currentMedia === 'photos') {
            const storedPhotos = localStorage.getItem('favorite-photos');
            if (storedPhotos) {
                try {
                    const parsedPhotos = JSON.parse(storedPhotos);
                    setFavoritePhotos(parsedPhotos);
                } catch (error) {
                    console.error("Error parsing favorite photos:", error);
                    setFavoritePhotos([]);
                }
            }
        }
        else if (currentMedia === 'videos') {
            const storedVideos = localStorage.getItem('favorite-videos');
            if (storedVideos) {
                try {
                    const parsedVideos = JSON.parse(storedVideos);
                    setFavoriteVideos(parsedVideos);
                } catch (error) {
                    console.error("Error parsing favorite photos:", error);
                    setFavoriteVideos([]);
                }
            }
        }
    }, [currentMedia]);
    return (<>
        <h5 className='pt-20 text-center text-4xl text-teal-500 font-bold'>Favorites</h5>

        <div className="flex items-center my-7  mx-auto justify-around w-[200px] sm:w-[300px]  md:w-[400px] lg:w-[500px] bg-secondary  rounded-full text-text_color   relative">
            <div className={`bg-primary absolute inset-0 w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] ${currentMedia === 'photos' ? `left-0` : `left-[90px] sm:left-[140px] md:left-[190px] lg:left-[240px]`} transition-all  rounded-full z-2 m-1 flex items-center justify-center`}>
                <button className="font-bold text-secondary_text_color mx-auto rounded-full">
                    {currentMedia}
                </button>
            </div>
            <button onClick={() => { setCurrentMedia('photos') }} type="button" className="font-bold text-secondary_text_color  p-4 w-full rounded-full">photos</button>
            <button onClick={() => { setCurrentMedia('videos') }} type="button" className="font-bold text-secondary_text_color p-4 w-full rounded-full">videos</button>
        </div>
        {favoritePhotos.length === 0 && currentMedia === 'photos' &&
            <div className="mx-auto text-center">
                <FaImage className="text-text_color bg-secondary text-md w-[350px] h-[350px] p-5 rounded-xl inline" size={300} />
                <p className={`text-xl mt-5 text-text_color`}>
                    No {currentMedia}, Add <Link href={`/${currentMedia}`} className="text-green-500 ">{currentMedia} here</Link>
                </p>
            </div>
        }
        {favoritePhotos.length === 0 && currentMedia === 'videos' &&
            <div className="mx-auto text-center">
                <FaVideo className="text-text_color bg-secondary text-md w-[350px] h-[350px] p-5 rounded-xl inline" size={300} />
                <p className={`text-xl mt-5 text-text_color`}>
                    No {currentMedia}, Add <Link href={`/${currentMedia}`} className="text-green-500 ">{currentMedia} here</Link>
                </p>
            </div>
        }
        {currentMedia === 'photos' && favoritePhotos.length &&
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-2 place-items-center">
                {favoritePhotos.map((photo, i) => {
                    const { tags, imageId, width, height, src, type } = photo;
                    return (
                        <Picture
                            key={i}
                            width={width}
                            height={height}
                            src={src}
                            imageId={imageId}
                            alt={tags?.split(', ')[0] || "Favorite photo"}
                            tags={tags}
                            type={type}
                        />
                    );
                })}
            </div>
        }
        {currentMedia === 'videos' && favoriteVideos.length &&
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-2 place-items-center">
                {favoriteVideos.map((video, i) => {
                    const { tags, videoId, duration, thumbnailSrc, width, height, src, type } = video;
                    return (
                        <Video videos={video.videos}
                            key={i}
                            thumbnailSrc={thumbnailSrc}
                            width={width}
                            duration={duration}
                            height={height}
                            src={src}
                            videoId={videoId}
                            tags={tags}
                            type={type}
                            alt={tags.split(', ')[0]}
                        />
                    );
                })}
            </div>
        }
    </>);
}
export default Favorite;
