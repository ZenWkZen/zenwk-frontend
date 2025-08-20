/**
 * Valida que un string no seal null. si es nulo returna un string vacio.
 * @param value
 * @returns
 */
export const safeValue = (value?: string) => {
    if (
        value === null ||
        value === undefined ||
        value === "" ||
        (typeof value === "string" && value.trim().toLowerCase() === "null")
    ) {
        return "";
    }
    return value;
};
