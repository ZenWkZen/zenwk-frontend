'use client';
import React, { useState, useEffect } from 'react';
import { useFetchAuthenticatedUser } from '@user/hooks/useFetchAuthenticatedUser';
import { usePersonContext } from '@app/app/(modules)/user/utils/usePersonContext';
import { useFetchGetPerson } from '@user/hooks/useFetchGetPerson';

import Spinner from '@app/shared/ui/Spinner';
import Title from '@user/ui/user-feed/Title';
import ProfileItemConfiguration from '@user/components/profile/ProfileItemConfiguration';
import PersonalInfoSection from '@app/app/(modules)/user/ui/profile/PersonalInfoSection';
import UpdateEmailSection from '@user/ui/profile/UpdateEmailSection';
import UpdatePasswordSection from '@user/ui/profile/UpdatePasswordSection';
import DeleteAccount from '@user/ui/profile/DeleteAccount';
import ProfilePhotoSection from '@user/ui/profile/ProfilePhotoSection';
import Text from '@user/ui/user-feed/Text';

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
        | 'updatePhotoProfile'
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
        <div className="mx-auto max-w-xl place-items-center rounded-xl bg-white px-10 py-5 shadow-2xs">
            <div className="text-center">
                <Title
                    sizeOffset={10}
                    text="Configuración de Perfil"
                    className="font-[380] text-[#333333]"
                />
                {/* <AccordionItem /> */}
                {/** contenido para el frame actualización de perfil */}
                <div className="px-8 py-5 text-justify">
                    <ul>
                        {/** Sección:  imagen */}
                        <ProfileItemConfiguration
                            text="Cambia tu foto de perfil"
                            description="Aquí puedes actualizar tu foto de perfil"
                            isActive={activeSection === 'updatePhotoProfile'}
                            setClickOption={() =>
                                setActiveSection(
                                    activeSection === 'updatePhotoProfile'
                                        ? null
                                        : 'updatePhotoProfile'
                                )
                            }
                        >
                            {activeSection === 'updatePhotoProfile' &&
                                personDTO && (
                                    <ProfilePhotoSection
                                        idPerson={personDTO.id}
                                        userData={userData}
                                    />
                                )}
                        </ProfileItemConfiguration>

                        {/** Sección: información personal & imagen */}
                        <ProfileItemConfiguration
                            text="Información personal"
                            description="Actualiza tus datos básicos y cambia tu foto de perfil"
                            isActive={activeSection === 'updateInfoBasic'}
                            setClickOption={() =>
                                setActiveSection(
                                    activeSection === 'updateInfoBasic'
                                        ? null
                                        : 'updateInfoBasic'
                                )
                            }
                        >
                            {activeSection === 'updateInfoBasic' &&
                                personDTO && (
                                    <PersonalInfoSection
                                        idPerson={personDTO.id}
                                        userData={userData}
                                    />
                                )}
                        </ProfileItemConfiguration>

                        {/** Sección: Actualizar email */}
                        <ProfileItemConfiguration
                            //text="Correo asociado a tu cuenta"
                            text={
                                <div className="flex items-center gap-2">
                                    Correo asociado a tu cuenta
                                    <Text
                                        text="Verificado"
                                        className="rounded-lg bg-indigo-100 px-[0.3rem]"
                                    />
                                </div>
                            }
                            description={'Tu correo es ' + userDTO.email}
                            isActive={activeSection === 'updateEmail'}
                            setClickOption={() =>
                                setActiveSection(
                                    activeSection === 'updateEmail'
                                        ? null
                                        : 'updateEmail'
                                )
                            }
                        >
                            {activeSection === 'updateEmail' && (
                                <UpdateEmailSection userDTO={userDTO} />
                            )}
                        </ProfileItemConfiguration>

                        {/** Sección: Cambia tu constraseña */}
                        <div className="">
                            <ProfileItemConfiguration
                                text="Cambia tu constraseña"
                                //description="Mantén tu cuenta segura actualizando tu contraseña periódicamente"
                                isActive={activeSection === 'updatePassword'}
                                setClickOption={() =>
                                    setActiveSection(
                                        activeSection === 'updatePassword'
                                            ? null
                                            : 'updatePassword'
                                    )
                                }
                            >
                                {activeSection === 'updatePassword' && (
                                    <UpdatePasswordSection />
                                )}
                            </ProfileItemConfiguration>
                        </div>

                        {/** Sección: Eliminar tu cuenta */}
                        <div className="">
                            <ProfileItemConfiguration
                                text="Eliminar tu cuenta"
                                description="Si decides eliminar tu cuenta, recuerda que esta acción es permanente"
                                isActive={activeSection === 'deleteAccount'}
                                setClickOption={() =>
                                    setActiveSection(
                                        activeSection === 'deleteAccount'
                                            ? null
                                            : 'deleteAccount'
                                    )
                                }
                            >
                                {activeSection === 'deleteAccount' && (
                                    <DeleteAccount />
                                )}
                            </ProfileItemConfiguration>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfileConfiguration;
