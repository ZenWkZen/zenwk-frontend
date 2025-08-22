'use client';
import { useEffect, useState } from 'react';
import { UserMessages } from '../constants/user-messages';
import { UserStateEnum } from '@user/interfaces/user-dto';
import {
    TEXT_CYAN_COLOR,
    TEXT_VIOLET_REDDISH,
} from '@app/styles/constans-color';
import { useFetchAuthenticatedUser } from '@user/hooks/useFetchAuthenticatedUser';
import { useJwtContext } from '@user/utils/useJwtContext';

import Title from '@user/ui/user-feed/Title';
import Spinner from '@app/shared/ui/Spinner';
import CompleteRegisterForm from '@user/ui/forms/CompleteRegisterForm';
import Text from '@user/ui/user-feed/Text';
import AlertInfo from '@app/shared/components/AlertInfo';

/** Componente encargado de consultar el usuario con los datos envidados después del login.
 * Si el jwt ha esxpirado retorna a la pagina del login.
 */
const WelcomeUser = () => {
    const [isCreatePerson, setIsCreatePerson] = useState(false);
    /**
     *  Use efect para recuperar el useJwtContext y consultar el usuario.
     **/
    // console.log('WelcomeUser: useFetchAuthenticatedUser: [OK]>')
    const { userDTO, loading, userData } = useFetchAuthenticatedUser();

    /**
     * Spinner para el render.
     */
    if (loading) {
        return <Spinner />;
    }

    /**
     * Componente JSX con la pagina del usuario
     */
    return (
        <div className="mx-auto grid max-w-lg select-none">
            <Title
                sizeOffset={0}
                text={
                    <div
                        className={`mb-5 inline-block text-center ${TEXT_CYAN_COLOR} font-[300] tracking-tight`}
                    >
                        {UserMessages.welcome.title}
                        <label className="font-medium">
                            {userDTO?.username}
                        </label>
                        {UserMessages.welcome.subtitle}
                    </div>
                }
            />

            {/** Formulario para completar los datos personales */}
            <div className="grid place-items-center">
                {!isCreatePerson &&
                    userDTO != undefined &&
                    userDTO.state === UserStateEnum.INCOMPLETE_PERFIL && (
                        <CompleteRegisterForm
                            setIsCreatePerson={setIsCreatePerson}
                            user={userData}
                        />
                    )}

                {isCreatePerson && (
                    <AlertInfo duration={3}>
                        <Text
                            sizeOffset={4}
                            text={
                                <div
                                    className={`font-[350] ${TEXT_VIOLET_REDDISH} rounded-xl bg-white p-5 text-center shadow-xl`}
                                >
                                    {
                                        'Tus datos personales se han actualizado correctamente. ¡Gracias por mantener tu información al día!'
                                    }
                                </div>
                            }
                        />
                    </AlertInfo>
                )}
            </div>
        </div>
    );
};

export default WelcomeUser;
