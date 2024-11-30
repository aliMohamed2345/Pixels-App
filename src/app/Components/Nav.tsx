import SideMenu from "./SideMenu";
import SearchArea from "./SearchArea";
import Theme from './Theme'
import { IoMdSearch } from "react-icons/io";
import Link from "next/link";
const Nav = () => {
    return (
        <header className="bg-white shadow-md  dark:bg-black  ">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 dark:bg-black">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <div className="flex items-center gap-3 ">
                            <SideMenu />
                            <Link href="/" className="text-3xl font-bold text-teal-600 dark:text-teal-400 ">Pixels</Link>
                        </div>
                    </div>

                    <div className="hidden md:block ">
                        <SearchArea />
                    </div>

                    <div className="gap-3 cursor-pointer flex items-center ">
                        <IoMdSearch size={30} className="block rounded-full p-1 transition-all  md:hidden lg-hidden hover:bg-slate-100 dark:hover:gray-200 opacity-90 hover:opacity-100 dark:text-gray-600" />
                        <Theme />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Nav;