"use client";

import { ClientErrorMessage, LoginForm } from "<app>/app/interfaces/auth";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
    fetchValidateTokenApi,
    fetchTokenApi,
} from "<app>/app/helpers/fecth-api";

import OtpInput from "react-otp-input";
import HeaderText from "../../../components/HeaderText";
import Label from "../../../components/Label";
import SubTitle from "../../../components/SubTitle";
import FormError from "../../../components/FormError";
import Link from "next/link";
import LableLink from "../../../components/LableLink";
import Paragraph from "../../../components/Paragraph";
import ButtonOpen from "../../../components/ButtonOpen";

/**
 * Estilos CSS inline para el código OPT.
 */
const styleOpt = {
    width: "2.3rem",
    height: "2.3rem",
};

/**
 * Generación de códigos asociados a la cuenta del usuario.
 * @param email
 * @returns
 */
const Opt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") as string;
    const [otp, setOtp] = useState("");
    const [errorBack, setErrorBack] = useState("");
    const [isSuccessResend, setSuccessResend] = useState(false);
    const [codeError, setCodeError] = useState("");

    /**
     * Maneja el evento onChange, cuando el código cumple con 6 dígitos
     * se cosumen el api de verigiación si todo es exitoso, se continua con el registro.
     * @param code
     */
    const handleChange = async (code: string) => {
        setOtp(code);

        try {
            if (code.length === 6) {
                const res = await fetchValidateTokenApi(code, email);

                if (res) {
                    router.push(`/register/set-password?email=${email}`);
                }
            }
        } catch (error: unknown) {
            const errors = error as ClientErrorMessage;
            switch (errors.code) {
                case "FUNC_SEC_VERIFICATION_0003":
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
     * Evento click. Reenvio de email
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
    return (
        <>
            <HeaderText text="Ingresa el código que llego a tu correo" />
            <SubTitle
                text={
                    <>
                        Te hemos enviado un código al correo{" "}
                        <label className="text-[#339989]"> {email}</label>,
                        ingresa el código para continuar
                    </>
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

                {codeError && (
                    <div className="mt-2 text-center">
                        <FormError
                            error={
                                <>
                                    {errorBack} Volver al{" "}
                                    <Link
                                        href="/register"
                                        className="font-medium hover:underline"
                                    >
                                        registro.
                                    </Link>
                                </>
                            }
                        />
                    </div>
                )}

                <div className="mt-3 text-center">
                    <Paragraph text="¿No ves nuestro correo en tu bandeja de entrada?" />
                    <Paragraph
                        text={
                            <>
                                Revisa tu carpeta de spam o haz clic{" "}
                                <Link href="" onClick={handleClick}>
                                    <LableLink
                                        text="aquí"
                                        textColor="text-cyan-700"
                                    />
                                </Link>{" "}
                                para reenviar el código.
                            </>
                        }
                    />
                </div>

                <div className="mt-3 w-full text-center sm:w-[400px]">
                    {isSuccessResend && (
                        <>
                            <Label text="¡Código reenviado exitosamente! Puedes revisar tu correo ahora." />
                        </>
                    )}
                    <Paragraph
                        text={
                            <ul className="mt-2 flex justify-center space-x-2">
                                <li>
                                    <ButtonOpen
                                        href="https://mail.google.com"
                                        text="Gmail"
                                    />
                                </li>
                                <li>
                                    <ButtonOpen
                                        href="https://outlook.live.com/mail"
                                        text="Outlook"
                                    />
                                </li>
                                <li>
                                    <ButtonOpen
                                        href="https://www.icloud.com/mail"
                                        text="iCloud"
                                    />
                                </li>
                            </ul>
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default Opt;
