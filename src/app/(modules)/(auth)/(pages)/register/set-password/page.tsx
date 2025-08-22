'use client';

import { fetchJwtBaseApi } from '@app/helpers/fetch-api';
import SetPasswordUser from '@auth/components/SetPasswordUser';
import { AuthMessages } from '@auth/constants/auth-messages';
import { useRouter } from 'next/navigation';
import { loginApi } from '@auth/utils/authUtils';
import { useJwtContext } from '@user/utils/useJwtContext';

/**
 * Componente para el formulario de reingreso de contraseña en el registro del usuario,
 * si la contraseña es valida consume el api de creación de usuario.
 * @returns - Componente JSX.
 */
const SetPasswordRegister = () => {
    const router = useRouter();
    const { setUser } = useJwtContext();
    /**
     * Recibe una contrseña válida y consume el API de registro de usuario.
     */
    const createRegister = async (email: string, password: string) => {
        const path = '/users';
        const createUserJson = {
            username: email.split('@')[0],
            password: password,
            email,
        };

        try {
            // Consumo api creación usuario
            const result = await fetchJwtBaseApi(
                path,
                undefined,
                undefined,
                createUserJson,
                'POST'
            );

            if (result) {
                // Utilidad loginApi
                const res = await loginApi(email, password);
                if (res) {
                    const jwtJson = { jwt: res.token, userId: res.userId };
                    // Se actualiza contexto
                    setUser(jwtJson);
                    localStorage.setItem('jwt-user', JSON.stringify(jwtJson));
                    // Pausa para mejorar la interacción con el usuario
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    router.push('/user');
                }
            }
        } catch (error) {
            throw error;
        }
    };
    /** Componente JSX con el formulario para el reingreso de contraseña. */
    return (
        <SetPasswordUser
            title={AuthMessages.register.enterPassword}
            headerText={AuthMessages.setPassword.title}
            buttonText={AuthMessages.register.linkText}
            onSubmitPassword={createRegister}
        />
    );
};

export default SetPasswordRegister;
