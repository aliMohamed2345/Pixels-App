'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Picture from "@/app/Components/Photo/Picture";
import Loading from '@/app/Components/Photo/Loading';
import FilterWindow from '@/app/Components/Photo/FilterWindow';
interface photoDataProps {
    id: string;
    order: "latest" | "popular";
    collection: number;
    likes: number;
    comments: number;
    downloads: number;
    imageHeight: number;
    imageSize: number;
    imageWidth: number;
    largeImageURL: string;
    previewHeight: number;
    previewWidth: number;
    previewURL: string;
    tags: string;
    type: string;
    user: string;
    userImageURL: string;
    user_id: number;
    views: number;
    webformatHeight: number;
    webformatWidth: number;
    webformatURL: string;
}

export default function Home() {
    const [dataPhotos, setDataPhotos] = useState<photoDataProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1); // Track the current page
    const observerRef = useRef<HTMLDivElement | null>(null); // Ref for the intersection observer
    const [photoOrder, setPhotoOrder] = useState<string>('popular');
    // Fetch photos function 
    const fetchPhotos = useCallback(async (currentPage: number) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PHOTOS_API}?key=${process.env.NEXT_PUBLIC_PHOTOS_API_KEY}&page=${currentPage}&order=${photoOrder}&safesearch=true`
            );
            const data = await response.json();
            setDataPhotos((prevPhotos) => [...prevPhotos, ...data.hits]); // Append new photos
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setIsLoading(false);
        }
    }, [photoOrder]);

    // Fetch photos on page load and page change
    useEffect(() => {
        fetchPhotos(page);
    }, [page, fetchPhotos]);

    // Set up intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1); // Increment page when the target is visible
                }
            },
            { threshold: 1.0 }
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
        setPhotoOrder(order);
        setDataPhotos([]);
        setPage(1)
    }

    return (
        <div className="w-full max-w-7xl mx-auto bg-primary px-1">
            <div className="flex items-center gap-5 justify-center pt-20 pb-8">
                <div className="flex items-center justify-around w-[200px] sm:w-[300px]  md:w-[400px] lg:w-[500px] bg-secondary  rounded-full text-text_color   relative">
                    <div className={`bg-primary absolute inset-0 w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] ${photoOrder === 'latest' ? `left-0` : `left-[90px] sm:left-[140px] md:left-[190px] lg:left-[240px]`} transition-all  rounded-full z-2 m-1 flex items-center justify-center`}>
                        <button className="font-bold text-secondary_text_color mx-auto rounded-full">
                            {photoOrder}
                        </button>
                    </div>
                    <button onClick={() => { handlePhotoOrder('latest') }} type="button" className="font-bold text-secondary_text_color  p-4 w-full rounded-full">latest</button>
                    <button onClick={() => { handlePhotoOrder('popular') }} type="button" className="font-bold text-secondary_text_color p-4 w-full rounded-full">popular</button>
                </div>
                <FilterWindow />
            </div>

            {/* Photo grid */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-2 place-items-center">
                {dataPhotos.filter((photo) => photo?.webformatURL?.trim() !== "").map((photo, i) => {
                    const { tags, id, webformatHeight, webformatURL, webformatWidth, userImageURL, user, user_id } = photo;
                    return (
                        <Picture
                            key={i}
                            width={webformatWidth}
                            height={webformatHeight}
                            src={webformatURL}
                            imageId={id}
                            alt={tags}
                            user={user}
                            tags={tags}
                            userImageURL={userImageURL}
                            userId={user_id}
                        />
                    );
                })}
            </div>

            {/* Loading spinner */}
            {isLoading && <Loading numberOfLoadingItems={8} />}

            {/* Intersection observer target */}
            <div ref={observerRef} className="h-4" />
        </div >
    );
}
