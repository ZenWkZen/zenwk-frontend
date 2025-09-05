'use client';
import React, { useState, useEffect } from 'react';
import { useFetchAuthenticatedUser } from '@user/hooks/useFetchAuthenticatedUser';
import { usePersonContext } from '@app/app/(modules)/user/utils/usePersonContext';

import Spinner from '@app/shared/ui/Spinner';
import Title from '@user/ui/user-feed/Title';
import ProfileItemConfiguration from '@user/components/profile/ProfileItemConfiguration';
import PersonalInfoAndImageSection from '@app/app/(modules)/user/ui/profile/PersonalInfoAndImageSection';
import UpdateEmailSection from '@user/ui/profile/UpdateEmailSection';
import { useFetchGetPerson } from '@user/hooks/useFetchGetPerson';

/**
 *Componente principal para la configuración del perfil
 * @returns
 */
const ProfileConfiguration = () => {
    // Controlar secciones abiertas en el acordeon "Configuración de Perfil".
    const [activeSection, setActiveSection] = useState<
        | 'updateInfoBasic'
        | 'updateEmail'
        | 'updatePassword'
        | 'deleteAccount'
        | null
    >(null);

    const { userDTO, loading, userData } = useFetchAuthenticatedUser();
    const { personDTO } = useFetchGetPerson(userDTO?.idPerson, userData?.jwt);

    /**
     * Cargador.
     */
    if (loading || !personDTO) {
        return <Spinner />;
    }

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
                        {/** Sección: información personal & imagen */}
                        <div className="mb-3">
                            <ProfileItemConfiguration
                                text="Información personal & imagen"
                                isActive={activeSection === 'updateInfoBasic'}
                                setClickOption={() =>
                                    setActiveSection(
                                        activeSection === 'updateInfoBasic'
                                            ? null
                                            : 'updateInfoBasic'
                                    )
                                }
                            />
                            {activeSection === 'updateInfoBasic' &&
                                personDTO && (
                                    <PersonalInfoAndImageSection
                                        idPerson={personDTO.id}
                                        userData={userData}
                                    />
                                )}
                        </div>

                        {/** Sección: Actualizar email */}
                        <div className="mb-3">
                            <ProfileItemConfiguration
                                text="Correo asociado a tu cuenta"
                                isActive={activeSection === 'updateEmail'}
                                setClickOption={() =>
                                    setActiveSection(
                                        activeSection === 'updateEmail'
                                            ? null
                                            : 'updateEmail'
                                    )
                                }
                            />
                            {activeSection === 'updateEmail' && (
                                <UpdateEmailSection userDTO={userDTO} />
                            )}
                        </div>

                        {/** Sección: Cambia tu constraseña */}
                        <div className="mb-3">
                            <ProfileItemConfiguration
                                text="Cambia tu constraseña"
                                isActive={activeSection === 'updatePassword'}
                                setClickOption={() =>
                                    setActiveSection(
                                        activeSection === 'updatePassword'
                                            ? null
                                            : 'updatePassword'
                                    )
                                }
                            />
                        </div>

                        {/** Sección: Eliminar tu cuenta */}
                        <div className="mb-3">
                            <ProfileItemConfiguration
                                text="Eliminar tu cuenta"
                                isActive={activeSection === 'deleteAccount'}
                                setClickOption={() =>
                                    setActiveSection(
                                        activeSection === 'deleteAccount'
                                            ? null
                                            : 'deleteAccount'
                                    )
                                }
                            />
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfileConfiguration;
