"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { formValidate } from "../../../../utils/formValidate.js";
import { fetchTokenApi, fetchJwtBaseApi } from "<app>/app/helpers/fecth-api";
import { ClientErrorMessage } from "<app>/app/interfaces/auth.js";

import HeaderText from "../../components/HeaderText";
import FormInput from "../../components/FormInput";
import FormError from "../../components/FormError";
import Button from "../../components/Button";

/**
 * Registro del usuario, renderiza al page para la gestion del OPT.
 * @returns
 */
const register = () => {
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
            const path = "/users/email/" + data.email;
            const validateEmail = await fetchJwtBaseApi(
                path,
                undefined,
                undefined,
                undefined,
                "GET"
            );

            if (!validateEmail) {
                const result = await fetchTokenApi(data.email);
                if (result) {
                    router.push(
                        `/register/opt?email=${encodeURIComponent(data.email)}`
                    );
                }
            }
        } catch (error: unknown) {
            const errors = error as ClientErrorMessage;
            if (errors.code === "FUNC_SEC_USER_0001") {
                router.push(`/login?email=${encodeURIComponent(data.email)}`);
            } else {
                setError("root", { message: (error as Error).message });
            }
        }
    });

    return (
        <>
            <HeaderText text="Empezar a usar ZenWK" />
            <div className="grid justify-items-center px-2">
                <form onSubmit={onSubmit}>
                    <FormInput
                        type="root"
                        label="Dirección de email"
                        placeholder="name@your-email.com"
                        {...register("email", {
                            required: requiredEmail,
                            pattern: patternEmail,
                        })}
                        isError={Boolean(errors.email || errors.root)}
                    >
                        <FormError error={errors.email} />
                    </FormInput>
                    <Button type="submit" text="Continuar con email" />
                </form>
            </div>
        </>
    );
};

export default register;
