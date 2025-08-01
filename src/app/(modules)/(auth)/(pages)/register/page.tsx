"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { formValidate } from "@app/shared/utils/formValidate";
import {
    fetchTokenApi,
    fetchValidateRegisterEmail,
} from "@app/helpers/fetch-api";

import HeaderText from "@app/shared/components/HeaderText";
import Title from "@app/shared/components/Title";
import FormInput from "@app/shared/components/FormInput";
import FormError from "@app/shared/components/FormError";
import Button from "@app/shared/components/Button";
import { AuthMessages } from "../../constants/auth-messages";
import { Messages } from "@app/shared/constants/messages";
import CenteredHeaderWithBack from "@auth/components/CenteredHeaderWithBack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 * Registro del usuario, renderiza la pantalla para la gestión del OTP.
 */
const Register = () => {
    // Obtiene parámetros de la URL
    const searchParams = useSearchParams();
    const emailFromLogin = searchParams.get("email") as string;

    // Hook para navegación programática
    const router = useRouter();

    // Reglas de validación para el campo email
    const { requiredEmail, patternEmail } = formValidate();

    // Hook para manejar formularios
    const {
        setError,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ email: string }>();

    /**
     * Evento de envío del formulario.
     * Valida el email, solicita el token y redirige según resultado.
     * @param data - Datos del formulario
     */
    const onSubmit = handleSubmit(async (data) => {
        try {
            const validateEmail = await fetchValidateRegisterEmail(data.email);
            if (!validateEmail) {
                const result = await fetchTokenApi(data.email);
                console.log(result);
                if (result) {
                    router.push(
                        `/register/opt?email=${encodeURIComponent(result.email)}&uuid=${encodeURIComponent(result.uuid)}`
                    );
                }
            } else {
                router.push(`/login?email=${encodeURIComponent(data.email)}`);
            }
        } catch (error: unknown) {
            // Captura y muestra el error en el campo email
            const errorMessage = error as string;
            setError("email", { message: errorMessage || "Error unknown..." });
        }
    });

    return (
        <>
            <CenteredHeaderWithBack
                icon={
                    <ArrowBackIcon className="mb-2 inline cursor-pointer text-cyan-600 hover:text-cyan-900" />
                }
            >
                {/* Renderiza encabezado según si viene de login o no */}
                {!emailFromLogin && (
                    <Title title={AuthMessages.register.title} />
                )}
                {emailFromLogin && (
                    <>
                        <Title title={AuthMessages.register.subtitle} />
                    </>
                )}
            </CenteredHeaderWithBack>
            <HeaderText text={AuthMessages.register.welcome} />

            {/* Formulario de ingreso de correo */}
            <div className="grid justify-items-center px-2">
                <form onSubmit={onSubmit}>
                    <FormInput
                        type="root"
                        label={AuthMessages.inputs.email}
                        placeholder={Messages.placeholder.emailExample}
                        {...register("email", {
                            required: requiredEmail,
                            pattern: patternEmail,
                            value: emailFromLogin && emailFromLogin,
                        })}
                        isError={Boolean(errors.email || errors.root)}
                    >
                        <FormError error={errors.email?.message ?? ""} />
                    </FormInput>
                    <Button
                        type="submit"
                        text={AuthMessages.buttons.registerWithEmail}
                    />
                </form>
            </div>
        </>
    );
};

export default Register;
