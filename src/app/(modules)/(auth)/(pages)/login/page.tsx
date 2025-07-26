"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formValidate } from "../../../../utils/formValidate.js";
import { fetchJwtBaseApi } from "<app>/app/helpers/fecth-api";
import { ClientErrorMessage, LoginForm } from "<app>/app/interfaces/auth";
import { useSearchParams } from "next/navigation.js";

import Title from "../../components/Title";
import FormInput from "../../components/FormInput";
import FormError from "../../components/FormError";
import ButtonLoading from "../../components/ButtonLoading";
import Button from "../../components/Button";
import Label from "../../components/Label";
import HeaderText from "../../components/HeaderText";
import LableLink from "../../components/LableLink";
import Link from "next/link.js";
import Paragraph from "../../components/Paragraph";

/**
 * @abstract Pagina del lado del cliente para el Login correspondiente.
 * @returns
 */
const Login = () => {
    const searchParams = useSearchParams();
    const emailParam = searchParams.get("email") as string;

    const [resetPassword, setResetPassword] = useState(false);
    const { requiredEmail, requiredPassword, patternEmail, minLength } =
        formValidate();
    const [loading, setLoding] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginForm>();

    /**
     * Procesa el formulario de incio de sesión. Consume el API de login.
     * @oaram data
     */
    const onSubmit = handleSubmit(async (data) => {
        setResetPassword(false);
        const path = "/auth/login";
        const loginJson = { username: data.email, password: data.password };

        try {
            const result = await fetchJwtBaseApi(
                path,
                undefined,
                undefined,
                loginJson,
                "POST"
            );
        } catch (error: unknown) {
            const errors = error as ClientErrorMessage;
            switch (errors.code) {
                case "FUNC_SEC_USER_0003":
                    return setError("email", { message: errors.message });
                case "FUNC_SEC_AUTH_0003":
                    setResetPassword(true);
                    return setError("password", { message: errors.message });
                default:
                    return setError("root", {
                        message: (error as Error).message,
                    });
            }
        }
    });

    return (
        <>
            <Title title="Bienvenido a ZenWk" />
            <HeaderText text="Inicia sesión y redescubre el equilibrio entre productividad y bienestar." />
            <div className="grid justify-items-center px-2">
                <form onSubmit={onSubmit}>
                    <FormInput
                        value="fsdfsfsfss"
                        type="root"
                        label="Dirección de email"
                        placeholder="name@your-email.com"
                        {...register("email", {
                            required: requiredEmail,
                            pattern: patternEmail,
                            value: emailParam && emailParam,
                        })}
                        isError={Boolean(errors.email || errors.root)}
                    >
                        <FormError error={errors.email} />
                    </FormInput>

                    <FormInput
                        type="password"
                        {...register("password", {
                            required: requiredPassword,
                            minLength,
                        })}
                        label="Ingresa tu contraseña"
                        isError={Boolean(errors.password || errors.root)}
                    >
                        <FormError error={errors.password} />

                        {resetPassword && (
                            <div className="mt-3 text-center">
                                <Label text="¿Olvidaste tu contraseña? Restablécela aquí. " />
                            </div>
                        )}
                    </FormInput>
                    {loading ? (
                        <ButtonLoading />
                    ) : (
                        <Button type="submit" text="Iniciar sesión" />
                    )}
                    <div className="mt-7 text-center">
                        <Paragraph
                            text={
                                <>
                                    ¿No tienes una cuenta?{" "}
                                    <Link href="/register">
                                        <LableLink
                                            text=" Regístrate"
                                            textColor="text-cyan-800"
                                        />
                                    </Link>
                                </>
                            }
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
