"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import {
    SetPassword,
    ClientErrorMessage,
} from "@app/shared/interfaces/auth.js";
import { formValidate } from "@app/shared/utils/formValidate";
import { fetchJwtBaseApi } from "@app/helpers/fetch-api";

import FormInput from "@app/shared/components/FormInput";
import FormError from "@app/shared/components/FormError";
import HeaderText from "@app/shared/components/HeaderText";
import Button from "@app/shared/components/Button";
import InputDisabled from "@app/shared/components/InputDisabled";
import useRedirectRegister from "@auth/hooks/useRedirectRegister";
import { AuthMessages } from "@auth/constants/auth-messages";
import CenteredHeaderWithBack from "../../../components/CenteredHeaderWithBack";
import Title from "@app/shared/components/Title";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const page = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") as string;
    const uuid = searchParams.get("uuid") as string;
    const [loading, setLoading] = useState(true);
    const { requiredPassword, patternPassword, validateEquals } =
        formValidate();

    const {
        setError,
        trigger,
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
            <CenteredHeaderWithBack
                icon={
                    <ArrowBackIcon className="mb-2 inline cursor-pointer text-cyan-600 hover:text-cyan-900" />
                }
            >
                <Title title={AuthMessages.register.enterPassword} />
            </CenteredHeaderWithBack>
            <div className="grid justify-center px-2">
                <HeaderText
                    text={AuthMessages.setPassword.title}
                    isCenter={false}
                />
                <form onSubmit={onSubmit}>
                    <InputDisabled text={email} />

                    <FormInput
                        label={AuthMessages.inputs.password}
                        type="password"
                        placeholder={AuthMessages.placeholder.password}
                        {...register("password", {
                            required: requiredPassword,
                            pattern: patternPassword,
                        })}
                        onChange={async (e) => {
                            register("password").onChange(e);
                            await trigger("repassword");
                        }}
                        isError={Boolean(errors.password)}
                    >
                        <FormError error={errors.password?.message ?? ""} />
                    </FormInput>

                    <FormInput
                        label={AuthMessages.inputs.repasword}
                        type="password"
                        placeholder={AuthMessages.placeholder.password}
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
