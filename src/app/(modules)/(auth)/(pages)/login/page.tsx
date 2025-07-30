"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formValidate } from "../../../../utils/formValidate";
import {
    fetchJwtBaseApi,
    fecthValidateRegisterEmail,
} from "<app>/app/helpers/fecth-api";
import { ClientErrorMessage, LoginForm } from "<app>/app/interfaces/auth";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation.js";
import { Messages } from "<app>/constants/messages";

import Title from "../../components/Title";
import FormInput from "../../components/FormInput";
import FormError from "../../components/FormError";
import ButtonLoading from "../../components/ButtonLoading";
import Button from "../../components/Button";
import HeaderText from "../../components/HeaderText";
import LableLink from "../../components/LableLink";
import Link from "next/link";
import Paragraph from "../../components/Paragraph";

/**
 * @abstract Pagina del lado del cliente para el Login correspondiente.
 * @returns
 */
const Login = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [emailParam, setEmailParam] = useState("");
    const { requiredEmail, requiredPassword, patternEmail, minLength } =
        formValidate();
    const [loading, setLoding] = useState(false);
    const [isRegisteredUser, setRegisteredUser] = useState(false);

    useEffect(() => {
        const emailFromParam = searchParams.get("email");
        if (emailFromParam) {
            setEmailParam(emailFromParam);
        }
    }, [searchParams]);

    const {
        getValues,
        trigger,
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginForm>();

    /**
     * useForm Login - Props para register password
     */
    const passwordRegister = register("password", {
        required: requiredPassword,
        minLength,
    });

    /**
     * useForm Login - Props para register email / username
     */
    const usernameRegister = register("email", {
        required: requiredEmail,
        pattern: patternEmail,
        value: emailParam || "",
    });

    /**
     * userForm Login - Valida si un email esta registrado, si aplica habilita el forgot-password
     */
    const handleEmailBlur = async () => {
        const isValid = await trigger("email");
        const emailOnBlur = getValues("email");
        if (isValid) {
            const path = `/users/email/${emailOnBlur}`;
            try {
                // Validación si el email ya esta registrado
                const res = await fecthValidateRegisterEmail(emailOnBlur);
                if (res) {
                    setEmailParam(emailOnBlur);
                    setRegisteredUser(res);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    /**
     * Procesa el formulario de incio de sesión. Consume el API de login.
     * @oaram data
     */
    const onSubmit = handleSubmit(async (data) => {
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
                    return router.push(`/register?email=${data.email}`);
                case "FUNC_SEC_AUTH_0003":
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
            <Title title={Messages.PAGE_LOGIN_TEXT.TITLE_WELCOME_GENERAL} />
            <HeaderText
                text={Messages.PAGE_LOGIN_TEXT.SUBTITLE_WELCOME_GENERAL}
            />
            <div className="grid justify-items-center px-2">
                <form onSubmit={onSubmit}>
                    <FormInput
                        type="root"
                        label={Messages.PAGE_LOGIN_TEXT.LABEL_EMAIL}
                        placeholder="name@your-email.com"
                        {...usernameRegister}
                        onBlur={async (e) => {
                            usernameRegister.onBlur(e);
                            handleEmailBlur();
                        }}
                        onChange={() => {
                            if (isRegisteredUser) {
                                setRegisteredUser(false);
                            }
                        }}
                        isError={Boolean(errors.email || errors.root)}
                    >
                        <FormError error={errors.email?.message ?? ""} />
                    </FormInput>

                    <FormInput
                        type="password"
                        {...passwordRegister}
                        onChange={async (e) => {
                            passwordRegister.onChange(e);
                            await trigger("password");
                        }}
                        label={Messages.PAGE_LOGIN_TEXT.LABEL_PASSWORD}
                        isError={Boolean(errors.password || errors.root)}
                    >
                        <FormError error={errors.password?.message ?? ""} />

                        {isRegisteredUser && (
                            <div className="text-center">
                                <Paragraph
                                    text={
                                        <>
                                            {Messages.AUTH.FORGOT_PASSWORD +
                                                " "}
                                            <Link
                                                href={`/login/forgot-password?email=${emailParam}`}
                                            >
                                                <LableLink
                                                    text=" aquí"
                                                    textColor="text-cyan-800"
                                                />
                                            </Link>
                                        </>
                                    }
                                />
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
                                    {Messages.PAGE_LOGIN_TEXT.NOT_REGISTERED +
                                        " "}
                                    <Link href="/register">
                                        <LableLink
                                            text={
                                                Messages.REGISTER.REGISTER_LABEL
                                            }
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
