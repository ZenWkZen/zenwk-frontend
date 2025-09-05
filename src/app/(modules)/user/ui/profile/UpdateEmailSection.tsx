import { useEffect, useState } from 'react';
import { UserDTO } from '@app/app/(modules)/user/types/user-dto';
import { Messages } from '@app/shared/constants/messages';
import { formValidate } from '@app/shared/utils/formValidate';
import { useForm, useWatch } from 'react-hook-form';
import { RefreshCcw, MailCheck } from 'lucide-react';

import ProfileButtomForm from '@app/app/(modules)/user/components/profile/ProfileButtomForm';
import ProfileItemHeader from '@user/components/profile/ProfileItemHeader';
import InputText from '@user/ui/inputs/InputText';
import FormErrorUser from '@user/ui/forms/FormErrorUser';
import Subtitle from '@user/ui/user-feed/Subtitle';
import Text from '@user/ui/user-feed/Text';
import OpenMailbox from '@auth/components/OpenMailbox';

/**
 *
 * @param param0
 * @returns
 */
const UpdateEmailSection = ({ userDTO }: { userDTO: UserDTO }) => {
    const [emailChangeSucceeded, setEmailChangeSucceeded] = useState(false);
    const [isNewEmail, setIsNewEmail] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [lineLoading, setLineLoading] = useState(false);
    const [loadBtnUpdateEmail, setLoadBtnUpdateEmail] = useState(false);
    const { requiredEmail, patternEmail, validateEquals } = formValidate();

    const [isApprove, setApprove] = useState(false);

    const {
        clearErrors,
        getValues,
        setValue,
        trigger,
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors, isValid },
    } = useForm<{ email: string; reemail: string }>({ mode: 'all' });

    const emailValue = useWatch({ control, name: 'email' });
    const reemailValue = useWatch({ control, name: 'reemail' });

    /**
     * Evento validación de igualadad email / reemail
     */
    useEffect(() => {
        if (emailValue?.length > 0) {
            trigger('reemail');
        } else if (!emailValue) {
            clearErrors();
        }
    }, [trigger, clearErrors, emailValue]);

    /**
     * Habilitar boton actualizar cuando no hayan errores.
     */
    useEffect(() => {
        if (isValid && reemailValue?.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [isValid, reemailValue, getValues, emailValue]);

    /**
     * Configuración de validación para el campo de contraseña.
     */
    const emailRegister = register('email', {
        required: requiredEmail,
        pattern: patternEmail,
    });

    /**
     * Configuración de validación para el campo de contraseña.
     */
    const reEmailRegister = register('reemail', {
        required: requiredEmail,
        pattern: patternEmail,
        validate: validateEquals(
            getValues('email'),
            'Las direcciones de correo no coinciden.'
        ),
    });
    /**
     * Envio de formulario.
     */
    const onSubmit = handleSubmit(async (data) => {
        setLineLoading(true);
        setLoadBtnUpdateEmail(true);
        try {
            // Consumir api de creación de evento  y link
            console.log(data);
        } catch (error) {
            setError('root', { message: error as string });
        } finally {
            await new Promise((resolve) => setTimeout(resolve, 400));
            setEmailChangeSucceeded(true);
            setLineLoading(false);
            setLoadBtnUpdateEmail(false);
            setValue('email', '');
            setValue('reemail', '');
            // borrar simula la aprobación
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setEmailChangeSucceeded(false);
            setApprove(true);
        }
    });

    const handleClikApprove = async () => {
        try {
            setLineLoading(true);
            setLoadBtnUpdateEmail(true);
            // Consumir api de verificacion
            console.log('handleClikApprove');
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLineLoading(false);
            setLoadBtnUpdateEmail(false);
            setApprove(false);
            setIsNewEmail(true);
        }
    };

    return (
        <div>
            {/** Encabezado de la sección */}

            <ProfileItemHeader
                text={
                    <div className="">
                        {isApprove ? (
                            'Confirma tu correo para activar los cambios.'
                        ) : emailChangeSucceeded ? (
                            <>
                                Revisa tu bandeja de entrada y aprueba el cambio
                                de correo electrónico.
                                <div className="">
                                    <OpenMailbox
                                        isSuccessResend={false}
                                        typeStyle="profileConfiguration"
                                    />
                                </div>
                            </>
                        ) : (
                            <div>
                                {isNewEmail ? (
                                    <>
                                        ¡Listo! Tu nueva dirección de correo es
                                        <label className="font-[340]">
                                            {' ' + userDTO.email}
                                        </label>
                                    </>
                                ) : (
                                    <div className="">
                                        El correo asociado a tu cuenta es
                                        <label className="font-[340]">
                                            {' ' + userDTO.email}
                                        </label>
                                    </div>
                                )}
                            </div>
                        )}{' '}
                    </div>
                }
                lineLoading={lineLoading}
            />

            {/** Cuerpo de la sección */}
            {isApprove ? (
                <div className="py-8 text-center" onClick={handleClikApprove}>
                    <ProfileButtomForm
                        lineLoading={lineLoading}
                        buttonLoading={loadBtnUpdateEmail}
                        icon={<MailCheck size={17} strokeWidth={1.5} />}
                        text="Aprobar"
                        shape="square"
                        positionToltip="top"
                        nameButtom="Confirmar correo "
                    />
                </div>
            ) : (
                <div className="mt-4 px-2">
                    <Text
                        text="Aquí puedes actualizar tu dirección de correo"
                        className="font-[350] tracking-normal text-gray-700"
                        sizeOffset={1}
                    />
                    {/** Cuerpo de la sección */}
                    <form onSubmit={onSubmit}>
                        {/* Apellidos */}

                        <Subtitle
                            text="Ingresa tu nuevo correo"
                            isError={Boolean(errors.email)}
                            sizeOffset={-4}
                        />

                        <div className="mb-1 w-[80%] flex-1">
                            <InputText
                                placeholder={Messages.placeholder.emailExample}
                                {...emailRegister}
                                isError={Boolean(errors.email)}
                            >
                                <FormErrorUser
                                    sizeOffset={-15}
                                    error={errors.email?.message ?? ''}
                                />
                            </InputText>
                        </div>
                        <Subtitle
                            text="Confirma tu nuevo correo"
                            isError={Boolean(errors.reemail || errors.root)}
                            sizeOffset={-4}
                            className="py-1"
                        />
                        <div className="mb-4 w-[80%] flex-1">
                            <InputText
                                placeholder={Messages.placeholder.emailExample}
                                {...reEmailRegister}
                                isError={Boolean(errors.reemail)}
                            >
                                <FormErrorUser
                                    sizeOffset={-15}
                                    error={errors.reemail?.message ?? ''}
                                />
                            </InputText>
                        </div>

                        <button type="submit" disabled={disabled}>
                            <ProfileButtomForm
                                disabled={disabled}
                                lineLoading={lineLoading}
                                buttonLoading={loadBtnUpdateEmail}
                                icon={
                                    <RefreshCcw size={17} strokeWidth={1.5} />
                                }
                                text="Actualizar email"
                                shape="square"
                                positionToltip="top"
                            />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateEmailSection;
