'use client';
import React, { useState, useEffect } from 'react';
import { useFetchAuthenticatedUser } from '@user/hooks/useFetchAuthenticatedUser';
import { PersonDTO } from '@user/interfaces/person-dto';
import { getPerson } from '@user/utils/personUtils';
import { useSearchParams } from 'next/navigation';
import { UsePersonContext } from '@user/utils/UsePersonContext';

import Title from '@user/ui/user-feed/Title';
import ProfileItemConfiguration from '@user/components/profile/ProfileItemConfiguration';
import ViewDataBasicProfile from '@user/ui/profile/ViewDataBasicProfile';
import Spinner from '@app/shared/ui/Spinner';

/**
 *Componente principal para la configuración del perfil
 * @returns
 */
const ProfileConfiguration = () => {
    const searchParams = useSearchParams();
    const paramInfoBasic = searchParams.get('infoBasic') === 'true';

    const [updateInfoBasic, setUpdateInfoBasic] = useState(paramInfoBasic);
    const [updateEmail, setUdapteEmail] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const [deleteAccount, setDeteleteAccount] = useState(false);
    const [personDTO, setPersonDTO] = useState<PersonDTO | undefined>();
    const { person, setPerson } = UsePersonContext();

    /**
     *  Use efect para recuperar el useJwtContext y consultar el usuario.
     **/
    const { userDTO, loading, userData } = useFetchAuthenticatedUser();

    /**
     * Carga DTO con la información de la persona.
     */
    useEffect(() => {
        const getPersonData = async () => {
            if (userDTO && userDTO.idPerson && userData.jwt) {
                try {
                    const data = await getPerson(
                        userDTO.idPerson,
                        userData.jwt
                    );
                    //setPersonDTO(data);
                    setPerson(data);
                } catch (error) {
                    throw error;
                }
            }
        };

        if (!person) {
            getPersonData();
        }
    }, [userDTO]);

    /**
     * Spinner para el render.
     */
    if (loading && personDTO === undefined) {
        return <Spinner />;
    }

    // console.log('ProfileConfiguration -- person:', person);

    return (
        <div className="mx-auto max-w-lg place-items-center rounded-xl bg-white px-7 py-5 shadow-2xs">
            <div className="text-center">
                <Title
                    sizeOffset={10}
                    text="Configuración de Perfil"
                    className="font-[380] text-cyan-800"
                />
                {/** contenido para el frame actualización de perfil */}
                <div className="px-7 py-5 text-justify">
                    <ul>
                        <div className="mb-3">
                            <ProfileItemConfiguration
                                text="Información personal & imagen"
                                setClickOption={setUpdateInfoBasic}
                            />
                            {updateInfoBasic && person && (
                                <ViewDataBasicProfile
                                    personDTO={person}
                                    setPersonDTO={setPerson}
                                    updateInfoBasic={updateInfoBasic}
                                    userData={userData}
                                />
                            )}
                        </div>
                        <div className="mb-3">
                            <ProfileItemConfiguration text="Cambia tu email" />
                        </div>
                        <div className="mb-3">
                            <ProfileItemConfiguration text="Cambia tu constraseña" />
                        </div>
                        <div className="mb-3">
                            <ProfileItemConfiguration text="Eliminar tu cuenta" />
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfileConfiguration;
