
import { sideMenuOptions } from "@/app/utils/Object";
import Link from "next/link";
const Footer = () => {
    return (<>
        {/* don't forget to handle the height in the footer */}
        <div className="bg-secondary text-text_color  mt-20">
            <div className=" mx-auto  px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
                <div className="lg:flex lg:items-end lg:justify-between">
                    <div>
                        <span className="text-4xl font-bold text-teal-600 text-center block ">
                            Pixels
                        </span>

                        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed  lg:text-left">
                            Explore stunning visuals and make your ideas come alive.
                        </p>
                    </div>

                    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
                        {sideMenuOptions.map((Option, i) =>
                        (
                            <li key={i}>
                                <Link className="bg-primary p-3 rounded-lg  transition hover:bg-background_hover  block w-24  text-center" href={`/${Option.name.toLowerCase()}`}> {Option.name} </Link>
                            </li>
                        )
                        )}
                    </ul>
                </div>

                <p className="mt-12 text-center text-md ">
                    Copyright &copy; {new Date().getFullYear()}. All rights reserved.
                </p>
            </div>
        </div>
    </>);
}

export default Footer;