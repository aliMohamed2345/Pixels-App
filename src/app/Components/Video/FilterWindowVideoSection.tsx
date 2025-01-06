'use client'
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import DropdownMenu from "../Home/DropDownMenu";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
interface filterDataProps {
    videoTypes: string,
}
const InitialFilterData: filterDataProps = {
    videoTypes: ''
}
const FilterWindowVideoSection = () => {
    const videoType = ["all", "film", "animation"];
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [filterData, setFilterData] = useState<filterDataProps>(InitialFilterData);
    const { pathName, searchQuery } = useSelector((state: RootState) => state.FilterWindow)
    const handleDropdownChange = (key: keyof filterDataProps, value: string) => {
        setFilterData((prev) => ({ ...prev, [key]: value }));
    };
    return (
        <>
            <button
                onClick={() => setIsFilterOpen(true)}
                title="filter"
                className="text-text_color hover:bg-background_hover w-8 flex items-center justify-center h-8 rounded-full transition-all"
            >
                <FaFilter />
            </button>
            {isFilterOpen && (
                <div
                    onClick={() => setIsFilterOpen(false)}
                    className="fixed inset-0 bg-black/80 z-10"
                ></div>
            )}
            <div
                className={`w-[80vw] h-auto overflow-auto z-10 bg-primary duration-300 transform -translate-x-1/2 -translate-y-1/2 fixed left-[50%] text-text_color transition-all ${isFilterOpen
                    ? `opacity-100 scale-100 top-[50%]`
                    : `opacity-0 scale-0 top-[-300px]`
                    } rounded-lg container mx-auto`}
            >
                <button
                    title="close"
                    onClick={() => setIsFilterOpen(false)}
                    className="block justify-self-end p-2 m-3 rounded-full transition-all hover:bg-background_hover w-8 h-8"
                >
                    <MdClose className="text-text_color" />
                </button>

                <h4 className="text-center font-bold my-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    Filter By
                </h4>
                <div className="flex gap-3 my-10 mx-auto justify-around items-center flex-col lg:flex-row md:flex-row">
                    <DropdownMenu header="video type" items={videoType} onSelectionChange={(value) => handleDropdownChange("videoTypes", value)} />
                </div>
                <Link onClick={() => setIsFilterOpen(false)} className="w-5/6 p-2 rounded-md bg-secondary hover:bg-background_hover transition-all m-auto mb-12 block text-center" href={{ pathname: `${pathName}`, query: { videoType: filterData.videoTypes, q: `${searchQuery}` } }}> Apply</Link>
            </div >
        </>
    );
};


export default FilterWindowVideoSection;