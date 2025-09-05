import { Controller, UseFormReturn } from 'react-hook-form';
import { UserMessages } from '@user/constants/user-messages';
import { ageGenerator } from '@app/shared/utils/userUtils';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Save, Ban } from 'lucide-react';
import SelectGeneral, { Option } from '@user/ui/inputs/SelectGeneral';

import InputText from '@user/ui/inputs/InputText';
import FormErrorUser from '@user/ui/forms/FormErrorUser';
import Subtitle from '@user/ui/user-feed/Subtitle';
import Button from '@user/ui/buttons/Button';
import FirstNameField from '@user/components/forms/iputs/FirstNameField';
import Tooltip from '@app/shared/ui/Tooltip';

/**
 * Interrace que representa los valores del formulario.
 */
export interface FormValues {
    firstName: string;
    middleName: string;
    lastName: string;
    middleLastName: string;
    sex: Option;
    age: Option;
}

interface Props {
    form: UseFormReturn<FormValues>;
    optionsSex: Option[];
    onSubmit: () => void;
    errorBack: string;
    isBtnLoading: boolean;
    requiredLastName: string;
    requiredAge: string;
    requiredSex: string;
    minLengthName: { value: number; message: string };
    maxLengthName: { value: number; message: string };
    patternName: { value: RegExp; message: string };
    validateTrim?: (value: string) => true | string;
    editDataBasic?: boolean;
    setEditDataBasic?: Dispatch<SetStateAction<boolean>>;
    loadingLineClick?: () => Promise<void>;
}

/**
 * Componente que representa el formulario de persona.
 * @param param0
 * @returns
 */
const CompleteRegisterFormFields = ({
    form,
    optionsSex,
    onSubmit,
    errorBack,
    isBtnLoading,
    requiredLastName,
    requiredAge,
    requiredSex,
    minLengthName,
    maxLengthName,
    patternName,
    validateTrim,
    editDataBasic,
    setEditDataBasic,
    loadingLineClick,
}: Props) => {
    const {
        watch,
        control,
        register,
        formState: { errors },
    } = form;
    const [btnDisabled, setBtnDisabled] = useState(true);
    const defaultValues = form.control._defaultValues; // Valores por defecto del form

    /**
     * Detecta si algún campo del formulario se edito y
     * habilita el botón guardar (solo en modo edición)
     */
    useEffect(() => {
        const subscription = watch((values) => {
            const hasChanges = Object.keys(defaultValues).some(
                (key) =>
                    values[key as keyof typeof values] !==
                    defaultValues[key as keyof typeof defaultValues]
            );
            setBtnDisabled(!hasChanges);
        });
        // watch simula la implementación del patrón observable.
        return () => subscription.unsubscribe();
    }, [watch, defaultValues]);

    return (
        <form onSubmit={onSubmit}>
            {/* Nombres */}
            <Subtitle
                isError={Boolean(errors.firstName)}
                text={UserMessages.formComplete.labelNames}
            />
            <div className="grid grid-cols-2 gap-5">
                <FirstNameField form={form} />

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

            {/* Apellidos */}
            <Subtitle
                text={UserMessages.formComplete.labelLastNames}
                isError={Boolean(errors.lastName)}
            />
            <div className="grid grid-cols-2 gap-5">
                <InputText
                    placeholder={UserMessages.formComplete.placeholder.lastName}
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

                <InputText
                    placeholder={
                        UserMessages.formComplete.placeholder.middleLastName
                    }
                    {...register('middleLastName', {
                        minLength: minLengthName,
                        maxLength: maxLengthName,
                        pattern: patternName,
                    })}
                    isError={Boolean(errors.middleLastName || errors.root)}
                >
                    <FormErrorUser
                        sizeOffset={-15}
                        error={errors.middleLastName?.message ?? ''}
                    />
                </InputText>
            </div>

            {/* Sexo y edad */}
            <Subtitle
                text={UserMessages.formComplete.labelSexAndAge}
                isError={Boolean(errors.sex || errors.age)}
            />
            <div className="mb-6 grid grid-cols-2 gap-5">
                <Controller
                    control={control}
                    name="sex"
                    rules={{ required: requiredSex }}
                    render={({ field }) => (
                        <SelectGeneral
                            data={optionsSex}
                            placeholder={
                                UserMessages.formComplete.sex.placeholder
                            }
                            optionsLabel={
                                UserMessages.formComplete.sex.labelOption
                            }
                            isError={Boolean(errors.sex || errors.root)}
                            {...field}
                        >
                            <FormErrorUser
                                sizeOffset={-15}
                                error={errors.sex?.message ?? ''}
                            />
                        </SelectGeneral>
                    )}
                />

                <Controller
                    control={control}
                    name="age"
                    rules={{ required: requiredAge }}
                    render={({ field }) => (
                        <SelectGeneral
                            data={ageGenerator}
                            placeholder={
                                UserMessages.formComplete.age.placeholder
                            }
                            optionsLabel={
                                UserMessages.formComplete.age.labelOption
                            }
                            isError={Boolean(errors.age || errors.root)}
                            {...field}
                        >
                            <FormErrorUser
                                sizeOffset={-15}
                                error={errors.age?.message ?? ''}
                            />
                        </SelectGeneral>
                    )}
                />
            </div>

            {/* Error backend */}
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

            {/** Botón crear o editar*/}
            {editDataBasic ? (
                <div className="mb-17">
                    <div className="absolute flex gap-5">
                        <button
                            disabled={btnDisabled}
                            className={`group relative rounded-lg border p-[0.4rem] ${btnDisabled ? 'cursor-not-allowed border-gray-400 bg-gray-100 text-gray-400' : 'cursor-pointer border-cyan-800 bg-gray-100 text-cyan-800 hover:bg-gray-200'} `}
                            type="submit"
                        >
                            <Save size={18} strokeWidth={1.5} />
                            <Tooltip position="top">Guardar</Tooltip>
                        </button>
                        <button
                            type="button"
                            onClick={async () => {
                                if (setEditDataBasic) {
                                    await loadingLineClick?.();
                                    setEditDataBasic((prev) => !prev);
                                }
                            }}
                            className="group relative cursor-pointer rounded-lg border border-cyan-800 bg-gray-100 p-[0.4rem] text-cyan-800 hover:bg-gray-200"
                        >
                            <Ban size={18} strokeWidth={1.5} />
                            <Tooltip position="top">Cancelar</Tooltip>
                        </button>
                    </div>
                </div>
            ) : (
                <Button
                    type="submit"
                    loading={isBtnLoading}
                    text={UserMessages.buttons.welcome.buttonSave}
                />
            )}
        </form>
    );
};

export default CompleteRegisterFormFields;
