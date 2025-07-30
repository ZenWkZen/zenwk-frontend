"use client";

import { SearchParams } from "next/dist/server/request/search-params.js";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { formValidate } from "../../../../utils/formValidate.js";
import {
    fetchTokenApi,
    fecthValidateRegisterEmail,
} from "<app>/app/helpers/fecth-api";
import { ClientErrorMessage } from "<app>/app/interfaces/auth.js";

import HeaderText from "../../components/HeaderText";
import FormInput from "../../components/FormInput";
import FormError from "../../components/FormError";
import Button from "../../components/Button";

/**
 * Registro del usuario, renderiza al page para la gestion del OPT.
 * @returns
 */
const Register = () => {
    const searchParams = useSearchParams();
    const emailFromLogin = searchParams.get("email") as string;
    const router = useRouter();
    const { requiredEmail, patternEmail } = formValidate();
    const {
        register,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<{ email: string }>();

    /**
     * Evento evento de envió del formulario.
     * @param data
     */
    const onSubmit = handleSubmit(async (data) => {
        try {
            const validateEmail = await fecthValidateRegisterEmail(data.email);
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
            console.log("Se ha presentado un error inesperado: ", error);
        }
    });

    return (
        <>
            {!emailFromLogin && <HeaderText text="Empezar a usar ZenWK" />}
            {emailFromLogin && (
                <>
                    <HeaderText text="Crea tu cuenta y da el primer paso." />
                </>
            )}
            <div className="grid justify-items-center px-2">
                <form onSubmit={onSubmit}>
                    <FormInput
                        type="root"
                        label="Dirección de email"
                        placeholder="name@your-email.com"
                        {...register("email", {
                            required: requiredEmail,
                            pattern: patternEmail,
                            value: emailFromLogin && emailFromLogin,
                        })}
                        isError={Boolean(errors.email || errors.root)}
                    >
                        <FormError error={errors.email?.message ?? ""} />
                    </FormInput>
                    <Button type="submit" text="Continuar con email" />
                </form>
            </div>
        </>
    );
};

export default Register;
