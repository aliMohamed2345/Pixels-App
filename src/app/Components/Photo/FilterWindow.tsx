'use client'
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import DropdownMenu from "../Home/DropDownMenu";
import Link from "next/link";
interface filterDataProps {
    imageTypes: string,
    orientation: string,
    color: string
}
const InitialfilterData: filterDataProps = {
    imageTypes: "",
    orientation: "",
    color: ""
}
const FilterWindow = () => {
    const imageTypes = ["all", "photo", "illustration", "vector"];
    const orientation = ["all", "horizontal", "vertical"];
    const colors = ["red", "orange", "yellow", "green", "turquoise", "blue", "pink", "white", "gray", "black", "brown"]
    const [currentColor, setCurrentColor] = useState<string>("")
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [filterData, setFilterData] = useState<filterDataProps>(InitialfilterData);

    const handleDropdownChange = (key: keyof filterDataProps, value: string) => {
        setFilterData((prev) => ({ ...prev, [key]: value }));
    };
    const handleColorSelecting = (color: string) => {
        setCurrentColor(color);
        setFilterData(prev => ({ ...prev, color: color }))
    }
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
                <div className="flex gap-3 mt-4 mx-auto justify-around items-center flex-col lg:flex-row md:flex-row">
                    <DropdownMenu header="image type" items={imageTypes} onSelectionChange={(value) => handleDropdownChange("imageTypes", value)} />
                    <DropdownMenu header="orientation" items={orientation} onSelectionChange={(value) => handleDropdownChange("orientation", value)} />
                </div>
                <p className="text-center my-5">choose color: </p>
                <div className="flex items-center my-4 justify-center gap-3 flex-wrap">
                    {colors.map((color, i) => (
                        <div key={i} className="flex items-center justify-center w-9 h-9 rounded-md bg-secondary relative hover:scale-110 transition-all" >
                            {currentColor === color ?
                                <button onClick={() => setCurrentColor("")} title="close" className="hover:scale-110 transition-all absolute inset-0 rounded-full w-3 h-3 bg-red-500 items-center text-primary "><MdClose size={10} /></button>
                                :
                                <button onClick={() => handleColorSelecting(color)} title="add" className="hover:scale-110 transition-all absolute inset-0 rounded-full w-3 h-3 items-center text-primary bg-green-500 ">< FaPlus size={10} /></button>
                            }
                            <button className="w-8 h-8 rounded-full" onClick={() => handleColorSelecting(color)} title={color} style={{ backgroundColor: `${color}` }} ></button>
                        </div>))}
                </div>
                <Link onClick={() => setIsFilterOpen(false)} className="w-5/6 p-2 rounded-md bg-secondary hover:bg-background_hover transition-all m-auto mb-12 block text-center" href={{ pathname: `/photos`, query: { color: filterData.color, orientation: filterData.orientation, imageType: filterData.imageTypes } }}> Apply</Link>
            </div >
        </>
    );
};


export default FilterWindow;