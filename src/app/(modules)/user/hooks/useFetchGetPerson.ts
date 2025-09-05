import { useEffect, useState } from "react";
import { getPerson } from "@user/utils/personUtils";
import { PersonDTO } from "@user/types/person-dto";
import { usePersonContext } from "@app/app/(modules)/user/utils/usePersonContext";

/**
 *  Hook para la consulta del api GET /persons/{id}
 * @param idPerson
 * @param jwt
 * @returns
 */
export const useFetchGetPerson = (idPerson: number, jwt: string) => {
    const { person, setPerson } = usePersonContext();
    const [personDTO, setPersonDTO] = useState<PersonDTO>();

    useEffect(() => {
        if (person) {
            setPersonDTO(person);
            setPerson(person);
        } else if (idPerson && jwt) {
            const refreshPerson = async () => {
                const dto = await getPerson(idPerson, jwt);
                setPersonDTO(dto);
                setPerson(dto);
            };

            refreshPerson();
        }
    }, [idPerson, jwt, setPerson]);

    return { personDTO };
};
