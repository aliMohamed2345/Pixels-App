'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { IoArrowBackSharp, IoImage, IoVideocam } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { IoClose } from "react-icons/io5";
const ResponsiveSearchArea = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [openSearch, setOpenSearch] = useState<boolean>(false)
    const [searchValues, setSearchValues] = useState<string[]>([]);
    const [mediaOption, setMediaOption] = useState<string>("photo")
    const router = useRouter();
    useEffect(() => {
        // Load stored search values from localStorage
        const storedValues = JSON.parse(localStorage.getItem("search-values") || "[]");
        setSearchValues(storedValues.length > 3 ? storedValues.slice(-4) : storedValues);
    }, []);

    const handleSearchBtn = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<SVGElement, MouseEvent>) => {
        if (searchValue.trim()) {
            // Update search values and store in localStorage
            const updatedValues = searchValues.length > 3
                ? [...searchValues, searchValue].slice(-4)
                : [...searchValues, searchValue];
            setSearchValues(updatedValues);
            localStorage.setItem("search-values", JSON.stringify(updatedValues)); // Update localStorage
            setSearchValue("");

            router.push(`/search/${mediaOption}s/${searchValue}?q=${searchValue}`);
        } else {
            e.preventDefault();
        }
    };
    const handleRemoveSearchValue = (value: string) => {
        const storedValues: string[] = JSON.parse(localStorage.getItem("search-values") || "[]");
        const newSearchValue = storedValues.filter((val: string) => val !== value)
        localStorage.setItem('search-values', JSON.stringify(newSearchValue));
        setSearchValues(newSearchValue)
    }

    return (
        <>
            <IoMdSearch size={30} className={`block rounded-full p-1 transition-all md:hidden lg-hidden hover:bg-background_hover text-text_color opacity-90 hover:opacity-100`} onClick={() => setOpenSearch(true)} />

            {openSearch &&
                <div className={` bg-secondary w-full h-[850px] inset-0 absolute `}>
                    <div className="flex items-center gap-2 mt-2">
                        <button
                            onClick={() => setOpenSearch(false)}
                            aria-label="Close menu"
                            className={`hover:bg-slate-200 hover:opacity-100 rounded-full transition-all p-1 dark:text-gray-00 dark:hover:bg-gray-500 dark:text-gray-300 ml-2`}
                        >
                            <IoArrowBackSharp size={25} />
                        </button>
                        <input
                            autoFocus
                            onKeyDown={(e) => e.key === "Enter" && handleSearchBtn(e)}
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                            type="text"
                            placeholder="search..."
                            className="outline-none w-full bg-transparent dark:text-gray-300 rounded-md p-2 placeholder:text-xl"
                        />
                    </div>
                    <div className="h-px w-full bg-gray-400 relative my-4"></div>
                    <div className="w-[80%] rounded-xl bg-slate-50 mx-auto my-4 relative border-2 border-slate-300 dark:border-gray-700 flex items-center transition-all">
                        <button type="button" className={`flex text-gray-700 items-center rounded-l-lg hover:bg-amber-500 justify-center gap-2 p-1 w-1/2 ${mediaOption === 'photo' && 'bg-amber-400'} transition-all hover:opacity-100`} onClick={() => setMediaOption('photo')}>
                            <IoImage />
                            <span>photo</span>
                        </button>
                        <div className="h-full bg-slate-400 w-0.5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        <button type="button" className={`flex text-gray-700 items-center rounded-r-lg hover:bg-amber-500 justify-center gap-2 p-1 w-1/2 transition-all hover:opacity-100 ${mediaOption === 'video' && 'bg-amber-400'}`} onClick={() => setMediaOption('video')} >
                            <IoVideocam />
                            <span>video</span>
                        </button>
                    </div>
                    <div className="h-px w-full bg-gray-400 relative my-4"></div>
                    <div className="mx-3">
                        {searchValues.slice(-4).reverse().map((value, i) => (
                            <Link key={i} href={{ pathname: `/search/${mediaOption}s/${value}`, query: { q: value } }} className="p-3 rounded-md transition-all text-text_color" >
                                <div className="flex items-center justify-between gap-4">
                                    <span className="flex content-start gap-2  items-center">
                                        <FaClockRotateLeft /> {value}
                                    </span>
                                    <IoClose onClick={() => handleRemoveSearchValue(value)} className=" text-text_color hover:bg-secondary transition-all rounded-full" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}

export default ResponsiveSearchArea;
