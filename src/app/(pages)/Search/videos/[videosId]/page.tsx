'use client'
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import Video from "@/app/Components/Video/Video";
import Loading from "@/app/Components/Photo/Loading";
import { videoDataProps } from "@/app/(pages)/videos/page";
import FilterWindowVideoSection from "@/app/Components/Video/FilterWindowVideoSection";
import { useDispatch } from "react-redux";
import { setPathName, setSearchQuery } from "@/app/redux/Slices/FilterWindowSlice";
const VideoId = () => {
    const dispatch = useDispatch()
    const [searchedData, setSearchedData] = useState<videoDataProps[]>([]);
    const [totalHits, setTotalHits] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const searchedValue = useSearchParams().get('q');
    const videoType = useSearchParams()?.get('videoType') || "";


    // Function to fetch videos based on the current page
    const fetchVideos = useCallback(async (currentPage: number) => {
        if (!searchedValue) return;
        // Prevent fetching if already loading
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_VIDEOS_API}?key=${process.env.NEXT_PUBLIC_VIDEOS_API_KEY}&safesearch=true&page=${currentPage}&q=${searchedValue}${videoType && '&image_type=' + videoType}`
            );
            const data = await response.json();
            // Update the state with new data
            setTotalHits(data.total);
            setSearchedData((prevVideos) => {
                const allVideos = [...prevVideos, ...data.hits];
                // Ensure unique videos
                const uniqueVideos = Array.from(
                    new Map(allVideos.map((video) => [video.id, video])).values()
                );
                return uniqueVideos;
            });
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setIsLoading(false);
        }
    }, [searchedValue, videoType]);

    useEffect(() => {
        dispatch(setPathName(`/search/videos/${searchedValue}`))
        dispatch(setSearchQuery(String(searchedValue)))
    }, [dispatch, searchedValue])
    // Fetch videos when the page or search value changes
    useEffect(() => {
        if (!searchedValue) return; // Do not fetch if no search term
        fetchVideos(page); // Fetch based on the current page
    }, [page, searchedValue, fetchVideos]);

    // Intersection Observer for infinite scrolling
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    setPage((prevPage) => prevPage + 1); // Increment page when bottom is reached
                }
            },
            { threshold: 0.5 }
        );
        const observerElement = observerRef.current;
        if (observerElement) {
            observer.observe(observerElement); // Observe the bottom div for scrolling
        }

        // Cleanup observer when the component unmounts or observer element changes
        return () => {
            if (observerElement) {
                observer.unobserve(observerElement);
            }
        };
    }, [isLoading]); // Re-run observer only if isLoading changes

    return (
        <div className="pt-20 text-secondary_text_color container mx-auto px-2">
            {isLoading ? (
                <Loading numberOfLoadingItems={10} /> // Show loading state while fetching
            ) : (
                <>
                    <div className="flex items-center gap-3">
                        <p className="font-bold text-sm md:text-md lg:text-lg my-5">
                            {totalHits} free Videos about {searchedValue}
                        </p>
                        <FilterWindowVideoSection />
                    </div>
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-2 place-items-center">
                        {searchedData
                            .filter((video) => video.videos.small.url.trim() !== "")
                            .map((video) => {
                                const { tags, id, type, duration } = video;
                                const { width, height, url, thumbnail } = video.videos.tiny;
                                return (
                                    <Video
                                        videos={video.videos}
                                        duration={duration}
                                        thumbnailSrc={thumbnail}
                                        key={id}
                                        width={width}
                                        height={height}
                                        src={url}
                                        videoId={id}
                                        alt={tags.split(', ')[0]}
                                        tags={tags}
                                        type={type}
                                        Favorite={true}
                                    />
                                );
                            })}
                    </div>
                </>
            )}

            {/* Show loading spinner for new data */}
            {isLoading && <Loading numberOfLoadingItems={8} />}

            {/* Invisible div to trigger intersection observer */}
            <div ref={observerRef} className="h-4" />
        </div>
    );
};

export default VideoId;
