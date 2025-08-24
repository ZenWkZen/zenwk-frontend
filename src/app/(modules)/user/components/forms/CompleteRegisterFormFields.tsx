import { Controller, UseFormReturn } from 'react-hook-form';
import { UserMessages } from '@user/constants/user-messages';
import { ageGenerator } from '@app/shared/utils/userUtils';

import InputText from '@user/ui/inputs/InputText';
import FormErrorUser from '@user/ui/forms/FormErrorUser';
import Subtitle from '@user/ui/user-feed/Subtitle';
import SelectGeneral, { Option } from '@user/ui/inputs/SelectGeneral';
import Button from '@app/app/(modules)/user/ui/buttons/Button';

type FormValues = {
    firstName: string;
    middleName: string;
    lastName: string;
    middleLastName: string;
    sex: Option;
    age: Option;
};

interface Props {
    form: UseFormReturn<FormValues>;
    optionsSex: Option[];
    onSubmit: () => void;
    errorBack: string;
    isBtnLoading: boolean;
    requiredFirstName: string;
    requiredLastName: string;
    requiredAge: string;
    requiredSex: string;
    minLengthName: { value: number; message: string };
    maxLengthName: { value: number; message: string };
    patternName: { value: RegExp; message: string };
    validateTrim: (value: string) => true | string;
}

const CompleteRegisterFormFields = ({
    form,
    optionsSex,
    onSubmit,
    errorBack,
    isBtnLoading,
    requiredFirstName,
    requiredLastName,
    requiredAge,
    requiredSex,
    minLengthName,
    maxLengthName,
    patternName,
    validateTrim,
}: Props) => {
    const {
        control,
        register,
        formState: { errors },
    } = form;

    return (
        <form onSubmit={onSubmit}>
            {/* Nombres */}
            <Subtitle
                isError={Boolean(errors.firstName)}
                text={UserMessages.formComplete.labelNames}
            />
            <div className="grid grid-cols-2 gap-5">
                <InputText
                    placeholder={
                        UserMessages.formComplete.placeholder.firstName
                    }
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
                    placeholder={
                        UserMessages.formComplete.placeholder.middleLastName
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

                <InputText
                    placeholder="Segundo apellido"
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

            <Button
                type="submit"
                loading={isBtnLoading}
                text={UserMessages.buttons.welcome.buttonSave}
            />
        </form>
    );
};

export default CompleteRegisterFormFields;
