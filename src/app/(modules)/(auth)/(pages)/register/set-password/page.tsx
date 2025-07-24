"use client";

import { useForm } from "react-hook-form";
import { SetPassword, ClientErrorMessage } from "<app>/app/interfaces/auth";
import { formValidate } from "../../../../../utils/formValidate.js";
import { fetchJwtBaseApi } from "<app>/app/helpers/fecth-api";

import FormInput from "../../../components/FormInput";
import FormError from "../../../components/FormError";
import HeaderText from "../../../components/HeaderText";
import Button from "../../../components/Button";
import InputDisabled from "../../../components/InputDisabled";
import { useSearchParams } from "next/navigation";
import { Password } from "@mui/icons-material";

const page = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") as string;
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
                // Redirigir a dashboard del usuario
            }
        } catch (error: unknown) {
            const errors = error as ClientErrorMessage;
            console.log(errors.message);
        }
    });

    return (
        <>
            <div className="grid justify-center px-2">
                <HeaderText text="Elige una contraseña" isCenter={false} />
                <form onSubmit={onSubmit}>
                    <InputDisabled text="caalegria666@gmail.com" />

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
                        <FormError error={errors.password} />
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
                        <FormError error={errors.repassword} />
                    </FormInput>

                    <Button type="submit" text="Registrate" />
                </form>
            </div>
        </>
    );
};

export default page;
