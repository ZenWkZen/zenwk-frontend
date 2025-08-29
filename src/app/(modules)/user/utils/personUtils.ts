import { fetchJwtBaseApi } from "@app/helpers/fetch-api";
import { PersonDTO } from "@user/interfaces/person-dto";

/**
 * Consulta los datos de una persona a partri de su id.
 * @param idPerson
 * @param jwt
 */
export const getPerson = async (
    idPerson: number,
    jwt: string
): Promise<PersonDTO> => {
    try {
        const path = "/persons/" + idPerson;
        const res = await fetchJwtBaseApi(
            path,
            undefined,
            jwt,
            undefined,
            "GET"
        );
        return res;
    } catch (error) {
        throw error;
    }
};
