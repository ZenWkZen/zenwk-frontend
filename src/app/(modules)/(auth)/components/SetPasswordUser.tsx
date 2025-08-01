"use client";

import { useForm } from "react-hook-form";
import { SetPassword, ClientErrorMessage } from "@app/shared/interfaces/auth";
import { formValidate } from "@app/shared/utils/formValidate";
import { fetchJwtBaseApi } from "@app/helpers/fetch-api";
import { AuthMessages } from "@auth/constants/auth-messages";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import FormInput from "@app/shared/components/FormInput";
import FormError from "@app/shared/components/FormError";
import HeaderText from "@app/shared/components/HeaderText";
import Button from "@app/shared/components/Button";
import InputDisabled from "@app/shared/components/InputDisabled";
import CenteredHeaderWithBack from "@auth/components/CenteredHeaderWithBack";
import Title from "@app/shared/components/Title";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useRedirectRegister from "@auth/hooks/useRedirectRegister";

/**
 * Interface que prepsenta los valores permitidos en la desestructuración.
 */
interface Props {
    buttonText: string;
    title: string;
    headerText: string;
    onSubmitPassword: (
        email: string,
        password: string,
        uuid: string | "",
        tokenCode: string | ""
    ) => Promise<void>;
}

/**
 * Componente génerico con formulario para el reingreso de password.
 * @param param0
 * @returns
 */
const SetPasswordUser = ({
    title,
    headerText,
    buttonText,
    onSubmitPassword,
}: Props) => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "";
    const uuid = searchParams.get("uuid") ?? "";
    const tokenCode = searchParams.get("code") ?? "";
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
            await onSubmitPassword(email, data.password, uuid, tokenCode);
        } catch (error: unknown) {
            const errors = error as ClientErrorMessage;
            console.log("-----------", errors);
            setError("repassword", { message: errors.message });
        }
    });

    /** Componente JSX con el formulario para el reingreso de contraseña. */
    return (
        <>
            <CenteredHeaderWithBack
                icon={
                    <ArrowBackIcon className="mb-2 inline cursor-pointer text-cyan-600 hover:text-cyan-900" />
                }
            >
                <Title title={title} />
            </CenteredHeaderWithBack>
            <div className="grid justify-center px-2">
                <HeaderText text={headerText} isCenter={false} />
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

                    <Button type="submit" text={buttonText} />
                </form>
            </div>
        </>
    );
};

export default SetPasswordUser;
