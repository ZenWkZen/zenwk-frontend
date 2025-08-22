import { ageGenerator } from '@app/shared/utils/userUtils';
import { loadSexLabels } from '@app/shared/utils/optionsSexUtils';
import { UserMessages } from '@user/constants/user-messages';
import { TEXT_CYAN_COLOR } from '@app/styles/constans-color';
import { Controller, useForm } from 'react-hook-form';
import { formValidateUser } from '@user/utils/formValidateUser';
import { User } from '@user/context/JwtContext';
import {
    fetchJwtBaseApi,
    isApiFieldErrorArray,
    isClientErrorMessage,
} from '@app/helpers/fetch-api';
import { safeValue } from '@app/shared/utils/stringUtils';
import SelectGeneral, { Option } from '@user/ui/inputs/SelectGeneral';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';

import Subtitle from '@user/ui/user-feed/Subtitle';
import InputText from '@user/ui/inputs/InputText';
import Button from '@app/app/(modules)/user/ui/buttons/Button';

import Text from '@user/ui/user-feed/Text';
import FormErrorUser from '@user/ui/forms/FormErrorUser';
import Spinner from '@app/shared/ui/Spinner';

/**
 * Componente con el formulario de registro de la persona por primera vez. Se despliega en el primera autentiación.
 * @param param0
 * @returns
 */
