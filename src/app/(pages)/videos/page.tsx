'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Video from "@/app/Components/Video/Video";
import Loading from '@/app/Components/Photo/Loading';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FilterWindowVideoSection from '@/app/Components/Video/FilterWindowVideoSection'
import { useDispatch } from 'react-redux';
import { setPathName } from '@/app/redux/Slices/FilterWindowSlice';
export interface videoDataProps {
    id: number;
    duration: number;
    order: "latest" | "popular";
    tags: string;
    type: string;
    videos: VideosProps
}
export interface VideosProps {
    large: { url: string, width: number, height: number, size: number, thumbnail: string }
    medium: { url: string, width: number, height: number, size: number, thumbnail: string }
    small: { url: string, width: number, height: number, size: number, thumbnail: string }
    tiny: { url: string, width: number, height: number, size: number, thumbnail: string }
}

function Videos() {
    const dispatch = useDispatch()
    const [dataVideos, setDataVideos] = useState<videoDataProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1); // Track the current page
    const observerRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [videoOrder, setVideoOrder] = useState<string>('popular');
    const categories = ["backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"];
    const searchParams = useSearchParams();
    const videoType = searchParams?.get('videoType') || ""
    const fetchVideos = useCallback(async (currentPage: number) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_VIDEOS_API}?key=${process.env.NEXT_PUBLIC_VIDEOS_API_KEY}&page=${currentPage}&order=${videoOrder}&safesearch=true${videoType && '&video_type=' + videoType}`);
            const data = await response.json();
            setDataVideos((prevPhotos) => {
                const allVideos = [...prevPhotos, ...data.hits];
                const uniqueVideos = Array.from(new Map(allVideos.map(video => [video.id, video])).values());
                return uniqueVideos;
            });
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setIsLoading(false);
        }
    }, [videoOrder, videoType]);


    const scrollHorizontally = (scrollAmount: number) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    }

    // Fetch photos on page load and page change
    useEffect(() => {
        fetchVideos(page);
    }, [page, fetchVideos, isLoading]);

    useEffect(() => {
        dispatch(setPathName(`/videos/`))
    }, [dispatch])
    // Set up intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1); // Increment page when the target is visible
                }
            },
            { threshold: 0.5 }
        );
        const observerElement = observerRef.current;
        if (observerElement) {
            observer.observe(observerElement);
        }
        return () => {
            if (observerElement) {
                observer.unobserve(observerElement);
            }
        };
    }, []);
    const handlePhotoOrder = (order: string) => {
        setVideoOrder(order);
        setDataVideos([]);
        setPage(1)
    }

    return (
        <div className="w-full max-w-7xl mx-auto bg-primary px-2">
            <div className="flex items-center gap-5 justify-center pt-20 pb-8">
                <div className="flex flex-col items-center gap-8">
                    <div className=" flex  items-center gap-5">
                        <div className="flex items-center justify-around w-[200px] sm:w-[300px]  md:w-[400px] lg:w-[500px] bg-secondary  rounded-full text-text_color   relative">
                            <div className={`bg-primary absolute inset-0 w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] ${videoOrder === 'latest' ? `left-0` : `left-[90px] sm:left-[140px] md:left-[190px] lg:left-[240px]`} transition-all  rounded-full z-2 m-1 flex items-center justify-center`}>
                                <button className="font-bold text-secondary_text_color mx-auto rounded-full">
                                    {videoOrder}
                                </button>
                            </div>
                            <button onClick={() => { handlePhotoOrder('latest') }} type="button" className="font-bold text-secondary_text_color  p-4 w-full rounded-full">latest</button>
                            <button onClick={() => { handlePhotoOrder('popular') }} type="button" className="font-bold text-secondary_text_color p-4 w-full rounded-full">popular</button>
                        </div>
                        <FilterWindowVideoSection  />
                    </div>
                    <div className="flex items-center gap-2 mx-auto">
                        <MdKeyboardArrowLeft onClick={() => scrollHorizontally(-100)} className='text-sm cursor-pointer rounded-full transition-all text-text_color hover:bg-background_hover w-6 h-6' />
                        <div className='flex gap-3 cursor-pointer mx-1 w-[70vw] overflow-x-hidden' ref={scrollContainerRef}>
                            {categories.map((category, i) =>
                                (<Link href={{ pathname: `/search/videos/${category}`, query: { q: category } }} className="hover:bg-background_hover bg-secondary transition-all text-text_color rounded-lg p-1" key={i}>{category}</Link>))
                            }
                        </div>
                        <MdKeyboardArrowRight onClick={() => scrollHorizontally(100)} className='text-sm rounded-full transition-all text-text_color hover:bg-background_hover cursor-pointer w-6 h-6' />
                    </div>
                </div>
            </div>

            {/* Photo grid */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-2 place-items-center">
                {dataVideos.filter((video) => video.videos.small.url.trim() !== "").map((video, i) => {
                    const { tags, id, type, duration } = video;
                    const { width, height, url, thumbnail } = video.videos.tiny
                    return (<Video Favorite={true} videos={video.videos} key={i} thumbnailSrc={thumbnail} width={width} duration={duration} height={height} src={url} videoId={id} tags={tags} type={type} alt={tags.split(', ')[0]} />);
                })}
            </div>

            {/* Loading spinner */}
            {isLoading && <Loading numberOfLoadingItems={8} />}

            {/* Intersection observer target */}
            <div ref={observerRef} className="h-4" /></div >
    );
}
export default Videos; 