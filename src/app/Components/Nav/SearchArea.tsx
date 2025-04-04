'use client';
import { useState, useEffect, useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoClose, IoImage, IoVideocam } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchArea = () => {
    const [openSearchArea, setOpenSearchArea] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchValues, setSearchValues] = useState<string[]>([]);
    const [mediaOption, setMediaOption] = useState<string>("photo")
    const searchAreaRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    // Load stored values from localStorage on mount
    useEffect(() => {
        try {
            const storedValues = localStorage.getItem("search-values");
            //this code to store the value of search in local storage variable that contain an array of 4 element 
            if (storedValues) {
                // Try parsing the stored values
                const parsedValues = JSON.parse(storedValues);
                // Ensure the parsed data is an array
                if (Array.isArray(parsedValues)) {
                    setSearchValues(parsedValues.length > 3 ? parsedValues.slice(-4) : parsedValues);
                } else {
                    localStorage.setItem("search-values", JSON.stringify([]));
                    setSearchValues([]);
                }
            } else {
                setSearchValues([]);
            }
        } catch (error) {
            console.error("Failed to parse search-values from localStorage:", error);
            localStorage.setItem("search-values", JSON.stringify([]));
            setSearchValues([]);
        }
    }, []);

    // Close the search area when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!searchAreaRef?.current?.contains(event.target as Node)) {
                setOpenSearchArea(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchBtn = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<SVGElement, MouseEvent>) => {//+
        if (searchValue.trim()) {
            //the same logic here
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
        <div ref={searchAreaRef}>
            <div
                className={`w-[500px] bg-primary pl-1 rounded-t-2xl flex gap-3 justify-between items-center relative transition-all ${!openSearchArea && `rounded-b-2xl`
                    }`}
            >
                <IoMdSearch
                    onClick={(e) => handleSearchBtn(e)}
                    className="text-2xl cursor-pointer text-text_color "
                />
                <input
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleSearchBtn(e)}
                    onClick={() => setOpenSearchArea(true)}
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    type="text"
                    placeholder="search..."
                    className="outline-none text-text_color border-none w-full h-full bg-transparent  rounded-md p-2 placeholder:text-lg"
                />
            </div>
            <div className={`w-[500px] transition-all ease-in-out bg-primary z-10 absolute rounded-b-2xl ${openSearchArea ? "opacity-100 scale-100 top-[49px] " : "opacity-0 scale-90 top-[-600px] "}`}>
                <div className="w-full h-0.5 bg-slate-200 mt-1 dark:bg-gray-800"></div>

                <div className="w-[80%] rounded-xl bg-slate-50 mx-auto my-4 relative border-2 border-slate-300 dark:border-gray-700 flex items-center transition-all">
                    <button type="button" className={`flex text-gray-700  items-center rounded-l-lg hover:bg-amber-500 justify-center gap-2 p-1 w-1/2 ${mediaOption === 'photo' && 'bg-amber-400'} transition-all hover:opacity-100`} onClick={() => setMediaOption('photo')}>
                        <IoImage />
                        <span>photo</span>
                    </button>
                    <div className="h-full bg-slate-400 w-0.5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <button type="button" className={`flex text-gray-700  items-center rounded-r-lg hover:bg-amber-500 justify-center gap-2 p-1 w-1/2  transition-all hover:opacity-100 ${mediaOption === 'video' && 'bg-amber-400'}`} onClick={() => setMediaOption('video')} >
                        <IoVideocam />
                        <span>video</span>
                    </button>
                </div>
                <div className="w-full h-0.5 bg-slate-200 mt-1 dark:bg-gray-800" ></div>
                <div className="p-3">
                    <div className="flex content-start gap-2 w-full flex-col">
                        {searchValues.slice(-4).reverse().map((value, i) => (
                            <Link
                                key={i}
                                href={{ pathname: `/search/${mediaOption}s/${value}`, query: { q: value } }}
                                className="p-3 rounded-md hover:bg-background_hover hover:opacity-100 transition-all text-text_color"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="flex content-start gap-2 w-full items-center">
                                        <FaClockRotateLeft /> {value}
                                    </span>
                                    <IoClose onClick={() => handleRemoveSearchValue(value)} className=" text-text_color hover:bg-secondary transition-all rounded-full" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SearchArea;
