'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formValidate } from '@app/shared/utils/formValidate';
import {
    fetchJwtBaseApi,
    fetchValidateRegisterEmail,
} from '@app/helpers/fetch-api';
import { ClientErrorMessage, LoginForm } from '@app/shared/interfaces/auth';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation.js';
import { AuthMessages } from '@auth/constants/auth-messages';
import { AuthErrors } from '../../constants/auth-errors';
import { Messages } from '@app/shared/constants/messages';
import { useJwtContext } from '@user/utils/useJwtContext';
import { loginApi } from '@auth/utils/authUtils';
import { UsePersonContext } from '@user/utils/UsePersonContext';
import { fetchGetUser } from '@auth/utils/authUtils';
import { getPerson } from '@user/utils/personUtils';

import Title from '@app/app/(modules)/(auth)/ui/Title';
import FormInput from '@app/app/(modules)/(auth)/ui/FormInput';
import FormError from '@app/shared/ui/FormError';
import HeaderText from '@app/app/(modules)/(auth)/ui/HeaderText';
import LabelLink from '@app/app/(modules)/(auth)/ui/LabelLink';
import Paragraph from '@app/shared/ui/Paragraph';
import Link from 'next/link';

import CenteredHeaderWithBack from '../../components/CenteredHeaderWithBack';
import HomeIcon from '@mui/icons-material/Home';
import LoadButton from '@auth/components/LoadButton';
import Spinner from '@app/shared/ui/Spinner';

/**
 * Página login: ssta vista presenta un formulario de autenticación para que el usuario ingrese
 * su correo electrónico y contraseña. Valida los datos, muestra errores en caso de
 * fallos y redirige al usuario tras un login exitoso. También puede precargar el
 * email si se recibe como parámetro en la URL.
 */
