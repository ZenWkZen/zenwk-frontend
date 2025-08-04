"use client";

import { fetchJwtBaseApi } from "@app/helpers/fetch-api";
import SetPasswordUser from "@auth/components/SetPasswordUser";
import { AuthMessages } from "@auth/constants/auth-messages";

/**
 * Componente para el formulario de reingreso de contraseña en el registro del usuaro.
 * si la contraseña es valida consume el api para la creación del usuario.
 * @returns - Componente JSX.
 */
const SetChangePassword = () => {
    /**
     * Recibe una contrseña válida y consume el API reset-password.
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
            isResetPassword={true}
            title={AuthMessages.login.resetPassword.title}
            headerText={AuthMessages.login.resetPassword.title}
            buttonText={AuthMessages.buttons.saveContinue}
            onSubmitPassword={changePassword}
        />
    );
};

export default SetChangePassword;
