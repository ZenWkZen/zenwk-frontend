"use client";

import FormInput from "../../../components/FormInput";
import HeaderText from "../../../components/HeaderText";
import Title from "../../../components/Title";
import FormError from "../../../components/FormError";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Link from "next/link";
import LableLink from "../../../components/LableLink";

import { useForm } from "react-hook-form";
import { formValidate } from "../../../../../utils/formValidate.js";
import { LoginForm } from "<app>/app/interfaces/auth";
import { useSearchParams } from "next/navigation";
import {
    fecthValidateRegisterEmail,
    fetchJwtBaseApi,
    getUrlServer,
    fethStackVerifcation,
} from "<app>/app/helpers/fecth-api";
import { ClientErrorMessage } from "<app>/app/interfaces/auth";
import { useState } from "react";
import { Messages } from "<app>/constants/messages";
import { getBaseUrl } from "<app>/app/helpers/api-helper";

const ForgotPassword = () => {
    const searchParams = useSearchParams();
    const emailFromLogin = searchParams.get("email") as string;
    const { patternEmail, requiredEmail } = formValidate();
    const [isRegisteredEmail, setRegisteredEmail] = useState(true);
    const [paramEmail, setParamEmail] = useState("");
    const [isSendEmail, setSendEmail] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginForm>();

    /**
     *
     */
    const onSubmit = handleSubmit(async (data) => {
        try {
            if (await fecthValidateRegisterEmail(data.email)) {
                const path = "/verification/token/reset-password";
                const param = {
                    email: data.email,
                    pathUrl: getUrlServer() + "/login/reset-password",
                };
                const res = await fethStackVerifcation(
                    path,
                    undefined,
                    param,
                    "POST"
                );
                console.log(res);
            } else {
                setParamEmail(data.email);
                setRegisteredEmail(false);
            }
        } catch (error) {
            const terrorFromBack = error as ClientErrorMessage;
            setError("email", { message: terrorFromBack.message });
        }
    });

    return (
        <>
            <Title title={Messages.FORGOT_PASSWORD.TITLE} />
            <HeaderText text={Messages.FORGOT_PASSWORD.SUBTITLE} />
            <div className="grid justify-center">
                <form onSubmit={onSubmit}>
                    <FormInput
                        type="root"
                        label={Messages.PAGE_LOGIN_TEXT.LABEL_EMAIL}
                        placeholder="name@your-email.com"
                        {...register("email", {
                            required: requiredEmail,
                            pattern: patternEmail,
                            value: emailFromLogin || "",
                        })}
                        onChange={() => setRegisteredEmail(true)}
                        isError={Boolean(errors.email)}
                    >
                        <FormError error={errors.email?.message || ""} />
                    </FormInput>
                    {!isRegisteredEmail && (
                        <Label
                            text={
                                <div className="text-center">
                                    {Messages.PAGE_LOGIN_TEXT.NOT_REGISTERED +
                                        " "}
                                    <Link
                                        href={`/register?email=${paramEmail}`}
                                    >
                                        <LableLink
                                            text={
                                                Messages.REGISTER.REGISTER_LABEL
                                            }
                                        />
                                    </Link>
                                </div>
                            }
                        />
                    )}
                    <Button
                        type="submit"
                        text={Messages.BUTTONS.FORGOT_PASSWORD}
                    />
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
