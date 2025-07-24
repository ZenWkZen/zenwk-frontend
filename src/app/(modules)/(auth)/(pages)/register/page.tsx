"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { formValidate } from "../../../../utils/formValidate.js";
import { fetchTokenApi } from "<app>/app/helpers/fecth-api";

import Title from "../../components/Title";
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
            const result = await fetchTokenApi(data.email);
            if (result) {
                router.push(
                    `/register/opt?email=${encodeURIComponent(data.email)}`
                );
            }
        } catch (error: unknown) {
            setError("root", { message: (error as Error).message });
        }
    });

    return (
        <>
            <Title title="ZenWk" />
            <HeaderText text="Empezar a usar ZenWKß" />
            <div className="grip justify-items-center px-2">
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
