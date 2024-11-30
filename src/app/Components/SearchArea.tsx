'use client';
import { useState, useEffect, useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoImage, IoVideocam } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";
import Link from "next/link";

const SearchArea = () => {

    const [openSearchArea, setOpenSearchArea] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchValues, setSearchValues] = useState<string[]>([]);
    const [MediaOption, setMediaOption ] =useState<string>("Photo")
    const searchAreaRef = useRef<HTMLDivElement>(null);

    // Load stored values from localStorage on mount
    useEffect(() => {
        //this condition for showing only the last 4 elements in which if the length of the localStorage is greater than 4 it will only cut the last 4 elements
        const storedValues = JSON.parse(localStorage.getItem("search-values") || "[]");
        setSearchValues(storedValues.length > 3 ? storedValues.slice(-4) : storedValues);
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

    const handleSearchBtn = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<SVGElement, MouseEvent>) => {
        if (searchValue.trim()) {
            //the same logic here 
            const updatedValues = searchValues.length > 3
                ? [...searchValues, searchValue].slice(-4)
                : [...searchValues, searchValue];
            setSearchValues(updatedValues);
            localStorage.setItem("search-values", JSON.stringify(updatedValues)); // Update localStorage
            setSearchValue("");
        } else {
            e.preventDefault();
        }
    };

    return (
        <div ref={searchAreaRef}>
            <div
                className={`w-[500px] bg-slate-100 dark:bg-gray-700 pl-1 rounded-t-2xl flex gap-3 justify-between items-center relative transition-all ${!openSearchArea && `rounded-b-2xl`
                    }`}
            >
                <IoMdSearch
                    onClick={(e) => handleSearchBtn(e)}
                    className="text-2xl cursor-pointer text-slate-500 "
                />
                <input
                    onKeyDown={(e) => e.key === "Enter" && handleSearchBtn(e)}
                    onClick={() => setOpenSearchArea(true)}
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    type="text"
                    placeholder="search..."
                    className="outline-none border-none w-full h-full bg-transparent dark:text-gray-300 rounded-md p-2 placeholder:text-lg"
                />
            </div>
            <div
                className={`w-[500px] transition-all dark:bg-gray-700 bg-slate-100 absolute rounded-b-2xl ${openSearchArea ? "opacity-100 scale-100 " : "opacity-0 scale-95 "}`}
            >
                <div className="w-full h-0.5 bg-slate-200 mt-1 dark:bg-gray-800"></div>

                <div className="w-[80%] rounded-xl bg-slate-50 mx-auto my-4 relative border-2 border-slate-300 dark:border-gray-700 flex items-center transition-all">
                    <button className="flex text-gray-700 bg-amber-400 items-center rounded-l-lg hover:bg-amber-500 justify-center gap-2 p-1 w-1/2  transition-all hover:opacity-100" onClick={()=>setMediaOption("Photos")}>
                        <IoImage />
                        <span>Photo</span>
                    </button>
                    <div className="h-full bg-slate-400 w-0.5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <button className="flex text-gray-700  items-center rounded-r-lg hover:bg-amber-500 justify-center gap-2 p-1 w-1/2  transition-all hover:opacity-100 " onClick={ ()=>setMediaOption("Videos")}>
                        <IoVideocam />
                        <span>Videos</span>
                    </button>
                </div>
                <div className="w-full h-0.5 bg-slate-200 mt-1 dark:bg-gray-800" ></div>
                <div className="p-3">
                    <ul className="flex content-start gap-2 w-full flex-col">
                        {searchValues.slice(-4).reverse().map((value, i) => (
                            <Link
                                key={i}
                                href="#"
                                className="p-3 rounded-md dark:hover:bg-gray-500 hover:bg-slate-300 hover:opacity-100 transition-all text-slate-500 dark:text-gray-300"
                            >
                                <li className="flex content-start gap-2 w-full items-center">
                                    <FaClockRotateLeft /> {value}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchArea;
