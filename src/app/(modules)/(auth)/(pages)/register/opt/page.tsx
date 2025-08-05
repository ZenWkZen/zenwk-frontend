"use client";

import OtpInput from "react-otp-input";
import Link from "next/link";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Title from "@app/shared/components/Title";
import SubTitle from "@app/shared/components/SubTitle";
import FormError from "@app/shared/components/FormError";
import LabelLink from "@app/shared/components/LabelLink";
import useRedirectRegister from "@auth/hooks/useRedirectRegister";
import Paragraph from "@app/shared/components/Paragraph";
import CenteredHeaderWithBack from "@auth/components/CenteredHeaderWithBack";

import { fetchValidateTokenApi, fetchTokenApi } from "@app/helpers/fetch-api";
import { ClientErrorMessage } from "@app/shared/interfaces/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthErrors } from "@auth/constants/auth-errors";
import { AuthMessages } from "../../../constants/auth-messages";
import { Messages } from "@app/shared/constants/messages";
import OpenMailbox from "@auth/components/OpenMailbox";
import Spinner from "@app/shared/components/Spinner";

/**
 * Estilos CSS inline para el código OPT.
 */
const styleOpt = {
    width: "2.3rem",
    height: "2.3rem",
};

/**
 * Página de ingreso de código OTP para la validación del usuario en el proceso de registro.
 * El código se verifica automáticamente al ingresar 6 dígitos.
 * También permite reenviar el código al correo del usuario.
 */
const Opt = () => {
    const [otp, setOtp] = useState("");
    const [errorBack, setErrorBack] = useState("");
    const [isSuccessResend, setSuccessResend] = useState(false);
    const [codeError, setCodeError] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email") as string;
    const uuid = searchParams.get("uuid") as string;
    const [loading, setLoading] = useState(true);

    /**
     * Redirige si los parámetros no son válidos o no coinciden.
     */
    useRedirectRegister(email, uuid, setLoading);

    /**
     * Muestra un mensaje mientras se cargan los datos necesarios.
     */
    /**
     * Cargador ...
     */
    if (loading) {
        return <Spinner />;
    }

    /**
     * Valida el código OTP cuando el usuario completa los 6 dígitos.
     * Redirige a la página de establecer contraseña si el código es válido.
     * Muestra errores en caso de fallo.
     */
    const handleChange = async (code: string) => {
        setOtp(code);

        try {
            if (code.length === 6) {
                const res = await fetchValidateTokenApi(code, email, uuid);

                if (res) {
                    router.push(
                        `/register/set-password?email=${encodeURIComponent(email)}&uuid=${encodeURIComponent(uuid)}`
                    );
                }
            }
        } catch (error: unknown) {
            const errors = error as ClientErrorMessage;
            switch (errors.code) {
                case AuthErrors.funciontal.login.emailNotMatch:
                    setCodeError(errors.code);
                    setErrorBack(errors.message);
                    console.log(codeError);
                    return;
                default:
                    setErrorBack(errors.message);
                    return;
            }
        }
    };

    /**
     * Reenvía un nuevo código OTP al correo del usuario.
     * Reinicia estados de error y código anterior.
     */
    const handleClick = async () => {
        setOtp("");
        setErrorBack("");

        try {
            const result = await fetchTokenApi(email);
            if (result) {
                setSuccessResend(true);
            }
        } catch (error: unknown) {
            const errors = error as ClientErrorMessage;
            setErrorBack(errors.message);
        }
    };

    /**
     * Renderizado del componente OTP, instrucciones, inputs de código,
     * mensajes de error, enlaces para reenviar código y acceso rápido a clientes de correo.
     */
    return (
        <div className="grid w-full max-w-[860px] justify-center">
            <CenteredHeaderWithBack
                icon={
                    <ArrowBackIcon className="mb-2 inline cursor-pointer text-cyan-600 hover:text-cyan-900" />
                }
            >
                <Title title={AuthMessages.otp.title} />
            </CenteredHeaderWithBack>

            <SubTitle
                text={
                    <div className="px-6">
                        {AuthMessages.otp.subtitleSendEmail}
                        <label className="text-[#339989]"> {email}</label>,
                        {AuthMessages.otp.subtitleEnterCode}
                    </div>
                }
            />
            <div className="grid justify-items-center">
                <OtpInput
                    value={otp}
                    onChange={handleChange}
                    numInputs={6}
                    inputStyle={styleOpt}
                    renderInput={(props, index) => (
                        <input
                            {...props}
                            className={`mx-2 rounded-md border-[0.1rem] border-[#339989] text-center text-xl focus:outline-none${errorBack ? "border-red-500 bg-red-50 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:text-red-500 dark:placeholder-red-500" : ""}`}
                        />
                    )}
                />
                {errorBack && !codeError && (
                    <div className="mt-2 text-center">
                        <FormError error={errorBack} />
                    </div>
                )}

                {/* Error: cuando el código ingresado existe, pero el correo no coincide. */}
                {codeError && (
                    <div className="mt-2 text-center">
                        <FormError
                            error={
                                <>
                                    {
                                        Messages.commons.literalTexts
                                            .confirmReturn
                                    }
                                    <Link
                                        href="/register"
                                        className="font-medium hover:underline"
                                    >
                                        {Messages.commons.literalTexts.register}
                                    </Link>
                                </>
                            }
                        />
                    </div>
                )}

                <div className="mt-3 text-center">
                    <Paragraph text={AuthMessages.otp.emailNotFound} />
                    <Paragraph
                        text={
                            <>
                                {AuthMessages.otp.checkSpamOrClick}
                                <Link href="" onClick={handleClick}>
                                    <LabelLink
                                        text={
                                            Messages.commons.literalTexts.here
                                        }
                                        textColor="text-cyan-700"
                                    />
                                </Link>
                                {AuthMessages.otp.resendCodeLink}
                            </>
                        }
                    />
                </div>
                <OpenMailbox isSuccessResend={isSuccessResend} />
            </div>
        </div>
    );
};

export default Opt;
