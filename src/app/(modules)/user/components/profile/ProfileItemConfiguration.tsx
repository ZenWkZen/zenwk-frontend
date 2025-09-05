import { useState, Dispatch, SetStateAction } from 'react';

import Text from '@user/ui/user-feed/Text';
import ChevronDownIcon from '@user/components/icons/ChevronDownIcon';
import ChevronUpIcon from '@user/components/icons/ChevronUpIcon';

/**
 * Componente que representa un item de configuración en la administración del perfil
 */
const ProfileItemConfiguration = ({
    text,
    setClickOption,
    isActive,
}: {
    text: string;
    setClickOption?: () => void;
    isActive: boolean;
}) => {
    return (
        <li
            className="group mb-1 flex cursor-pointer items-center gap-3"
            onClick={setClickOption}
        >
            <Text
                sizeOffset={13}
                text={text}
                className={`font-[380] group-hover:text-[#C470A0] ${
                    isActive ? 'font-[370] text-[#B54A87]' : 'text-cyan-800'
                }`}
            />
            {isActive ? (
                <ChevronUpIcon
                    size={17}
                    sizeStroke={2}
                    className={`group-hover:text-[#C470A0] ${
                        isActive ? 'font-[370] text-[#B54A87]' : 'text-cyan-800'
                    }`}
                />
            ) : (
                <ChevronDownIcon
                    size={17}
                    sizeStroke={2}
                    className={`group-hover:text-[#C470A0] ${
                        isActive ? 'font-[370] text-[#B54A87]' : 'text-cyan-800'
                    }`}
                />
            )}
        </li>
    );
};

export default ProfileItemConfiguration;
