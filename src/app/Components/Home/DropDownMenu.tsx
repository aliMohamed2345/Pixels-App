import { useState, useRef, useEffect } from 'react'
interface DropdownMenuProps {
    header: string; // The header text for the dropdown button
    items: string[]; // List of dropdown menu items
    onSelectionChange: (value: string) => void; // Callback to notify parent of selection
}

const DropdownMenu = ({ header, items, onSelectionChange }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>(header);
    const dropdownRef = useRef<HTMLDivElement>(null);


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

    const selectValue = (item: string) => {
        setSelectedValue(item);
        onSelectionChange(item); // Notify parent of the new selection
        setIsOpen(false);
    };

    return (
        <div
            className="relative inline-block text-center bg-secondary text-text_color hover:bg-background_hover transition-all rounded-md w-5/6 lg:w-1/3"
            ref={dropdownRef}
        >
            <button type="button" className={`inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm w-full lg:w-1/2`} onClick={() => setIsOpen((prev) => !prev)}>
                {selectedValue}
            </button>

            <div
                className={`absolute right-0 mt-2 text-text_color bg-secondary rounded-md shadow-lg overflow-hidden w-full z-10 transition-transform duration-300 ease-in-out z-3 transform ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                <ul className="py-1 text-center">
                    {items.map((item, i) => (
                        <li key={i}>
                            <button
                                type="button"
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-background_hover"
                                onClick={() => selectValue(item)}
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
