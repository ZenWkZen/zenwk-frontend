import { useForm } from 'react-hook-form';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { User } from '@user/context/JwtContext';
import { formValidateUser } from '@user/utils/formValidateUser';
import { PersonDTO } from '@app/app/(modules)/user/types/person-dto';
import { getLabelById } from '@app/shared/utils/optionsSexUtils';
import { getPerson, updateOrCreatePerson } from '@user/utils/personUtils';
import { safeValue } from '@app/shared/utils/stringUtils';
import { useSexOptionsContext } from '@user/utils/useSexOptionsContext';
import { handleApiErrors } from '@app/shared/utils/formValidate';
import { usePersonContext } from '@app/app/(modules)/user/utils/usePersonContext';

import CompleteRegisterFormFields from '@user/components/forms/CompleteRegisterFormFields';

type FormValues = {
    firstName: string;
    middleName: string;
    lastName: string;
    middleLastName: string;
    sex: any;
    age: any;
    profilePicture?: string | boolean | undefined;
};

/**
 *  Componente que gestiona la creación o modificación de la entidad persona.
 * @param param0
 * @returns
 */
const CompleteRegisterForm = ({
    setIsCreatePerson,
    user,
    editDataBasic,
    setEditDataBasic,
    personDTO,
    setLineLoading,
    setBtnUpdate,
    loadingLineClick,
}: {
    setIsCreatePerson?: Dispatch<SetStateAction<boolean>>;
    user: User;
    editDataBasic?: boolean;
    setEditDataBasic?: Dispatch<SetStateAction<boolean>>;
    personDTO?: PersonDTO;
    setLineLoading?: Dispatch<SetStateAction<boolean>>;
    setBtnUpdate?: Dispatch<SetStateAction<boolean>>;
    loadingLineClick?: () => Promise<void>;
}) => {
    const { optionsSex } = useSexOptionsContext();
    const [errorBack, setErrorBack] = useState('');
    const [isBtnLoading, setBtnLoading] = useState(false);
    const { setPerson } = usePersonContext();

    /**
     * Formulario principal
     */
    const form = useForm<FormValues>({
        // Se inicializan valores por defecto
        defaultValues: {
            firstName: personDTO && personDTO.firstName,
            middleName: personDTO && personDTO.middleName,
            lastName: personDTO && personDTO.lastName,
            middleLastName: personDTO && personDTO.middleLastName,
            sex: personDTO && {
                label: getLabelById(optionsSex, personDTO.idSex),
                value: personDTO.idSex,
            },
            age: personDTO && {
                label: personDTO.age,
                value: personDTO.age,
            },
            profilePicture: personDTO?.profilePicture,
        },
    });
    const {
        requiredLastName,
        requiredAge,
        requiredSex,
        minLengthName,
        maxLengthName,
        patternName,
        validateTrim,
    } = formValidateUser();

    /**
     * manejador envio de formulario.
     * Si el creación o actualización es éxitosa se debe garantizar la consulta GET api/person/{idPerson}
     * sin un nuevo inicio de sesión, se debe obtener un nuevo jwt y actualizar a nivel
     * de toca la aplicación.
     */
    const onSubmit = form.handleSubmit(async (data) => {
        setBtnLoading(true);
        setLineLoading?.(true);
        setBtnUpdate?.(true);

        try {
            if (user) {
                const res = await updateOrCreatePerson(
                    user.jwt,
                    data,
                    editDataBasic,
                    personDTO?.id
                );

                if (res) {
                    if (editDataBasic && personDTO) {
                        const freshData = await getPerson(
                            personDTO.id,
                            user.jwt
                        );

                        if (freshData && setEditDataBasic) {
                            setPerson(freshData);
                            setEditDataBasic(false);
                        }
                    }
                    setIsCreatePerson?.(true);
                }
            }
        } catch (error) {
            handleApiErrors(error, setErrorBack, safeValue);
        } finally {
            setBtnLoading(false);
            setLineLoading?.(false);
            setBtnUpdate?.(false);
        }
    });

    return (
        <CompleteRegisterFormFields
            form={form}
            optionsSex={optionsSex}
            onSubmit={onSubmit}
            errorBack={errorBack}
            isBtnLoading={isBtnLoading}
            requiredLastName={requiredLastName}
            requiredAge={requiredAge}
            requiredSex={requiredSex}
            minLengthName={minLengthName}
            maxLengthName={maxLengthName}
            patternName={patternName}
            validateTrim={validateTrim}
            editDataBasic={editDataBasic}
            setEditDataBasic={setEditDataBasic}
            loadingLineClick={loadingLineClick}
        />
    );
};

export default CompleteRegisterForm;
