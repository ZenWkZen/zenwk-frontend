import React from 'react';
import InputText from '@user/ui/inputs/InputText';
import FormErrorUser from '@user/ui/forms/FormErrorUser';
import { UserMessages } from '@user/constants/user-messages';
import { formValidateUser } from '@user/utils/formValidateUser';
import { UseFormReturn } from 'react-hook-form';

type FormValues = {
    firstName: string;
    middleName: string;
    lastName: string;
    middleLastName: string;
    sex: any;
    age: any;
};

interface Props {
    form: UseFormReturn<FormValues>;
}

const FirstNameField = ({ form }: Props) => {
    const {
        requiredFirstName,
        minLengthName,
        maxLengthName,
        patternName,
        validateTrim,
    } = formValidateUser();

    const {
        control,
        register,
        formState: { errors },
    } = form;

    return (
        <InputText
            text="Primer nombre"
            placeholder={UserMessages.formComplete.placeholder.firstName}
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
    );
};

export default FirstNameField;
