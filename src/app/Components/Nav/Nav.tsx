import SideMenu from "@/app/Components/Nav/SideMenu";
import SearchArea from "@/app/Components/Nav/SearchArea";
import Theme from '@/app/Components/Nav/Theme'
import ResponsiveSearchArea from "@/app/Components/Nav/ResponsiveSearchArea";
import Link from "next/link";
const Nav = () => {
    return (
        <header className=" shadow-md bg-secondary  ">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 bg-secondary">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <div className="flex items-center gap-3 ">
                            <SideMenu />
                            <Link href="/" className="text-3xl font-bold text-teal-600  ">Pixels</Link>
                        </div>
                    </div>

                    <div className="hidden md:block ">
                        <SearchArea />
                    </div>

                    <div className="gap-3 cursor-pointer flex items-center ">
                        <ResponsiveSearchArea />
                        <Theme />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Nav;