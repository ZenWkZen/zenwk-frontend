import { fetchJwtBaseApi } from "@app/helpers/fetch-api";
import { PersonDTO } from "@user/interfaces/person-dto";
import { safeValue } from "@app/shared/utils/stringUtils";

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

/**
 * Crea o actualiza la persona.
 * @param jwt
 * @param personDTO
 */
export const updateOrCreatePerson = async (
    jwt: string,
    dataPerson: any | undefined,
    editDataBasic: boolean | undefined,
    idPerson?: number | undefined
) => {
    // console.log(dataPerson);
    const path = buildPersonPath(idPerson, editDataBasic);
    const personJson = buildPersonPayload(
        undefined,
        dataPerson,
        undefined,
        true
    );

    const res = await fetchJwtBaseApi(
        path,
        undefined,
        jwt,
        personJson,
        editDataBasic ? "PUT" : "POST"
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res;
};

/**
 * Inicialización de payload
 * @param data
 * @returns
 */
export const getPayload = (data: any) => {
    const payload: Record<string, string | number | boolean | undefined> = {
        firstName: data.firstName,
        lastName: data.lastName,
    };

    if (
        data &&
        typeof data.age === "number" &&
        typeof data.idSex === "number"
    ) {
        payload.age = data.age;
        payload.idSex = data.idSex;
    } else {
        payload.age = Number(data.age.value);
        payload.idSex = Number(data.sex.value);
    }

    if (safeValue(data.middleName)) {
        payload.middleName = data.middleName;
    }
    if (safeValue(data.middleLastName)) {
        payload.middleLastName = data.middleLastName;
    }
    // sconsole.log(payload);
    return payload;
};

/**
 * Construye el payload JSON de Person a partir del formulario y el DTO.
 */
export const buildPersonPayload = (
    data: any,
    personDTO: any,
    user: any,
    editDataBasic: boolean | undefined
): Record<string, string | number | boolean | undefined> => {
    const payload = getPayload(data || personDTO);

    payload.profilePicture = personDTO?.profilePicture;

    if (!editDataBasic) {
        payload.idUser = user.userId;
    }

    return payload;
};

/**
 * Construye el path dependiendo si es creación o edición.
 */
export const buildPersonPath = (
    idPerson: number | undefined,
    editDataBasic: boolean | undefined
): string => {
    return editDataBasic && idPerson ? `/persons/${idPerson}` : "/persons";
};
