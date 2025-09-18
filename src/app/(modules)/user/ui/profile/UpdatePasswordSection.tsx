import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { formValidate } from '@app/shared/utils/formValidate';
import { Messages } from '@app/shared/constants/messages';
import { RefreshCcw } from 'lucide-react';

import ProfileItemHeader from '@user/components/profile/ProfileItemHeader';
import InputText from '@user/ui/inputs/InputText';
import FormErrorUser from '@user/ui/forms/FormErrorUser';
import ProfileButtomForm from '@app/app/(modules)/user/components/profile/ProfileButtomForm';
import Text from '@user/ui/user-feed/Text';

const UpdatePasswordSection = () => {
    const [disabled, setDisabled] = useState(true);
    const [passwordChangeSucceeded, setPasswordChangeSucceeded] =
        useState(false);
    const [lineLoading, setLineLoading] = useState(false);
    const [loadBtnUpdatePassword, setLoadBtnUpdatePassword] = useState(false);
    const { patternPassword, requiredPassword, validateEquals } =
        formValidate();

    const {
        getValues,
        setValue,
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors, isValid },
    } = useForm<{
        passwordCurrent: string;
        password: string;
        reepassword: string;
    }>({ mode: 'all' });

    const passwordValue = useWatch({ control, name: 'password' });
    const repasswordValue = useWatch({ control, name: 'reepassword' });

    /**
     * Habilitar boton actualizar cuando no hayan errores.
     */
    useEffect(() => {
        if (isValid && repasswordValue?.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [isValid, repasswordValue, getValues, passwordValue]);

    /**
     * Configuración de validación para el campo de contraseña.
     */
    const passwordRegister = register('password', {
        required: requiredPassword,
        pattern: patternPassword,
    });

    /**
     * Configuración de validación para el campo de contraseña.
     */
    const reepasswordRegister = register('reepassword', {
        required: requiredPassword,
        validate: validateEquals(
            getValues('password'),
            'Las contraseñas ingresadas no coinciden.'
        ),
    });

    /**
     * Envio de formulario, actualización de contraseña.
     */
    const onSubmit = handleSubmit(async (data) => {
        setLineLoading(true);
        setLoadBtnUpdatePassword(true);
        try {
            // Consumir api de creación de evento  y link
            console.log(data);
        } catch (error) {
            setError('root', { message: error as string });
        } finally {
            await new Promise((resolve) => setTimeout(resolve, 200));
            setPasswordChangeSucceeded(true);
            setLineLoading(false);
            setLoadBtnUpdatePassword(false);
            setValue('passwordCurrent', '');
            setValue('password', '');
            setValue('reepassword', '');
            // borrar simula la aprobación
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setPasswordChangeSucceeded(false);
        }
    });

    return (
        <div>
            {/** Encabezado de la sección */}
            <ProfileItemHeader lineLoading={lineLoading} />

            {/** Cuerpo de la sección */}
            <div className="grid items-center justify-items-center py-5">
                {/** Mensaje de éxito en la actualización de la contraseña */}
                {passwordChangeSucceeded && (
                    <div className="mx-auto mb-2 flex w-full max-w-[260px] flex-col items-center rounded-md bg-[#EBF9F0]">
                        <Text
                            text="¡Listo! Tu contraseña se ha actualizado correctamente "
                            className="mx-auto max-w-[260px] p-2 text-center text-emerald-700"
                            sizeOffset={-8}
                        />
                    </div>
                )}

                <form onSubmit={onSubmit}>
                    {/** Input: constraseña actual */}
                    <div className="flex-co mx-auto mb-3 flex w-full max-w-[260px]">
                        <InputText
                            variant="verified"
                            minWidth={260}
                            text="Contraseña actual"
                            type="password"
                            placeholder="Contraseña actual..."
                            {...register('passwordCurrent', {
                                required: requiredPassword,
                                pattern: patternPassword,
                            })}
                            isError={Boolean(errors.passwordCurrent)}
                        >
                            <FormErrorUser
                                sizeOffset={-15}
                                error={errors.passwordCurrent?.message ?? ''}
                            />
                        </InputText>
                    </div>

                    {/** Input: nueva constraseña */}
                    <div className="flex-co mx-auto flex w-full max-w-[260px]">
                        <InputText
                            minWidth={260}
                            text="Nueva contraseña"
                            type="password"
                            placeholder="Nueva contraseña..."
                            {...passwordRegister}
                            isError={Boolean(errors.password)}
                        >
                            <FormErrorUser
                                sizeOffset={-15}
                                error={errors.password?.message ?? ''}
                            />
                        </InputText>
                    </div>
                    {/** Input: confirmar constraseña */}
                    <div className="flex-co mx-auto flex w-full max-w-[260px]">
                        <InputText
                            minWidth={260}
                            text="Confirmar contraseña"
                            type="password"
                            placeholder="Confirmar contraseña..."
                            {...reepasswordRegister}
                            isError={Boolean(errors.reepassword)}
                        >
                            <FormErrorUser
                                sizeOffset={-15}
                                error={errors.reepassword?.message ?? ''}
                            />
                        </InputText>
                    </div>
                    <div className="flex-co mx-auto flex w-full max-w-[260px]">
                        <button
                            type="submit"
                            disabled={disabled}
                            className="mt-4 mb-3 w-full"
                        >
                            <ProfileButtomForm
                                disabled={disabled}
                                lineLoading={lineLoading}
                                buttonLoading={loadBtnUpdatePassword}
                                icon={
                                    <RefreshCcw size={17} strokeWidth={1.5} />
                                }
                                shape="square"
                                positionToltip="top"
                                nameButtom="Actualizar contraseña"
                            />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePasswordSection;
