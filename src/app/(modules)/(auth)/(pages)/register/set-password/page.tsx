"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { SetPassword, ClientErrorMessage } from "<app>/app/interfaces/auth";
import { formValidate } from "../../../../../utils/formValidate.js";
import { fetchJwtBaseApi } from "<app>/app/helpers/fecth-api";

import FormInput from "../../../components/FormInput";
import FormError from "../../../components/FormError";
import HeaderText from "../../../components/HeaderText";
import Button from "../../../components/Button";
import InputDisabled from "../../../components/InputDisabled";
import useRedirectRegister from "../../../hooks/useRedirectRegister";

const page = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") as string;
    const uuid = searchParams.get("uuid") as string;
    const [loading, setLoading] = useState(true);
    const { requiredPassword, patternPassword, validateEquals } =
        formValidate();

    const {
        setError,
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm<SetPassword>({ mode: "all" });

    /**
     * useEffect del componente.
     */
    useRedirectRegister(email, uuid, setLoading);

    /**
     * Cargador ...
     */
    if (loading) return <span>Cargando ..... </span>;

    /**
     * Procesa el formulario de set-password. Consume el API de crear usuario.
     * @oaram data
     */
    const onSubmit = handleSubmit(async (data) => {
        const path = "/users";

        try {
            const createUserJson = {
                username: email.split("@")[0],
                password: data.password,
                email,
            };
            const result = await fetchJwtBaseApi(
                path,
                undefined,
                undefined,
                createUserJson,
                "POST"
            );

            if (result) {
                // recuperar jwt...
            }
        } catch (error: unknown) {
            const errors = error as ClientErrorMessage;
            setError("repassword", { message: errors.message });
        }
    });

    return (
        <>
            <div className="grid justify-center px-2">
                <HeaderText text="Elige una contraseña" isCenter={false} />
                <form onSubmit={onSubmit}>
                    <InputDisabled text={email} />

                    <FormInput
                        label="Contraseña"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        {...register("password", {
                            required: requiredPassword,
                            pattern: patternPassword,
                        })}
                        isError={Boolean(errors.password)}
                    >
                        <FormError error={errors.password?.message ?? ""} />
                    </FormInput>

                    <FormInput
                        label="Confirmar contraseña"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        {...register("repassword", {
                            validate: validateEquals(getValues("password")),
                        })}
                        isError={Boolean(errors.repassword)}
                    >
                        <FormError error={errors.repassword?.message ?? ""} />
                    </FormInput>

                    <Button type="submit" text="Registrate" />
                </form>
            </div>
        </>
    );
};

export default page;
