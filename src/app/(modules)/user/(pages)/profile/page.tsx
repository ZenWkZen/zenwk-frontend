'use client';
import React, { useState } from 'react';
import { useFetchAuthenticatedUser } from '@user/hooks/useFetchAuthenticatedUser';

import Title from '@user/ui/user-feed/Title';
import ProfileItemConfiguration from '@user/components/profile/ProfileItemConfiguration';
import CompleteRegisterForm from '@user/ui/forms/CompleteRegisterForm';

/**
 *Componente principal para la configuración del perfil
 * @returns
 */
const ProfileConfiguration = () => {
    const [updateInfoBasic, setUpdateInfoBasic] = useState(false);
    const [updateEmail, setUdapteEmail] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const [deleteAccount, setDeteleteAccount] = useState(false);

    /**
     *  Use efect para recuperar el useJwtContext y consultar el usuario.
     **/
    // console.log('WelcomeUser: useFetchAuthenticatedUser: [OK]>')
    const { userDTO, loading, userData } = useFetchAuthenticatedUser();
    /**
     * Manejador del oncick
     */
    const handleOnClick = () => {
        console.log('Manejador de click');
    };

    return (
        <div className="mx-auto max-w-lg place-items-center rounded-xl bg-white px-7 py-5 shadow-2xs">
            <div className="text-center">
                <Title
                    sizeOffset={10}
                    text="Configuración de Perfil"
                    className="font-[350]"
                />
                {/** contenido para el frame actualización de perfil */}
                <div className="px-7 py-5 text-justify">
                    <ul>
                        <ProfileItemConfiguration
                            text="Información personal & imagen"
                            setClickOption={setUpdateInfoBasic}
                        />
                        {updateInfoBasic && (
                            <CompleteRegisterForm
                                user={userData}
                                setIsCreatePerson={() => {}}
                            />
                        )}

                        <ProfileItemConfiguration text="Cambia tu email" />
                        <ProfileItemConfiguration text="Cambia tu constraseña" />
                        <ProfileItemConfiguration text="Eliminar tu cuenta" />
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfileConfiguration;