const CompleteRegisterForm = ({
    setIsCreatePerson,
    user,
}: {
    setIsCreatePerson: Dispatch<SetStateAction<boolean>>;
    user: User;
}) => {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<{
        firstName: string;
        middleName: string;
        lastName: string;
        middleLastName: string;
        sex: Option;
        age: Option;
    }>();

    const {
        requiredFirstName,
        requiredLastName,
        requiredAge,
        requiredSex,
        maxLengthName,
        minLengthName,
        patternName,
        validateTrim,
    } = formValidateUser();

    const [errorBack, setErrorBack] = useState('');
    const [isBtnLoading, setBtnLoading] = useState(false);
    const [optionsSex, setOptionsSex] = useState<Option[]>([]);

    //  console.log('CompleteRegisterForm - userDTO: ', user);
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const options: Option[] = await loadSexLabels(); // trae los objetos completos
                setOptionsSex(options);
            } catch (error) {}
        };

        fetchOptions();
    }, []);

    // Cargador
    if (optionsSex.length === 0) {
        return <Spinner />;
    }

    /**
     * manejador envio de formulario.
     * Si el creación es éxitosa se debe garantizar la consulta GET api/person/{idPereson}
     * sin un nuevo inicio de sesión, se debe obtener un nuevo jwt y actualizar a nivel
     * de toca la aplicación.
     */
    const onSubmit = handleSubmit(async (data) => {
        // console.log(data);
        setBtnLoading(true);

        try {
            const path = '/persons';
            const personJson: Record<string, string | number> = {
                idUser: user.userId,
                firstName: data.firstName,
                lastName: data.lastName,
                age: Number(data.age.value),
                idSex: Number(data.sex.value),
            };
            // Segundo nombre. Si es diferente de nulo.
            if (safeValue(data.middleName)) {
                personJson.middleName = data.middleName;
            }
            // Segundo apellido. Si es diferente de nulo.
            if (safeValue(data.middleLastName)) {
                personJson.middleLastName = data.middleLastName;
            }

            console.log('CompleteRegisterForm - personJson: ', personJson);

            if (user) {
                const res = await fetchJwtBaseApi(
                    path,
                    undefined,
                    user.jwt,
                    personJson,
                    'POST'
                );
                await new Promise((resolve) => setTimeout(resolve, 1000));

                if (res) {
                    // Se renueva el jwt. Retorna: ({token, userId})
                    //  Guardar nuevo jwt en localstorage
                    // Actualizar {setUser} jwtContest()

                    // Estado 201
                    setIsCreatePerson(true);
                }
            }
        } catch (error) {
            if (isApiFieldErrorArray(error)) {
                // Se indican los campo del back solo si un error 401.
                const errors = error
                    .map((err) => {
                        const message =
                            'Campo: ' +
                            safeValue(err.field) +
                            '.  ' +
                            safeValue(err.code) +
                            ' ' +
                            safeValue(err.error);
                        return message;
                    })
                    .join('\n');
                setErrorBack(errors);
            } else if (isClientErrorMessage(error)) {
                /** Este error no se muestra, expone información sensible. habilitar a nivel de desarrollo. */
                setErrorBack(error.message);
            } else {
                setErrorBack(String(error));
            }
        } finally {
            setBtnLoading(false);
        }
    });

    {
        /** Componenete JSX con el formulario de creación de persona. */
    }
    return (
        <div className="rounded-xl bg-white shadow-xl shadow-gray-300">
            {/** Componetizar potencial "CARD" posible uso en el feed */}
            <article className="px-12">
                {/* Se deshabilita: cerrar ventana: UserMessages.messageToolTip.closeWindow*/}
                {/** Titulo ventana */}
                <div className="mt-4">
                    <Text
                        sizeOffset={4}
                        text={UserMessages.welcome.completeRegister}
                        className={`font-[450] ${TEXT_CYAN_COLOR}`}
                    />
                </div>
                {/** Formulario */}
                <form className="mx-auto max-w-md" onSubmit={onSubmit}>
                    {/** Nombres:  */}
                    <Subtitle
                        isError={Boolean(errors.firstName)}
                        text={UserMessages.formComplete.labelNames}
                    />
                    <div className="grid grid-cols-2 gap-5">
                        {/** Primer nombre */}
                        <InputText
                            placeholder={
                                UserMessages.formComplete.placeholder.firstName
                            }
                            //isError={true}
                            {...register('firstName', {
                                required: requiredFirstName,
                                pattern: patternName,
                                minLength: minLengthName,
                                maxLength: maxLengthName,
                                validate: validateTrim,
                            })}
                            isError={Boolean(errors.firstName || errors.root)}
                        >
                            <FormErrorUser
                                sizeOffset={-15}
                                error={errors.firstName?.message ?? ''}
                            />
                        </InputText>

                        {/** Segundo nombre */}
                        <InputText
                            placeholder={
                                UserMessages.formComplete.placeholder.middleName
                            }
                            {...register('middleName', {
                                pattern: patternName,
                                minLength: minLengthName,
                                maxLength: maxLengthName,
                            })}
                            isError={Boolean(errors.middleName || errors.root)}
                        >
                            <FormErrorUser
                                sizeOffset={-15}
                                error={errors.middleName?.message ?? ''}
                            />
                        </InputText>
                    </div>
                    <Subtitle
                        text={UserMessages.formComplete.labelLastNames}
                        isError={Boolean(errors.lastName)}
                    />
                    <div className="grid grid-cols-2 gap-5">
                        {/** Primer apellido */}
                        <InputText
                            placeholder={
                                UserMessages.formComplete.placeholder
                                    .middleLastName
                            }
                            {...register('lastName', {
                                required: requiredLastName,
                                pattern: patternName,
                                minLength: minLengthName,
                                maxLength: maxLengthName,
                                validate: validateTrim,
                            })}
                            isError={Boolean(errors.lastName || errors.root)}
                        >
                            <FormErrorUser
                                sizeOffset={-15}
                                error={errors.lastName?.message ?? ''}
                            />
                        </InputText>
                        {/** Segundo apellido */}
                        <InputText
                            placeholder="Segundo apellido"
                            {...register('middleLastName', {
                                minLength: minLengthName,
                                maxLength: maxLengthName,
                                pattern: patternName,
                            })}
                            isError={Boolean(
                                errors.middleLastName || errors.root
                            )}
                        >
                            <FormErrorUser
                                sizeOffset={-15}
                                error={errors.middleLastName?.message ?? ''}
                            />
                        </InputText>
                    </div>
                    <Subtitle
                        text={UserMessages.formComplete.labelSexAndAge}
                        isError={Boolean(errors.sex || errors.age)}
                    />
                    <div className="mb-6 grid grid-cols-2 gap-5">
                        <div>
                            {/**< Select sexo /> */}
                            <Controller
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <SelectGeneral
                                            data={optionsSex ?? []}
                                            placeholder={
                                                UserMessages.formComplete.sex
                                                    .placeholder
                                            }
                                            optionsLabel={
                                                UserMessages.formComplete.sex
                                                    .labelOption
                                            }
                                            isError={Boolean(
                                                errors.sex || errors.root
                                            )}
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                        >
                                            <FormErrorUser
                                                sizeOffset={-15}
                                                error={
                                                    errors.sex?.message ?? ''
                                                }
                                            />
                                        </SelectGeneral>
                                    );
                                }}
                                {...register('sex', {
                                    required: requiredSex,
                                })}
                            />
                        </div>
                        <div>
                            {/** Select edad */}
                            <Controller
                                control={control}
                                render={({ field }) => (
                                    <SelectGeneral
                                        data={ageGenerator}
                                        placeholder={
                                            UserMessages.formComplete.age
                                                .placeholder
                                        }
                                        optionsLabel={
                                            UserMessages.formComplete.age
                                                .labelOption
                                        }
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                        isError={Boolean(
                                            errors.age || errors.root
                                        )}
                                    >
                                        <FormErrorUser
                                            sizeOffset={-15}
                                            error={errors.age?.message ?? ''}
                                        />
                                    </SelectGeneral>
                                )}
                                {...register('age', {
                                    required: requiredAge,
                                })}
                            />
                        </div>
                    </div>
                    {errorBack && (
                        <div className="mb-6">
                            <FormErrorUser
                                sizeOffset={-10}
                                error={
                                    <label className="text-center whitespace-pre-line">
                                        {errorBack}
                                    </label>
                                }
                            />
                        </div>
                    )}
                    <Button
                        type="submit"
                        loading={isBtnLoading}
                        text={UserMessages.buttons.welcome.buttonSave}
                    />
                </form>
            </article>
        </div>
    );
};

export default CompleteRegisterForm;
