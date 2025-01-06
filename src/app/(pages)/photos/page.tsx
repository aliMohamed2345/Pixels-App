'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Picture from "@/app/Components/Photo/Picture";
import Loading from '@/app/Components/Photo/Loading';
import FilterWindow from '@/app/Components/Photo/FilterWindow';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { setPathName } from '@/app/redux/Slices/FilterWindowSlice';
import { useDispatch } from 'react-redux';
export interface photoDataProps {
    id: string;
    order: "latest" | "popular";
    imageHeight: number;
    imageSize: number;
    imageWidth: number;
    largeImageURL: string;
    previewHeight: number;
    previewWidth: number;
    previewURL: string;
    tags: string;
    type: string;
    views: number;
    webformatHeight: number;
    webformatWidth: number;
    webformatURL: string;
}


export default function Home() {
    const dispatch = useDispatch()
    const [dataPhotos, setDataPhotos] = useState<photoDataProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1); // Track the current page
    const observerRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [photoOrder, setPhotoOrder] = useState<string>('popular');
    const categories = ["backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"];
    const searchParams = useSearchParams();
    const color = searchParams?.get('color') || ""
    const orientation = searchParams?.get('orientation') || ""
    const imageType = searchParams?.get('imageType') || ""
    const fetchPhotos = useCallback(async (currentPage: number) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PHOTOS_API}?key=${process.env.NEXT_PUBLIC_PHOTOS_API_KEY}&page=${currentPage}&order=${photoOrder}&safesearch=true${orientation && '&orientation=' + orientation}${imageType && '&image_type=' + imageType}${color && '&colors=' + color}`
            );
            const data = await response.json();
            // Remove duplicates based on unique `id`
            setDataPhotos((prevPhotos) => {
                const allPhotos = [...prevPhotos, ...data.hits];
                const uniquePhotos = Array.from(new Map(allPhotos.map(photo => [photo.id, photo])).values());
                return uniquePhotos;
            });
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setIsLoading(false);
        }
    }, [photoOrder, orientation, color, imageType]);

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
        fetchPhotos(page);
    }, [page, fetchPhotos, isLoading]);
    useEffect(() => {
        dispatch(setPathName(`/photos/`))
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
        setPhotoOrder(order);
        setDataPhotos([]);
        setPage(1)
    }

    return (
        <div className="w-full max-w-7xl mx-auto bg-primary px-2">
            <div className="flex items-center gap-5 justify-center pt-20 pb-8">
                <div className="flex flex-col items-center gap-8">
                    <div className=" flex  items-center gap-5">
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
                    <div className="flex items-center gap-2 mx-auto">
                        <MdKeyboardArrowLeft onClick={() => scrollHorizontally(-100)} className='text-sm cursor-pointer rounded-full transition-all text-text_color hover:bg-background_hover w-6 h-6' />
                        <div className='flex gap-3 cursor-pointer mx-1 w-[70vw] overflow-x-hidden' ref={scrollContainerRef}>
                            {categories.map((category, i) =>
                                (<Link href={{ pathname: `/search/photos/${category}`, query: { q: category } }} className="hover:bg-background_hover bg-secondary transition-all text-text_color rounded-lg p-1" key={i}>{category}</Link>))
                            }
                        </div>
                        <MdKeyboardArrowRight onClick={() => scrollHorizontally(100)} className='text-sm rounded-full transition-all text-text_color hover:bg-background_hover cursor-pointer w-6 h-6' />
                    </div>
                </div>
            </div>

            {/* Photo grid */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-2 place-items-center">
                {dataPhotos.filter((photo) => photo?.webformatURL?.trim() !== "").map((photo, i) => {
                    const { tags, id, webformatHeight, webformatURL, webformatWidth, type } = photo;
                    return (<Picture Favorite={true} key={i} width={webformatWidth} height={webformatHeight} src={webformatURL} imageId={id} alt={tags.split(', ')[0]} tags={tags} type={type} />);
                })}
            </div>

            {/* Loading spinner */}
            {isLoading && <Loading numberOfLoadingItems={8} />}

            {/* Intersection observer target */}
            <div ref={observerRef} className="h-4" /></div >
    );
}
