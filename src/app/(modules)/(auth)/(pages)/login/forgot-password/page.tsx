"use client";

import FormInput from "@app/shared/components/FormInput";
import HeaderText from "@app/shared/components/HeaderText";
import Title from "@app/shared/components/Title";
import FormError from "@app/shared/components/FormError";
import Button from "@app/shared/components/Button";
import Label from "@app/shared/components/Label";
import Link from "next/link";
import LabelLink from "@app/shared/components/LabelLink";

import { useForm } from "react-hook-form";
import { formValidate } from "@app/shared/utils/formValidate";
import { LoginForm } from "@app/shared/interfaces/auth";
import { useSearchParams } from "next/navigation";

import {
    fecthValidateRegisterEmail,
    getUrlServer,
    fethStackVerifcation,
} from "@app/helpers/fecth-api";

import { ClientErrorMessage } from "@app/shared/interfaces/auth";
import { useState } from "react";
import { AuthMessages } from "@auth/constants/auth-messages";
import { Messages } from "@app/shared/constants/messages";

/**
 * Página ForgotPassword: permite ingresar el email para recuperar contraseña.
 */
const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<LoginForm>();

    const searchParams = useSearchParams();
    const emailFromLogin = searchParams.get("email") as string;
    setValue("email", emailFromLogin);
    const { patternEmail, requiredEmail } = formValidate();
    const [isRegisteredEmail, setRegisteredEmail] = useState(true);
    const [paramEmail, setParamEmail] = useState("");

    /**
     * Maneja el envío del formulario.
     * Valida si el email está registrado y envía el código de verificación.
     */
    const onSubmit = handleSubmit(async (data) => {
        try {
            if (await fecthValidateRegisterEmail(data.email)) {
                const path = "/verification/token/reset-password";
                const param = {
                    email: data.email,
                    pathUrl: getUrlServer() + "/login/reset-password",
                };
                const res = await fethStackVerifcation(
                    path,
                    undefined,
                    param,
                    "POST"
                );
                console.log(res);
            } else {
                setParamEmail(data.email);
                setRegisteredEmail(false);
            }
        } catch (error) {
            const terrorFromBack = error as ClientErrorMessage;
            setError("email", { message: terrorFromBack.message });
        }
    });

    const regiserEmail = register("email", {
        required: requiredEmail,
        pattern: patternEmail,
    });

    /**
     * Renderiza el formulario de recuperación de contraseña.
     */
    return (
        <>
            <Title title={AuthMessages.forgotPassword.title} />
            <HeaderText text={AuthMessages.forgotPassword.subtitle} />
            <div className="grid justify-center">
                <form onSubmit={onSubmit}>
                    <FormInput
                        type="root"
                        label={AuthMessages.inputs.email}
                        placeholder={Messages.placeholder.emailExample}
                        {...regiserEmail}
                        onChange={() => setRegisteredEmail(true)}
                        isError={Boolean(errors.email)}
                    >
                        <FormError error={errors.email?.message || ""} />
                    </FormInput>
                    {!isRegisteredEmail && (
                        <Label
                            text={
                                <div className="text-center">
                                    {AuthMessages.register.promptText}
                                    <Link
                                        href={`/register?email=${paramEmail}`}
                                    >
                                        <LabelLink
                                            text={
                                                AuthMessages.register.linkText
                                            }
                                        />
                                    </Link>
                                </div>
                            }
                        />
                    )}
                    <Button
                        type="submit"
                        text={AuthMessages.buttons.forgotPassword}
                    />
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
