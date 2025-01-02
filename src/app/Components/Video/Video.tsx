'use client';
import Image from "next/image";
import Link from "next/link";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { VideosProps } from "@/app/(pages)/videos/page";

export interface VideoProps {
    width: number;
    height: number;
    src: string;
    videoId: number;
    tags: string;
    type: string;
    duration: number;
    thumbnailSrc: string;
    alt: string;
    videos: VideosProps;
    Favorite: boolean;
}

const Video = ({ width, type, height, src, tags, duration, alt, thumbnailSrc, videos, videoId, Favorite }: VideoProps) => {
    const [isFavorite, setIsFavorite] = useState(Favorite);
    const [isPlayed, setIsPlayed] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Check if the current videoId exists in localStorage
        const storedVideos = localStorage.getItem('favorite-videos');
        const parsedVideos: VideoProps[] = storedVideos ? JSON.parse(storedVideos) : [];

        const isVideoFavorite = parsedVideos.some(video => video.videoId === videoId);
        setIsFavorite(isVideoFavorite);
    }, [videoId]);

    const handleMouseEnter = () => {
        setIsPlayed(true);
        if (videoRef.current) {
            videoRef.current.currentTime = 0; // Restart video
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        setIsPlayed(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const handleFavoriteVideoBtn = (id: number) => {
        setIsFavorite(prev => !prev);
        let previousVideos: VideoProps[] = [];
        const storedVideos = localStorage.getItem('favorite-videos');
        previousVideos = storedVideos ? JSON.parse(storedVideos) : [];

        if (isFavorite) {
            // Remove video from favorites
            const updatedVideos = previousVideos.filter(video => video.videoId !== id);
            localStorage.setItem('favorite-videos', JSON.stringify(updatedVideos));
        } else {
            // Add video to favorites
            const currentVideo = { width, height, src, alt, duration, thumbnailSrc, videos, type, tags, videoId };
            const newVideo = [...previousVideos, currentVideo];
            localStorage.setItem('favorite-videos', JSON.stringify(newVideo));
        }
    };

    return (
        <div className="relative mb-2">
            {/* Ensure every image has a src */}
            {src && src.trim() !== "" ? (
                <>
                    <Image loading="lazy" width={width} height={height} src={thumbnailSrc} alt={alt} className={`rounded-md transition-opacity ${isPlayed ? "opacity-0" : "opacity-100"}`} />
                    <video ref={videoRef} width={width} height={height} src={src} loop muted className={`rounded-md absolute top-0 left-0 w-full h-full object-cover transition-opacity ${isPlayed ? "opacity-100" : "opacity-0"}`} />
                </>
            ) : (
                <div className={`w-[${width}] h-[${height}] bg-gray-200 flex items-center justify-center`}>
                    <p className="text-gray-500">No Image Available</p>
                </div>
            )}

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 transition-opacity opacity-0 hover:opacity-100 rounded-md"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Navigate to video details */}
                <Link
                    href={{
                        pathname: `/videos/${tags.split(", ")[0]}`,
                        query: { tags, alt, thumbnailSrc, videoId, type, width, height, src, duration, videos: JSON.stringify(videos), Favorite: +isFavorite },
                    }}
                    className="absolute inset-0"
                >
                    <span className="sr-only">View Video</span>
                </Link>
                {/* Favorite button */}
                <button
                    type="button"
                    className="absolute top-2 left-2 text-2xl text-rose-500 transition-opacity hover:bg-gray-400 hover:opacity-80 rounded-full p-1"
                    onClick={() => handleFavoriteVideoBtn(videoId)}
                >
                    {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
                </button>
            </div>
        </div>
    );
};

export default Video;
