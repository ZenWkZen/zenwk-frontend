"use client";

import { fetchJwtBaseApi } from "@app/helpers/fetch-api";
import SetPasswordUser from "@auth/components/SetPasswordUser";
import { AuthMessages } from "@auth/constants/auth-messages";
import { useState } from "react";

/**
 * Componente para el formulario de reingreso de contraseña en el registro del usuario,
 * si la contraseña es valida consume el api de creación de usuario.
 * @returns - Componente JSX.
 */
const SetPasswordRegister = () => {
    /**
     * Recibe una contrseña válida y consume el API de registro de usuario.
     */
    const createRegister = async (email: string, password: string) => {
        const path = "/users";
        const createUserJson = {
            username: email.split("@")[0],
            password: password,
            email,
        };
        const result = await fetchJwtBaseApi(
            path,
            undefined,
            undefined,
            createUserJson,
            "POST"
        );

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
            onSubmitPassword={createRegister}
        />
    );
};

export default SetPasswordRegister;
