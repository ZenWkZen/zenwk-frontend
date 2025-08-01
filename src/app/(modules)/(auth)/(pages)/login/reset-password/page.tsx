"use client";

import { fetchJwtBaseApi } from "@app/helpers/fetch-api";
import SetPasswordUser from "@auth/components/SetPasswordUser";
import { AuthMessages } from "@auth/constants/auth-messages";

/**
 * Componente para el formulario de reingreso de contraseña en el registro del usuario,
 * si la contraseña es valida consume el api de creación de usuario.
 * @returns - Componente JSX.
 */
const SetChangePassword = () => {
    /**
     * Recibe una contrseña válida y consume el API de registro de usuario.
     */
    const changePassword = async (
        email: string,
        password: string,
        uuid: string,
        tokenCode: string
    ) => {
        const path = "/auth/reset-password/" + email;
        const createUserJson = {
            password: password,
            uuid: uuid,
            codeToken: tokenCode,
        };
        const result = await fetchJwtBaseApi(
            path,
            undefined,
            undefined,
            createUserJson,
            "POST"
        );

        console.log(result);
        if (result) {
            // recuperar jwt...
        }
    };
    /** Componente JSX con el formulario para el reingreso de contraseña. */
    return (
        <SetPasswordUser
            title={AuthMessages.register.enterPassword}
            headerText={AuthMessages.setPassword.title}
            buttonText={AuthMessages.register.linkText}
            onSubmitPassword={changePassword}
        />
    );
};

export default SetChangePassword;
