'use client';

import { CircleUser, Cog, LoaderCircle, CircleX } from 'lucide-react';
import { UserMessages } from '@user/constants/user-messages';
import { TEXT_ROSA_COLOR, TEXT_BLUE_COLOR } from '@app/styles/constans-color';
import { useJwtContext } from '@user/utils/useJwtContext';
import { RingLoader } from 'react-spinners';
import { fetchJwtBaseApi } from '@app/helpers/fetch-api';
import { User } from '@user/context/JwtContext';
import { LOCAL_STORAGE_JWT_ITEM } from '@app/shared/constants/common-constants';
import { useRouter } from 'next/navigation';
import { UserDTO } from '@user/interfaces/user-dto';
import React, { useEffect, useState } from 'react';

import Text from '@user/ui/user-feed/Text';
import UserProfilePhoto from '@user/components/general/UserProfilePhoto';

/**
 * Interface que representa los props usados por el componente.
 */
interface Props {
    isPhoto: boolean;
    userDTO?: UserDTO;
    isPhotoMenuOpen?: boolean;
    userData?: User;
}

/**
 * Menú flotante  para el botón user profile del usuario en el header.
 * @param param0
 * @returns
 */
const UserMenu = ({
    isPhoto,
    userDTO,
    isPhotoMenuOpen = true,
    userData,
}: Props) => {
    const [click, setClick] = useState(false);
    const { user, setUser } = useJwtContext();
    const router = useRouter();

    // Objetos requerido para el contexto del usuario.
    // Se obtienen en la autenticación.
    // console.log(
    //     'UserMenu: userDTO / userData: ................>',
    //     userDTO,
    //     userData
    // );

    /**
     * Manejador para el logOut
     */
    const handleClicLogOut = async () => {
        try {
            setClick((prev) => !prev);

            if (true) {
                localStorage.removeItem(LOCAL_STORAGE_JWT_ITEM);

                const path = '/auth/logout';
                const res = await fetchJwtBaseApi(
                    path,
                    undefined,
                    user.jwt,
                    undefined,
                    'DELETE'
                );
                // Se actualiza el contexto.
                setUser({ jwt: '', userId: 0 });
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Pausa, para animación
            await new Promise((resolve) => setTimeout(resolve, 500));
            router.push('/login');
        }
    };

    /**
     * Genera botón de user profile.
     * @returns
     */
    const renderProfilePhoto = () => {
        return (
            <UserProfilePhoto isOpenMenu={isPhotoMenuOpen} isPhoto={isPhoto} />
        );
    };

    return (
        <ul className="select-none">
            <li className="grid items-center justify-items-center rounded-t-xl border-b-[0.04rem] border-b-gray-300 bg-gray-100 py-4 shadow-2xs shadow-gray-200">
                {renderProfilePhoto()}
                <div className="mt-2 grid cursor-pointer items-center justify-items-center">
                    <Text
                        text={
                            /** Se debe implementar tabla company y relación con usuario */
                            <label className="font-normal text-black">
                                {UserMessages.header.userMenu.company}
                            </label>
                        }
                        sizeOffset={-5}
                    />
                    <Text
                        sizeOffset={-8}
                        text={
                            <label className="font-light">
                                {userDTO?.email}
                            </label>
                        }
                    />
                </div>
            </li>
            <li className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100">
                <Text
                    sizeOffset={-5}
                    text={
                        <span className="flex items-center gap-x-1 text-cyan-950">
                            <CircleUser size={17} strokeWidth={1.4} />
                            {UserMessages.header.userMenu.profile}
                        </span>
                    }
                />
            </li>
            <li className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100">
                <Text
                    sizeOffset={-5}
                    text={
                        <span
                            className={`flex items-center gap-x-1 ${TEXT_BLUE_COLOR}`}
                        >
                            <Cog size={17} strokeWidth={1.4} />
                            {UserMessages.header.userMenu.config}
                        </span>
                    }
                />
            </li>
            {/** Cierre de sesión */}
            <li
                className="relative flex cursor-pointer items-center rounded-b-xl px-4 py-3 hover:bg-gray-100"
                onClick={handleClicLogOut}
            >
                <span className="absolute top-0 left-1/2 w-[93%] -translate-x-1/2 border-t border-gray-300 shadow-[0_2px_2px_-2px_rgba(0,0,0,0.2)]" />

                <Text
                    sizeOffset={-5}
                    text={
                        <span
                            className={`flex cursor-pointer items-center gap-x-1 ${
                                TEXT_ROSA_COLOR
                            }`}
                        >
                            {click ? (
                                <RingLoader
                                    color="#E1564C"
                                    size={17}
                                    speedMultiplier={1.5}
                                />
                            ) : (
                                // Ícono original
                                <CircleX size={17} strokeWidth={1.7} />
                            )}
                            {UserMessages.header.userMenu.logout}
                        </span>
                    }
                />
            </li>
        </ul>
    );
};

export default UserMenu;