const Login = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [emailParam, setEmailParam] = useState('');
    const { requiredEmail, requiredPassword, patternEmail, minLength } =
        formValidate();
    const [loading, setLoding] = useState(true);
    const [isRegisteredUser, setRegisteredUser] = useState(false);
    const [isBtnLoading, setBtnLoading] = useState(false);
    const {
        getValues,
        trigger,
        register,
        handleSubmit,
        setError,
        setValue,
        setFocus,
        formState: { errors },
    } = useForm<LoginForm>();
    const { user, setUser } = useJwtContext();
    const { setPerson } = UsePersonContext();

    /**
     * Prellena el campo de email si se recibe como parámetro en la URL (?email=).
     * Ejecutado en el primer render y al cambiar los searchParams.
     */
    useEffect(() => {
        const emailFromParam = searchParams.get('email');

        if (emailFromParam) {
            setEmailParam(emailFromParam);
            setValue('email', emailFromParam);
        }

        // Registrar los datos para mantener la sesión del usuario.
        // Se debe implementar desde el Backend Cookies httpOnly
        // LocalStorage es vulnerable a ataques XSS
        if (user.jwt && user.userId) {
            // linea temporal mientras se httpOnly...
            localStorage.setItem('jwt-user', JSON.stringify(user));
            router.push('/user');
        }

        setLoding(false);
    }, [user, setUser]);

    /**
     * Cargador ...
     */
    if (loading) {
        return <Spinner />;
    }

    /**
     * Configuración de validación para el campo de email.
     */
    const passwordRegister = register('password', {
        required: requiredPassword,
        minLength,
    });

    /**
     * Configuración de validación para el campo de contraseña.
     */
    const usernameRegister = register('email', {
        required: requiredEmail,
        pattern: patternEmail,
    });

    /** Al perder el foco del campo email, valida si el correo está registrado
     * para habilitar la opción de recuperación de contraseña.
     */
    const handleEmailBlur = async () => {
        const isValid = await trigger('email');
        const emailOnBlur = getValues('email');
        if (isValid) {
            try {
                const path = `/users/email/${emailOnBlur}`;
                // Validación si el email ya esta registrado
                const res = await fetchValidateRegisterEmail(emailOnBlur);
                if (res) {
                    setEmailParam(emailOnBlur);
                    setRegisteredUser(res);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    /**
     Envía las credenciales al backend para iniciar sesión.
     Redirige a registro si el usuario no existe o muestra errores según el código.
     */
    const onSubmit = handleSubmit(
        async (data) => {
            setBtnLoading(true);
            try {
                // Utilidad loginApi
                const res = await loginApi(data.email, data.password);
                // Pausa para mejorar la interacción con el usuario
                await new Promise((resolve) => setTimeout(resolve, 500));

                if (res) {
                    // Se actualiza contexto
                    const userData = { jwt: res.token, userId: res.userId };
                    setUser(userData);
                    const userDto = await fetchGetUser(userData);

                    // Recuperamos la persona si esta creada
                    if (userDto.idPerson) {
                        const personaDto = await getPerson(
                            userDto.idPerson,
                            userData.jwt
                        );
                        setPerson(personaDto);
                    }
                }
            } catch (error: unknown) {
                console.log(error);
                const errors = error as ClientErrorMessage;
                switch (errors.code) {
                    case AuthErrors.funciontal.login.notFoundUsername:
                        return router.push(`/register?email=${data.email}`);
                    case AuthErrors.funciontal.login.badCredentials:
                        setError('password', { message: errors.message });
                        setFocus('password');
                        return;
                    default:
                        return setError('root', {
                            message: (error as Error).message,
                        });
                }
            } finally {
                setBtnLoading(false);
            }
        },
        (clientErrors) => {
            if (clientErrors.email) {
                setFocus('email');
            } else if (clientErrors.password) {
                setFocus('password');
            }
        }
    );

    /**
     * Componente React con el formulario de login.
     */
    return (
        <>
            <CenteredHeaderWithBack
                icon={
                    <HomeIcon className="mb-2 inline cursor-pointer text-cyan-600 hover:text-cyan-900" />
                }
                onBack={() => router.push('/')}
            >
                <Title title={AuthMessages.login.title} />
            </CenteredHeaderWithBack>
            <HeaderText text={AuthMessages.login.subtitle} />
            <div className="grid justify-items-center px-2">
                <form onSubmit={onSubmit}>
                    <FormInput
                        type="root"
                        label={AuthMessages.inputs.email}
                        placeholder={Messages.placeholder.emailExample}
                        {...usernameRegister}
                        onBlur={async (e) => {
                            usernameRegister.onBlur(e);
                            handleEmailBlur();
                        }}
                        onChange={() => {
                            if (isRegisteredUser) {
                                setRegisteredUser(false);
                            }
                        }}
                        isError={Boolean(errors.email || errors.root)}
                    >
                        <FormError error={errors.email?.message ?? ''} />
                    </FormInput>

                    <FormInput
                        type="password"
                        {...passwordRegister}
                        onChange={async (e) => {
                            passwordRegister.onChange(e);
                            await trigger('password');
                        }}
                        label={AuthMessages.inputs.password}
                        isError={Boolean(errors.password || errors.root)}
                    >
                        <FormError error={errors.password?.message ?? ''} />

                        {isRegisteredUser && (
                            <div className="text-center">
                                <Paragraph
                                    text={
                                        <>
                                            {
                                                AuthMessages.forgotPassword
                                                    .linkText
                                            }
                                            <Link
                                                href={`/login/forgot-password?email=${emailParam}`}
                                            >
                                                <LabelLink
                                                    text={
                                                        Messages.commons
                                                            .literalTexts.here
                                                    }
                                                    textColor="text-cyan-800"
                                                />
                                            </Link>
                                        </>
                                    }
                                />
                            </div>
                        )}
                    </FormInput>
                    <LoadButton
                        loading={isBtnLoading}
                        textButton={AuthMessages.buttons.login}
                    />

                    <div className="mt-7 text-center">
                        <Paragraph
                            text={
                                <>
                                    {AuthMessages.register.promptText}
                                    <Link href="/register">
                                        <LabelLink
                                            text={
                                                AuthMessages.register.linkText
                                            }
                                            textColor="text-cyan-800"
                                        />
                                    </Link>
                                </>
                            }
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
