"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formValidate } from "../../../../utils/formValidate.js";
import { fetchJwtBaseApi } from "<app>/app/helpers/fecth-api";
import { ClientErrorMessage } from "<app>/app/interfaces/errors";

import Title from "../../components/Title";
import FormInput from "../../components/FormInput";
import FormError from "../../components/FormError";
import ButtonLoading from "../../components/ButtonLoading";
import Button from "../../components/Button";
import Label from "../../components/Label";
import SubTitle from "../../components/SubTitlle";

interface LoginForm {
  email: string;
  password: string;
}

/**
 * @abstract Pagina del lado del cliente para el Login correspondiente.
 * @returns
 */
const Login = () => {
  const { requiredEmail, requiredPassword, patternEmail, minLength } =
    formValidate();
  const [loading, setLoding] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>();

  /**
   * @abstract Procesa el formulario de incio de sesión. Consume el API de login.
   *
   */
  const onSubmit = handleSubmit(async (data) => {
    const path = "/auth/login";
    const loginJson = { username: data.email, password: data.password };

    try {
      const result = await fetchJwtBaseApi(
        path,
        undefined,
        undefined,
        loginJson,
        "POST"
      );
    } catch (error: unknown) {
      const errors = error as ClientErrorMessage;
      switch (errors.code) {
        case "FUNC_SEC_006":
          return setError("email", { message: errors.message });
        case "FUNC_SEC_017":
          return setError("password", { message: errors.message });
        default:
          return setError("root", { message: (error as Error).message });
      }
    }
  });

  return (
    <>
      <Title title="Bienvenido a Zenwk" />
      <SubTitle text="Inicia sesión y descubre una forma motivadora y eficiente de gestionar tus actividades." />
      <form onSubmit={onSubmit} className="flex flex-col items-center ">
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

        <FormInput
          type="password"
          {...register("password", { required: requiredPassword, minLength })}
          label="Ingresa tu contraseña"
          isError={Boolean(errors.password || errors.root)}
        >
          <FormError error={errors.password} />
        </FormInput>
        {loading ? (
          <ButtonLoading />
        ) : (
          <Button type="submit" text="Iniciar sesión" />
        )}
      </form>
    </>
  );
};

export default Login;
