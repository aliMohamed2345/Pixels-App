'use client'
import { useEffect, useState } from "react";
import { BsChevronUp } from "react-icons/bs";

const ScrollToTop = () => {
    const [isIconVisible, setIsIconVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY >= 200) {
            setIsIconVisible(true)
        }
        else {
            setIsIconVisible(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {isIconVisible &&
                <button
                    title="scroll to top"
                    onClick={() => window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })}
                    className={`rounded-3 transition-all w-10 h-10 bg-secondary p-2 fixed flex items-center justify-center rounded-xl hover:bg-background_hover  text-black dark:text-white ${isIconVisible ? 'opacity-1' : 'opacity-0'}  z-10 bottom-[40px] right-[40px]`}
                >
                    <BsChevronUp size={19} />
                </button>
            }
        </>
    );
}

export default ScrollToTop;