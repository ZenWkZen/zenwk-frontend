"use client";

import FormInput from "@app/shared/components/FormInput";
import HeaderText from "@app/shared/components/HeaderText";
import Title from "@app/shared/components/Title";
import FormError from "@app/shared/components/FormError";
import Button from "@app/shared/components/Button";
import Label from "@app/shared/components/Label";
import Link from "next/link";
import LabelLink from "@app/shared/components/LabelLink";
import OpenMailbox from "@auth/components/OpenMailbox";
import SubTitle from "@app/shared/components/SubTitle";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import WestIcon from "@mui/icons-material/West";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CenteredHeaderWithBack from "@auth/components/CenteredHeaderWithBack";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formValidate } from "@app/shared/utils/formValidate";
import { useSearchParams } from "next/navigation";

import {
    fetchValidateRegisterEmail,
    getUrlServer,
    fetchVerifcation,
} from "@app/helpers/fetch-api";

import { ClientErrorMessage } from "@app/shared/interfaces/auth";
import { useState } from "react";
import { AuthMessages } from "@auth/constants/auth-messages";
import { Messages } from "@app/shared/constants/messages";
import { CommonsErros } from "@app/shared/constants/commons-erros";
import GeneralPageInfo from "@app/shared/components/GeneralPageInfo";

/**
 * Página ForgotPassword: permite ingresar el email para recuperar contraseña.
 */
const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        setError,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<{ email: string }>();

    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const { patternEmail, requiredEmail } = formValidate();
    const [isRegistered, setRegistered] = useState(false);
    const [isloading, setLoading] = useState(true);
    const [isSendEmail, setSendEmail] = useState(false);

    useEffect(() => {
        const paramEmail = searchParams.get("email") as string;
        setValue("email", paramEmail || email);
        setEmail(getValues("email"));

        if (paramEmail) {
            setRegistered(true);
        }
        setLoading(false);
    }, [setEmail]);

    /**
     * Cargador
     */
    if (isloading) {
        return <Label text="Cargando ...." />;
    }

    /**
     * Maneja el envío del formulario.
     * Valida si el email está registrado y envía el código de verificación.
     */
    const onSubmit = handleSubmit(async (data) => {
        try {
            const email = data.email;
            const res = await fetchValidateRegisterEmail(email);
            setEmail(email);

            if (res) {
                const path = "/verification/token/reset-password";
                const param = {
                    email,
                    pathUrl: getUrlServer() + "/login/reset-password",
                };
                const resResetPassword = await fetchVerifcation(
                    path,
                    undefined,
                    param,
                    "POST"
                );

                if (resResetPassword) {
                    return setSendEmail(true);
                } else {
                    throw {
                        code: CommonsErros.unknownCode,
                        message: CommonsErros.unknown(
                            "ForgotPassword.handleSubmit(...))"
                        ),
                    };
                }
            } else {
                setRegistered(false);
                setSendEmail(false);
            }
        } catch (error) {
            const errorApi = error as ClientErrorMessage;
            setError("email", { message: errorApi.message });
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
            {!isSendEmail ? (
                <>
                    {/** Formulario de email */}
                    <CenteredHeaderWithBack
                        icon={
                            <ArrowBackIcon className="mb-2 inline cursor-pointer text-cyan-600 hover:text-cyan-900" />
                        }
                    >
                        <Title title={AuthMessages.forgotPassword.title} />
                    </CenteredHeaderWithBack>
                    <HeaderText text={AuthMessages.forgotPassword.subtitle} />

                    <div className="grid justify-center">
                        <form onSubmit={onSubmit}>
                            <FormInput
                                type="root"
                                label={AuthMessages.inputs.email}
                                placeholder={Messages.placeholder.emailExample}
                                {...regiserEmail}
                                onChange={() => {
                                    if (!isRegistered) {
                                        setRegistered(true);
                                    }
                                }}
                                isError={Boolean(errors.email)}
                            >
                                <FormError
                                    error={errors.email?.message || ""}
                                />
                            </FormInput>
                            {!isRegistered && (
                                <Label
                                    text={
                                        <div className="text-center">
                                            {AuthMessages.register.promptText}
                                            <Link
                                                href={`/register?email=${email}`}
                                            >
                                                <LabelLink
                                                    text={
                                                        AuthMessages.register
                                                            .linkText
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
            ) : (
                <div className="">
                    {/** SimulaciónPGA cuando el email se envía con éxito.*/}
                    <GeneralPageInfo
                        title={AuthMessages.forgotPassword.sendEmail.title}
                        helloText={AuthMessages.forgotPassword.sendEmail.hello}
                        infoText={AuthMessages.commons.sendEmail.successText}
                        keyWord={email}
                        onBack={() => setSendEmail(false)}
                        icon={
                            <ArrowBackIcon className="mb-2 inline cursor-pointer text-cyan-600 hover:text-cyan-900" />
                        }
                    />
                </div>
            )}
        </>
    );
};

export default ForgotPassword;
