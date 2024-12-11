'use client'
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { photoDataProps } from "@/app/(pages)/photos/page";
import Picture from "@/app/Components/Photo/Picture";
import FilterWindow from "@/app/Components/Photo/FilterWindow";
import Loading from "@/app/Components/Photo/Loading";

const PhotoId = () => {
    const [searchedData, setSearchedData] = useState<photoDataProps[]>([]);
    const [totalHits, setTotalHits] = useState<number>(0)
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const searchedValue = useSearchParams().get('q');
    const orientation = useSearchParams().get('orientation') || "";
    const color = useSearchParams().get('color') || "";
    const imageType = useSearchParams().get('imageType') || "";

    const fetchPhotos = useCallback(async (currentPage: number) => {
        if (!searchedValue) return;

        try {
            setIsLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PHOTOS_API}?key=${process.env.NEXT_PUBLIC_PHOTOS_API_KEY}&safesearch=true&page=${currentPage}&q=${searchedValue}${orientation && '&orientation=' + orientation}${imageType && '&image_type=' + imageType}${color && '&colors=' + color}`
            );
            const data = await response.json();
            setTotalHits(data.total);
            setSearchedData((prevPhotos) => {
                const allPhotos = [...prevPhotos, ...data.hits];
                const uniquePhotos = Array.from(
                    new Map(allPhotos.map((photo) => [photo.id, photo])).values()
                );
                return uniquePhotos;
            });
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setIsLoading(false);
        }
    }, [searchedValue, color, imageType, orientation]);

    useEffect(() => {
        fetchPhotos(page);
    }, [page, fetchPhotos, isLoading]); // Only depend on page

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
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
    }, []); // Set observer to run only once

    return (
        <div className="pt-20 text-secondary_text_color container mx-auto px-2">
            {isLoading ? <Loading numberOfLoadingItems={10} /> :
                <>
                    <div className="flex items-center gap-3">
                        <p className="font-bold text-sm md:text-md lg:text-lg my-5">{totalHits} free Images about {searchedValue}</p>
                        <FilterWindow pathName={`/search/photos/${searchedValue}`} searchQuery={`${searchedValue}`} />
                    </div>
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-2 place-items-center">
                        {searchedData.map((photo) => {
                            const { tags, id, webformatHeight, webformatURL, webformatWidth, type } = photo;
                            return (
                                <Picture key={id} width={webformatWidth} height={webformatHeight} src={webformatURL} imageId={id} alt={tags.split(', ')[0]} tags={tags} type={type} />
                            );
                        })}
                    </div>
                </>
            }
            {/* Loading spinner */}
            {isLoading && <Loading numberOfLoadingItems={8} />}

            <div ref={observerRef} className="h-4" />
        </div>
    );
};

export default PhotoId;
