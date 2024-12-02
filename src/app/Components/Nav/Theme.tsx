'use client';
import { useEffect, useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const Theme = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    // Sync with localStorage and apply theme
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        }
    }, []);

    // Toggle the theme
    const toggleTheme = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", newTheme);
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className=" hover:bg-background_hover text-text_color opacity-90 hover:opacity-100 rounded-full transition-all p-1 lg:w-9 lg:h-9 "
        >
            {isDarkMode ? (
                <IoMdSunny size={25} className="text-slate-400" />
            ) : (
                <IoMdMoon size={25} className="text-gray-600" />
            )}
        </button>
    );
};

export default Theme;
