"use client";

import { useForm, useWatch } from "react-hook-form";
import { SetPassword, ClientErrorMessage } from "@app/shared/interfaces/auth";
import { formValidate } from "@app/shared/utils/formValidate";
import { AuthMessages } from "@auth/constants/auth-messages";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

import FormInput from "@app/app/(modules)/(auth)/ui/FormInput";
import FormError from "@app/shared/components/FormError";
import HeaderText from "@app/app/(modules)/(auth)/ui/HeaderText";
import InputDisabled from "@app/app/(modules)/(auth)/ui/InputDisabled";
import CenteredHeaderWithBack from "@auth/components/CenteredHeaderWithBack";
import Title from "@app/app/(modules)/(auth)/ui/Title";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useRedirectRegister from "@auth/hooks/useRedirectRegister";
import LoadButton from "@auth/components/LoadButton";
import Spinner from "@app/shared/components/Spinner";

/**
 * Interface que prepsenta los valores permitidos en la desestructuración.
 */
interface Props {
    buttonText: string;
    title: string;
    headerText: string;
    isResetPassword?: boolean;
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
const SetPasswordUser = React.memo(
    ({
        title,
        headerText,
        buttonText,
        onSubmitPassword,
        isResetPassword = false,
    }: Props) => {
        const searchParams = useSearchParams();
        const email = searchParams.get("email") ?? "";
        const uuid = searchParams.get("uuid") ?? "";
        const tokenCode = searchParams.get("code") ?? "";
        const [loading, setLoading] = useState(true);
        const [isBtnLoading, setBtnLoading] = useState(false);
        const router = useRouter();
        const [errorPassword, setErrorPassword] = useState(false);

        const { requiredPassword, patternPassword, validateEquals } =
            formValidate();

        const {
            setError,
            trigger,
            handleSubmit,
            register,
            getValues,
            control,
            clearErrors,
            formState: { errors },
        } = useForm<SetPassword>({ mode: "all" });

        const passwordValue = useWatch({ control, name: "password" });

        /**
         * useEffect del componente.
         */
        useRedirectRegister(email, uuid, setLoading, isResetPassword);

        /**
         * UseEffect para controlar el campo repassword
         */
        useEffect(() => {
            if (passwordValue?.length === 1) {
                trigger("repassword");
            } else if (!passwordValue) {
                clearErrors();
            }
        }, [passwordValue, trigger, clearErrors]);

        /**
         * Cargador ...
         */
        if (loading) {
            return <Spinner />;
        }

        const handleIcon = () =>
            errorPassword && (
                <ArrowBackIcon className="mb-2 inline cursor-pointer text-red-300 hover:text-red-400" />
            );
        /**
         * Procesa el formulario de set-password. Consume el API de crear usuario.
         * @oaram data
         */
        const onSubmit = handleSubmit(async (data) => {
            setBtnLoading(true);
            try {
                await onSubmitPassword(email, data.password, uuid, tokenCode);
            } catch (error: unknown) {
                const errors = error as ClientErrorMessage;
                setError("repassword", { message: errors.message });
                setErrorPassword(true);
            } finally {
                setBtnLoading(false);
            }
        });

        /** Componente JSX con el formulario para el reingreso de contraseña. */
        return (
            <>
                <CenteredHeaderWithBack
                    onBack={() => errorPassword && router.push(`/`)}
                    icon={handleIcon()}
                >
                    <Title title={title} />
                </CenteredHeaderWithBack>
                <div className="grid justify-center px-2">
                    {!isResetPassword && (
                        <HeaderText text={headerText} isCenter={false} />
                    )}
                    <form onSubmit={onSubmit}>
                        {!isResetPassword && <InputDisabled text={email} />}

                        <FormInput
                            label={
                                isResetPassword
                                    ? AuthMessages.login.resetPassword
                                          .newPassword
                                    : AuthMessages.inputs.password
                            }
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
                            label={
                                isResetPassword
                                    ? AuthMessages.login.resetPassword
                                          .newRePassword
                                    : AuthMessages.inputs.repasword
                            }
                            type="password"
                            placeholder={AuthMessages.placeholder.repassword}
                            {...register("repassword", {
                                validate: validateEquals(getValues("password")),
                            })}
                            isError={Boolean(errors.repassword)}
                        >
                            <FormError
                                error={errors.repassword?.message ?? ""}
                            />
                        </FormInput>

                        <LoadButton
                            loading={isBtnLoading}
                            textButton={buttonText}
                            textLoading={
                                isResetPassword
                                    ? AuthMessages.buttons.redirectLogin
                                    : buttonText
                            }
                        />
                    </form>
                </div>
            </>
        );
    }
);

export default SetPasswordUser;
