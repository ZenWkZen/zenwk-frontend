import { ReactNode } from 'react';

import ProfileRingLoader from '@user/components/profile/ProfileRingLoader';
import Tooltip from '@app/shared/ui/Tooltip';
import clsx from 'clsx';
import Text from '../../ui/user-feed/Text';

/**
 * Tipo de boton usado en el page profile/edit
 * @param param0
 * @returns
 */
const ProfileButtomForm = ({
    disabled = false,
    lineLoading = false,
    buttonLoading = false,
    icon,
    text,
    shape,
    positionToltip = 'top',
    nameButtom,
}: {
    lineLoading?: boolean;
    buttonLoading?: boolean;
    icon: ReactNode;
    text?: string;
    shape?: 'circle' | 'square';
    positionToltip?: 'top' | 'bottom' | 'left' | 'right';
    hiddenArrow?: boolean;
    disabled?: boolean;
    nameButtom?: string;
}) => {
    const className = clsx(
        'group relative',
        nameButtom
            ? 'flex w-full items-center justify-center gap-4 bg-gray-200 p-[0.3rem] px-4'
            : 'border bg-gray-100 p-[0.4rem]',
        disabled
            ? 'cursor-not-allowed border-gray-400 bg-gray-100 text-gray-400'
            : 'cursor-pointer border-black group-hover:text-black hover:bg-gray-300',
        shape === 'circle' && 'rounded-full',
        shape === 'square' && 'rounded-md'
    );

    return (
        <div className={className}>
            {nameButtom && (
                <Text
                    text={nameButtom}
                    sizeOffset={0}
                    className={`font-[400] ${disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-gray-700 group-hover:text-black'} `}
                />
            )}
            {lineLoading && buttonLoading ? (
                <ProfileRingLoader />
            ) : (
                <span
                    className={clsx(
                        'flex items-center',
                        disabled
                            ? 'text-gray-400'
                            : 'text-gray-700 group-hover:text-black'
                    )}
                >
                    {icon}
                </span>
            )}
            {text && <Tooltip position={positionToltip}>{text}</Tooltip>}
        </div>
    );
};

export default ProfileButtomForm;
