'use client';

import Link from "next/link";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";

interface PictureProps {
    width: number;
    height: number;
    alt: string;
    src: string;
    imageId: string;
    tags: string;
    type: string
}

const Picture = ({ width, type, height, src, alt, imageId, tags }: PictureProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div
            className="relative mb-2">
            {/* Ensure every image has a src */}
            {src && src.trim() !== "" ? (
                <Image
                    loading="lazy"
                    width={width}
                    height={height}
                    src={src}
                    alt={alt}
                    className="rounded-md"
                />
            ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <p className="text-gray-500">No Image Available</p>
                </div>
            )}

            {/* Overlay */}
            <div
                className={`absolute inset-0 bg-black/50 transition-opacity opacity-0 hover:opacity-100 rounded-md`}
            >
                {/* Navigate to photo details */}
                <Link href={{ pathname: `/photos/${imageId}`, query: { imageId, tags, type, width, height, src } }} className="absolute inset-0">
                    <span className="sr-only">View Photo</span>
                </Link>
                {/* Favorite button */}
                <button
                    type="button"
                    className="absolute top-2 left-2 text-2xl text-rose-500 transition-opacity hover:bg-gray-400 hover:opacity-80 rounded-full p-1"
                    onClick={(e) => {
                        e.preventDefault(); // Prevent navigation if the button is clicked
                        setIsFavorite((prev) => !prev);
                    }}
                >
                    {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
                </button>
            </div>
        </div>
    );
};

export default Picture;
