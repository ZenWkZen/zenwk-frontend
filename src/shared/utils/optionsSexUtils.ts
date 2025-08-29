import { fetchJwtBaseApi } from "@app/helpers/fetch-api";
import { Option } from "@user/ui/inputs/SelectGeneral";

/**
 *  Valores por defecto con la lista de los sexos pamarametrizados.
 */
export interface dataPersonSex {
    id: number;
    code: string;
    description: string;
}

/**
 * Con base en el array sexos, se genera un nuevo array que contenga solo los label de cada sexo.
 * @returns
 */
export const loadSexLabels = async (): Promise<Option[]> => {
    const listPersonSex: dataPersonSex[] = await personSexOptionApi();
    return listPersonSex.map((item) => ({
        value: item.id.toString(),
        label: item.description,
    }));
};

/**
 * consumo del api lista de sexos de una persona. api/person-sex
 * @returns
 */
export const personSexOptionApi = async (): Promise<[dataPersonSex]> => {
    const path = "/person-sex";

    try {
        const res = await fetchJwtBaseApi(
            path,
            undefined,
            undefined,
            undefined,
            "GET"
        );
        // console.log("personSexOptionApi - response: ", res);
        return res;
    } catch (error) {
        throw error;
    }
};

/**
 * Retorna el label correspondiente a un id dado dentro de la lista de opciones.
 * @param options Lista de opciones (Option[])
 * @param id Identificador a buscar
 * @returns Label asociado al id o string vacío si no existe
 */
export const getLabelById = (
    options: Option[],
    id: number | string
): string => {
    const option = options.find((opt) => opt.value === id.toString());
    return option ? option.label : "";
};
