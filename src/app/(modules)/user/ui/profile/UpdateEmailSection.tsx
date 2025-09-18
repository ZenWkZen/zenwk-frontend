import { useEffect, useState } from 'react';
import { UserDTO } from '@app/app/(modules)/user/types/user-dto';
import { Messages } from '@app/shared/constants/messages';
import { formValidate } from '@app/shared/utils/formValidate';
import { useForm, useWatch } from 'react-hook-form';
import { RefreshCcw, MailCheck } from 'lucide-react';

import ProfileButtomForm from '@user/components/profile/ProfileButtomForm';
import ProfileItemHeader from '@user/components/profile/ProfileItemHeader';
import InputText from '@user/ui/inputs/InputText';
import FormErrorUser from '@user/ui/forms/FormErrorUser';
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
    const reemailRegister = register('reemail', {
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
            <ProfileItemHeader lineLoading={lineLoading} />
            {/** Cuerpo de la sección */}
            {isApprove ? (
                <div
                    className="mx-auto flex w-full max-w-[260px] flex-col items-center rounded-md py-8"
                    onClick={handleClikApprove}
                >
                    <ProfileButtomForm
                        lineLoading={lineLoading}
                        buttonLoading={loadBtnUpdateEmail}
                        icon={<MailCheck size={17} strokeWidth={1.5} />}
                        shape="square"
                        positionToltip="top"
                        nameButtom="Confirmar correo"
                    />
                </div>
            ) : (
                <div className="grid items-center justify-items-center py-5">
                    <div className="mx-auto flex w-full max-w-[260px] flex-col items-center rounded-md bg-[#EBF9F0]">
                        {/** Centro de notificaciones de la sección   isNewEmail       bg-gradient-to-r from-green-50 to-[#E8FCF3]*/}
                        {isApprove ? (
                            <p>Confirma tu correo para activar los cambios</p>
                        ) : emailChangeSucceeded ? (
                            <div className="py-3">
                                <Text
                                    text="Revisa tu bandeja de entrada y aprueba el
                                    cambio de correo electrónico"
                                    className="mx-auto max-w-[260px] p-2 text-center text-emerald-700"
                                    sizeOffset={-8}
                                />

                                <OpenMailbox
                                    isSuccessResend={false}
                                    typeStyle="profileConfiguration"
                                />
                            </div>
                        ) : (
                            <>
                                {isNewEmail && (
                                    <Text
                                        text={
                                            '¡Listo! Tu nueva dirección de correo es ' +
                                            userDTO.email
                                        }
                                        className="mx-auto max-w-[260px] p-2 text-center text-emerald-700"
                                        sizeOffset={-8}
                                    />
                                )}
                            </>
                        )}
                    </div>
                    {/** Cuerpo de la sección */}
                    <form onSubmit={onSubmit}>
                        {/* Input: email */}
                        <InputText
                            minWidth={260}
                            text="Nuevo correo"
                            type="text"
                            placeholder={Messages.placeholder.emailExample}
                            {...emailRegister}
                            isError={Boolean(errors.email)}
                        >
                            <FormErrorUser
                                sizeOffset={-15}
                                error={errors.email?.message ?? ''}
                            />
                        </InputText>

                        {/* Input: reemail */}
                        <InputText
                            text="Confirmar nuevo correo"
                            type="text"
                            placeholder={Messages.placeholder.emailExample}
                            {...reemailRegister}
                            isError={Boolean(errors.reemail)}
                            minWidth={260}
                        >
                            <FormErrorUser
                                sizeOffset={-15}
                                error={errors.reemail?.message ?? ''}
                            />
                        </InputText>

                        <button
                            type="submit"
                            disabled={disabled}
                            className="mt-4 mb-3 w-full"
                        >
                            <ProfileButtomForm
                                disabled={disabled}
                                lineLoading={lineLoading}
                                buttonLoading={loadBtnUpdateEmail}
                                icon={
                                    <RefreshCcw size={17} strokeWidth={1.5} />
                                }
                                shape="square"
                                nameButtom="Actualizar correo"
                            />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateEmailSection;
