'use client'
import { useState } from "react";
import { PiListBold } from "react-icons/pi";
import { sideMenuOptions } from "../utils/Object";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";
const SideMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                className="p-1 rounded-full transition-all ease-in-out hover:bg-slate-100 font-bold opacity-80 hover:opacity-100 dark:text-gray-600"
            >
                <PiListBold size={25} />
            </button>

            <div
                className={`h-full fixed ${isOpen ? `left-0` : `left-[-500px]`
                    } min-w-[250px] lg:min-w-[300px] z-10 top-0 transition-all bg-stone-100  flex-col shadow-lg flex justify-start gap-10  dark:bg-black`}
            >
                <div className="flex content-start gap-3 items-center my-5 ml-4">
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                        className="hover:bg-slate-200 hover:opacity-100 rounded-full transition-all p-1 dark:text-gray-300 dark:hover:bg-gray-500"
                    >
                        <IoArrowBackSharp size={25} />
                    </button>

                    <div className="text-center">
                        <Link href="/" className="text-3xl font-bold text-teal-600">
                            Pixels
                        </Link>
                    </div>
                </div>

                <ul className="space-y-2">
                    {sideMenuOptions.map((option, i) => (
                        <li key={i}>
                            <a
                                title={option.name}
                                href={`#${option.name.toLowerCase()}`}
                                className="flex items-center justify-start gap-5 rounded-2xl p-2 font-bold hover:bg-amber-300 transition-all mx-4 text-lg text-slate-dark dark:text-gray-300 dark:hover:bg-gray-500"
                            >
                                {option.logo}
                                <span>{option.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {//overlay for the side menu 
                isOpen && (<div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-5"></div>)}
        </>
    );
};

export default SideMenu;
