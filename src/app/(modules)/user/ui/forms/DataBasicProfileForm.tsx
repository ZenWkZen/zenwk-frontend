'use client';
import { useFetchAuthenticatedUser } from '@user/hooks/useFetchAuthenticatedUser';
import { UserMessages } from '@user/constants/user-messages';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CompleteRegisterForm from '@user/ui/forms/CompleteRegisterForm';
import Title from '@user/ui/user-feed/Title';

const DataBasicProfileForm = () => {
    const router = useRouter();
    const { userDTO, loading, userData } = useFetchAuthenticatedUser();
    const [isCreatePerson, setIsCreatePerson] = useState(true);

    const iconUndo2 = (size: number) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-undo2-icon lucide-undo-2"
        >
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
        </svg>
    );

    return (
        <div className="mx-auto max-w-lg place-items-center rounded-xl bg-white px-5 py-5 shadow-2xs">
            <article className="px-12">
                <div className="relative flex w-full items-center text-cyan-800">
                    <button
                        onClick={() =>
                            router.push('/user/profile?infoBasic=true')
                        }
                        className="absolute left-0 cursor-pointer"
                    >
                        {iconUndo2(17)}
                    </button>

                    <Title
                        sizeOffset={-5}
                        text="Actualiza tus datos personales"
                        className="mx-auto font-[370]"
                    />
                </div>
                <CompleteRegisterForm
                    setIsCreatePerson={setIsCreatePerson}
                    user={userData}
                />
            </article>
        </div>
    );
};

export default DataBasicProfileForm;
