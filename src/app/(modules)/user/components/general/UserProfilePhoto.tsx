import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import {
    TEXT_CYAN_COLOR,
    BG_CYAN_HOVER,
    BG_CYAN,
} from "@app/styles/constans-color";

interface Props {
    isPhoto?: boolean;
    isOpenMenu: boolean;
}

/**
 * Componente que recupera la foto del perfil del usuario y la prepara para ser usada en el componente UserMenu.tsx.
 * @param param0
 * @returns
 */
const UserProfilePhoto = ({ isPhoto = false, isOpenMenu }: Props) => {
    return isPhoto ? (
        <Image
            className={`${isOpenMenu ? "h-9 w-9" : "h-7 w-7"} rounded-full object-cover`}
            src="/images/profiles/avatar.jpg"
            width={33}
            height={33}
            alt="Avatar"
        />
    ) : (
        <div
            className={`flex items-center justify-center rounded-full border-[0.093rem] border-cyan-800 ${isOpenMenu ? "h-7 w-7 bg-[#758E9F] text-white" : "h-6.5 w-6.5 " + TEXT_CYAN_COLOR + " " + BG_CYAN_HOVER + " hover:text-white"} `}
        >
            <User size={20} strokeWidth={1.2} />
        </div>
    );
};

export default UserProfilePhoto;
