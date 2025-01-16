'use client';

import Link from "next/link";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useState, useEffect } from "react";

export interface PictureProps {
    width: number;
    height: number;
    alt: string;
    src: string;
    imageId: string;
    tags: string;
    type: string;
    Favorite: boolean;
}

const Picture = ({ width, type, height, src, alt, imageId, tags, Favorite }: PictureProps) => {
    const [isFavorite, setIsFavorite] = useState(Favorite);
    // Effect to check if the image is already in the favorites from localStorage
    useEffect(() => {
        const storedPhotos = localStorage.getItem('favorite-photos');
        const previousPhotos: PictureProps[] = storedPhotos ? JSON.parse(storedPhotos) : [];

        // Check if the current photo is already in favorites
        const isAlreadyFavorite = previousPhotos.some(photo => photo.imageId === imageId);
        setIsFavorite(isAlreadyFavorite);
    }, [imageId]);

    // Handle the favorite button click
    const handleFavoriteBtn = () => {
        // Toggle the favorite state
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);

        // Get the existing favorite photos from localStorage
        let previousPhotos: PictureProps[] = [];
        const storedPhotos = localStorage.getItem('favorite-photos');
        previousPhotos = storedPhotos ? JSON.parse(storedPhotos) : [];

        if (newFavoriteState) {
            // Add the current photo to the favorites
            const currentPhoto = { width, height, src, alt, imageId, type, tags, Favorite: true };
            const newPhotos = [...previousPhotos, currentPhoto];
            localStorage.setItem('favorite-photos', JSON.stringify(newPhotos));
        } else {
            // Remove the current photo from favorites
            const updatedPhotos = previousPhotos.filter(photo => photo.imageId !== imageId);
            localStorage.setItem('favorite-photos', JSON.stringify(updatedPhotos));
        }
    };

    return (
        <div className="relative mb-2">
            {/* Ensure every image has a src */}
            {src && src.trim() !== "" ? (
                <img
                    width={width}
                    height={height}
                    src={src}
                    alt={alt}
                    className="rounded-md"
                    loading="lazy"
                />
            ) : (
                <div className={`w-[${width}] h-[${height}] bg-gray-200 w-full h-full flex items-center justify-center`}>
                    <p className="text-gray-500">No Image Available</p>
                </div>
            )}

            {/* Overlay */}
            <div className={`absolute inset-0 bg-black/50 transition-opacity opacity-0 hover:opacity-100 rounded-md`}>
                {/* Navigate to photo details */}
                <Link
                    href={{
                        pathname: `/photos/${tags.split(', ')[0]}`,
                        query: { imageId, tags, type, width, height, src, alt, Favorite: +isFavorite },
                    }}
                    className="absolute inset-0"
                >
                    <span className="sr-only">View Photo</span>
                </Link>
                {/* Favorite button */}
                <button
                    type="button"
                    className="absolute top-2 left-2 text-2xl text-rose-500 transition-opacity hover:bg-gray-400 hover:opacity-80 rounded-full p-1"
                    onClick={handleFavoriteBtn}
                >
                    {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
                </button>
            </div>
        </div>
    );
};

export default Picture;
