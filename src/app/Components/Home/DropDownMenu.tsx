'use client';

import React, { useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
    header: string; // The header text for the dropdown button
    items: string[]; // List of dropdown menu items
    theme: string; // Theme color (e.g., "blue", "green", "red")
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ header, items, theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const themeClasses: { [key: string]: string } = {
        blue: 'bg-blue-600 hover:bg-blue-700 text-white',
        green: 'bg-green-600 hover:bg-green-700 text-white',
        red: 'bg-red-600 hover:bg-red-700 text-white',
    };

    // Default to "blue" theme if not provided
    const buttonClass = themeClasses[theme] || themeClasses.blue;

    // Close the dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
                type="button"
                className={`inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClass}`}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {header}
            </button>

            {/* Dropdown Menu */}
            <div
                className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
            >
                <ul className="py-1">
                    {items.map((item, index) => (
                        <li key={index}>
                            <button
                                type="button"
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => console.log(`Clicked ${item}`)}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DropdownMenu;
