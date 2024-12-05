'use client'
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import DropdownMenu from "../Home/DropDownMenu";
const FilterWindow = () => {
    const imageTypes = ["all", "photo", "illustration", "vector"];
    const categories = ["backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"];
    console.log(categories)
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
    console.log(isFilterOpen)
    return (<>
        <button onClick={() => setIsFilterOpen(true)} title="filter" className='text-text_color hover:bg-background_hover w-8 flex items-center justify-center h-8 rounded-full transition-all '><FaFilter /></button>
        {// Overlay for the filter window 
            isFilterOpen && (
                <div
                    onClick={() => setIsFilterOpen(false)}
                    className="fixed inset-0 bg-black/80 z-10"
                ></div>
            )}
        <div className={`w-[80vw] h-[400px] overflow-auto z-10 bg-primary duration-300 transform -translate-x-1/2 -translate-y-1/2 fixed left-[50%]   text-text_color transition-all  ${isFilterOpen ? `opacity-100 scale-100 top-[50%]` : `opacity-0 scale-0 top-[-300px]`}  rounded-lg`}>
            <button title="close" onClick={() => setIsFilterOpen(false)} className="block  justify-self-end p-2 m-3 rounded-full  transition-all hover:bg-background_hover w-8 h-8"><MdClose className="text-text_color" /></button>
            <h4 className="text-center font-bold my-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl">Filter By</h4>
            {/* <DropdownMenu header="imageType" items={imageTypes} theme={"blue"} /> */}
            <p>Categories</p>
            <div className='flex gap-3 flex-wrap mx-1'>
                {categories.map((category, i) =>
                    (<button className="bg-secondary text-text_color rounded-lg p-1" key={i}>{category}</button>))}
            </div>
        </div>
    </>);
}

export default FilterWindow;