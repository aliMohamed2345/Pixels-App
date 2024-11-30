import { ReactNode } from "react";
import { IoHome, IoHeart, IoImage, IoVideocam  } from "react-icons/io5";
interface sideMenuProps {
    name: string,
    logo: ReactNode
}
export const sideMenuOptions: sideMenuProps[] = [
    { name: `Home`, logo: <IoHome  /> },
    { name: `Photos`, logo: <IoImage /> },
    { name: `Videos`, logo: <IoVideocam /> },
    { name: `Favorites`, logo: <IoHeart /> }
]