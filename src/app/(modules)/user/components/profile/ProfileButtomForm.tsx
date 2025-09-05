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
    text: string;
    shape: 'circle' | 'square';
    positionToltip?: 'top' | 'bottom' | 'left' | 'right';
    hiddenArrow?: boolean;
    disabled?: boolean;
    nameButtom?: string;
}) => {
    const className = clsx(
        'group relative border p-[0.4rem]',
        nameButtom
            ? 'inline-flex items-center justify-items-center gap-2 bg-gray-50 px-3 font-[350]'
            : 'bg-gray-100',
        disabled
            ? 'cursor-not-allowed border-gray-400 bg-gray-100 text-gray-400'
            : 'cursor-pointer border-cyan-800 text-cyan-800 hover:bg-gray-200',
        shape === 'circle' && 'rounded-full',
        shape === 'square' && 'rounded-md'
    );

    return (
        <div className={className}>
            {nameButtom && (
                <Text
                    text={nameButtom}
                    sizeOffset={-2}
                    className="cursor-pointer text-cyan-800"
                />
            )}
            {lineLoading && buttonLoading ? <ProfileRingLoader /> : icon}
            <Tooltip position={positionToltip}>{text}</Tooltip>
        </div>
    );
};

export default ProfileButtomForm;
