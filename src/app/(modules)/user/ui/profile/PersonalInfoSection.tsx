'use client';

import React, { useState, useEffect } from 'react';
import { useSexOptionsContext } from '@user/utils/useSexOptionsContext';
import { getLabelById } from '@app/shared/utils/optionsSexUtils';
import { PencilLine } from 'lucide-react';
import { User } from '@user/context/JwtContext';
import { usePersonContext } from '@app/app/(modules)/user/utils/usePersonContext';
import { useFetchGetPerson } from '@user/hooks/useFetchGetPerson';

import Text from '@user/ui/user-feed/Text';
import CompleteRegisterForm from '@user/ui/forms/CompleteRegisterForm';
import ProfileItemHeader from '@user/components/profile/ProfileItemHeader';
import ProfileBotonForm from '@app/app/(modules)/user/components/profile/ProfileButtomForm';
import Spinner from '@app/shared/ui/Spinner';

interface FormValues {
    firstName: string;
    middleName: string;
    lastName: string;
    middleLastName: string;
    sex: any;
    age: any;
}

/**
 * Componente que gestiona los datos básicos de la persona.
 * @param param0
 * @returns
 */
const PersonalInfoSection = ({
    userData,
    idPerson,
}: {
    idPerson: number;
    userData: User;
}) => {
    const { optionsSex } = useSexOptionsContext();
    const [editDataBasic, setEditDataBasic] = useState(false);
    const [lineLoading, setLineLoading] = useState(false);
    const { person, setPerson } = usePersonContext();
    const { personDTO } = useFetchGetPerson(idPerson, userData?.jwt);

    /**
     * Sincroniza el contexto de person
     */
    useEffect(() => {
        if (personDTO) {
            setPerson(personDTO);
        }
    }, [personDTO, setPerson]);

    /**
     * Cargador hasta que la persona sea definida.
     */
    if (!person) {
        return <Spinner />;
    }

    const {
        firstName,
        middleName,
        lastName,
        middleLastName,
        dateOfBirth,
        address,
        age,
        idSex,
    } = person;

    /**
     * Animación (spinner)  para avento clic, boton editar y cancelar.
     */
    const loadingLineClick = async () => {
        try {
            setLineLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 400));
        } catch (error) {
            throw error;
        } finally {
            setLineLoading(false);
        }
    };

    // console.log('viewDataBasicProfile -- PersonDTO:', person);
    return (
        <div>
            {/** Encabezado de la sección */}
            <ProfileItemHeader lineLoading={lineLoading} />

            {/** Cuerpo de la sección */}
            <div className="px-8 py-5">
                {/** visualiazar y editar la persona */}
                {editDataBasic ? (
                    <div className="mx-5 mb-2 grid items-center justify-items-center">
                        <CompleteRegisterForm
                            user={userData}
                            editDataBasic={editDataBasic}
                            setEditDataBasic={setEditDataBasic}
                            personDTO={person}
                            setLineLoading={setLineLoading}
                            loadingLineClick={loadingLineClick}
                        />
                    </div>
                ) : (
                    <>
                        <div className="m-2 flex gap-4 rounded-lg bg-white p-1 px-4 text-gray-500">
                            <Text
                                text="Nombres"
                                className="min-w-[160px] font-[370] text-gray-700"
                            />
                            <div className="">
                                <Text
                                    text={firstName + ' ' + (middleName || '')}
                                    className="left-0 font-[300] text-gray-500"
                                />
                            </div>
                        </div>
                        {/** Apellidos */}
                        <div className="m-2 flex gap-4 rounded-lg bg-white p-1 px-4 text-gray-500">
                            <Text
                                text="Apellidos"
                                className="min-w-[160px] font-[370] text-gray-700"
                            />
                            <Text
                                text={lastName + ' ' + (middleLastName || '')}
                                className="font-[300] text-gray-500"
                            />
                        </div>

                        {/** Sexo, edad y fecha de nacimiento*/}
                        <div className="m-2 flex gap-4 rounded-lg bg-white p-1 px-4 text-gray-500">
                            <Text
                                text="Sexo"
                                className="min-w-[160px] font-[370] text-gray-700"
                            />
                            <Text
                                text={getLabelById(optionsSex, idSex)}
                                className="font-[300] text-gray-500"
                            />
                        </div>
                        <div className="m-2 flex gap-4 rounded-lg bg-white p-1 px-4 text-gray-500">
                            <Text
                                text="Edad"
                                className="min-w-[160px] font-[370] text-gray-700"
                            />
                            <Text
                                text={age}
                                className="font-[300] text-gray-500"
                            />
                        </div>

                        {/** Fecha de nacimiento */}
                        <div className="m-2 flex gap-4 rounded-lg bg-white p-1 px-4 text-gray-500">
                            <Text
                                text="Fecha de nacimiento"
                                className="min-w-[160px] font-[370] text-gray-700"
                            />
                            <Text
                                text={
                                    dateOfBirth ? dateOfBirth : 'No registrado'
                                }
                                className="font-[300] text-gray-500"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setEditDataBasic((prev) => !prev);
                                loadingLineClick();
                            }}
                            className="mt-2 w-full px-2 py-2"
                        >
                            <ProfileBotonForm
                                icon={
                                    <PencilLine
                                        size={16}
                                        strokeWidth={1.5}
                                        className="text-gray-600 group-hover:text-black"
                                    />
                                }
                                nameButtom="Actualizar información personal"
                                shape="square"
                            />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PersonalInfoSection;
