'use client'
import { useState } from "react";
import { PiListBold } from "react-icons/pi";
import { sideMenuOptions } from "../../utils/Object";
import { IoArrowBackSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname(); // Get current path

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                className="p-1 rounded-full transition-all ease-in-out hover:bg-background_hover font-bold opacity-80 hover:opacity-100 text-text_color"
            >
                <PiListBold size={25} />
            </button>

            <div
                className={`h-full fixed ${isOpen ? `left-0` : `left-[-500px]`
                    } min-w-[250px] lg:min-w-[300px] z-10 top-0 transition-all bg-primary  flex-col shadow-lg flex justify-start gap-10`}
            >
                <div className="flex content-start gap-3 items-center my-5 ml-4">
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                        className="hover:bg-background_hover hover:opacity-100 rounded-full transition-all p-1 text-text_color"
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
                    {sideMenuOptions.map((option, i) => {
                        return (
                            <li key={i}>
                                <Link
                                    title={option.name}
                                    href={`/${option.name === "Home" ? "" : option.name.toLowerCase()}`}
                                    className={`flex items-center justify-start gap-5 rounded-2xl p-2 font-bold hover:bg-amber-300 dark:hover:text-white transition-all mx-4 text-lg text-text_color ${pathname === `/${option.name === "Home" ? "" : option.name.toLowerCase()}` ? "bg-amber-300" : ""
                                        }`}
                                >
                                    {option.logo}
                                    {option.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {// Overlay for the side menu
                isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/80 z-5"
                    ></div>
                )}
        </>
    );
};

export default SideMenu;
