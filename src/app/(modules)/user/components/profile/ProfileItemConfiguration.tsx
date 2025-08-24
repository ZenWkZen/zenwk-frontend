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
}: {
    text: string;
    setClickOption?: Dispatch<SetStateAction<boolean>>;
}) => {
    const [click, setClick] = useState(false);

    return (
        <li
            className="group mb-3 flex cursor-pointer items-center gap-3"
            onClick={() => {
                setClick((prev) => !prev);
                setClickOption && setClickOption((prev) => !prev);
            }}
        >
            <Text
                sizeOffset={14}
                text={text}
                className={`font-[300] group-hover:text-[#C470A0] ${
                    click ? 'font-[370] text-[#943D6E]' : 'text-[#566C7B]'
                }`}
            />
            {click ? (
                <ChevronUpIcon
                    size={20}
                    sizeStroke={2}
                    className={`group-hover:text-[#C470A0] ${
                        click ? 'font-[370] text-[#943D6E]' : 'text-[#566C7B]'
                    }`}
                />
            ) : (
                <ChevronDownIcon
                    size={20}
                    sizeStroke={2}
                    className={`group-hover:text-[#C470A0] ${
                        click ? 'font-[370] text-[#943D6E]' : 'text-[#566C7B]'
                    }`}
                />
            )}
        </li>
    );
};

export default ProfileItemConfiguration;
