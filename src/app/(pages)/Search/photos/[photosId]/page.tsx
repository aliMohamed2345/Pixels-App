'use client'
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { photoDataProps } from "@/app/(pages)/photos/page";
import Picture from "@/app/Components/Photo/Picture";
import DropdownMenu from "@/app/Components/Home/DropDownMenu";
import Loading from "@/app/Components/Photo/Loading";
const PhotoId = () => {
    const [searchedData, setSearchedData] = useState<photoDataProps[]>([]);
    const [totalHits, setTotalHits] = useState<number>(0)
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const searchedValue = useSearchParams().get('q');
    const imageTypes = ["all", "photo", "illustration", "vector"];
    const orientation = ["all", "horizontal", "vertical"];

    const fetchPhotos = useCallback(async (currentPage: number) => {
        if (!searchedValue) return;

        try {
            setIsLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PHOTOS_API}?key=${process.env.NEXT_PUBLIC_PHOTOS_API_KEY}&safesearch=true&page=${currentPage}&q=${searchedValue}`
            );
            const data = await response.json();
            console.log(data);
            setTotalHits(data.total)
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
    }, [searchedValue]);

    useEffect(() => {
        fetchPhotos(page);
    }, [page, fetchPhotos]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 0.1 }
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
    }, [isLoading]);

    return (
        <div className="pt-20 text-secondary_text_color container mx-auto px-2">
            <p className="font-bold text-sm md:text-md lg:text-lg my-5">{totalHits} free Images about {searchedValue}</p>
            {isLoading ? <Loading numberOfLoadingItems={10} /> :
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-2 place-items-center">
                    {searchedData.map((photo) => {
                        const { tags, id, webformatHeight, webformatURL, webformatWidth, type } = photo;
                        return (
                            <Picture key={id} width={webformatWidth} height={webformatHeight} src={webformatURL} imageId={id} alt={tags} tags={tags} type={type} />
                        );
                    })}
                </div>
            }
            <div ref={observerRef} className="h-10 w-full"></div>
        </div>
    );
};

export default PhotoId;
