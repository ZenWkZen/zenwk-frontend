import { useForm } from 'react-hook-form';
import { useState, Dispatch, SetStateAction } from 'react';
import { User } from '@user/context/JwtContext';
import { formValidateUser } from '@user/utils/formValidateUser';
import { PersonDTO } from '@user/interfaces/person-dto';
import { getLabelById } from '@app/shared/utils/optionsSexUtils';
import { getPerson } from '@user/utils/personUtils';

import { safeValue } from '@app/shared/utils/stringUtils';
import { useSexOptionsContext } from '@user/utils/useSexOptionsContext';
import {
    fetchJwtBaseApi,
    isApiFieldErrorArray,
    isClientErrorMessage,
} from '@app/helpers/fetch-api';

import CompleteRegisterFormFields from '@user/components/forms/CompleteRegisterFormFields';

type FormValues = {
    firstName: string;
    middleName: string;
    lastName: string;
    middleLastName: string;
    sex: any;
    age: any;
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
    setPersonDTO,
    setLineLoading,
    loadingLineClick,
}: {
    setIsCreatePerson?: Dispatch<SetStateAction<boolean>>;
    user: User;
    editDataBasic?: boolean;
    setEditDataBasic?: Dispatch<SetStateAction<boolean>>;
    personDTO?: PersonDTO;
    setPersonDTO?: Dispatch<SetStateAction<PersonDTO | undefined>>;
    setLineLoading?: Dispatch<SetStateAction<boolean>>;
    loadingLineClick?: () => Promise<void>;
}) => {
    const { optionsSex } = useSexOptionsContext();
    const [errorBack, setErrorBack] = useState('');
    const [isBtnLoading, setBtnLoading] = useState(false);

    /**
     * Formulario principal
     */
    const form = useForm<FormValues>({
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
        console.log(data);
        setBtnLoading(true);
        setLineLoading && setLineLoading(true);

        try {
            const path = editDataBasic
                ? '/persons/' + personDTO?.id
                : '/persons';
            const personJson: Record<string, string | number> = {
                firstName: data.firstName,
                lastName: data.lastName,
                age: Number(data.age.value),
                idSex: Number(data.sex.value),
            };
            // El userId solo requerido en la creación.
            if (!editDataBasic) {
                personJson.idUser = user.userId;
            }
            // Segundo nombre. Si es diferente de nulo.
            if (safeValue(data.middleName)) {
                personJson.middleName = data.middleName;
            }
            // Segundo apellido. Si es diferente de nulo.
            if (safeValue(data.middleLastName)) {
                personJson.middleLastName = data.middleLastName;
            }

            // console.log('CompleteRegisterForm - personJson: ', personJson);

            if (user) {
                const res = await fetchJwtBaseApi(
                    path,
                    undefined,
                    user.jwt,
                    personJson,
                    editDataBasic ? 'PUT' : 'POST'
                );
                await new Promise((resolve) => setTimeout(resolve, 1000));
                if (res) {
                    if (editDataBasic && personDTO) {
                        const data = await getPerson(personDTO.id, user.jwt);
                        if (data && setPersonDTO && setEditDataBasic) {
                            setPersonDTO(data);
                            setEditDataBasic(false);
                        }
                    }

                    // Se renueva el jwt. Retorna: ({token, userId})
                    //  Guardar nuevo jwt en localstorage
                    // Actualizar {setUser} jwtContest()

                    // Estado 201
                    setIsCreatePerson && setIsCreatePerson(true);
                }
                // console.log('CompleteRegisterForm - res: ', res);
            }
        } catch (error) {
            //console.log('CompleteRegisterForm - error: ', error);

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
            setLineLoading && setLineLoading(false);
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
