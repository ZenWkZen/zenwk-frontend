import { getTokenUrl, getBaseUrl } from "./api-helper";
import { BackendErrorResponse } from "<app>/app/interfaces/auth";
import { error } from "console";
import qs from "qs";

/**
 * Genera el merged options del request.
 * @param methodHttp
 * @param tokenJwt
 * @param bodyJson
 * @returns
 */
export const getMergedOptions = (
    methodHttp: string,
    tokenJwt?: string,
    bodyJson?: object
) => {
    const headers: Record<string, string> = {};
    let isBody: boolean = false;

    if (tokenJwt) {
        headers["Authorization"] = `Bearer ${tokenJwt}`;
    }

    if (bodyJson && Object.keys.length > 0) {
        headers["content-type"] = "application/json";
        isBody = true;
    }

    const options: RequestInit & { next?: { revalidate: number } } = {
        next: { revalidate: 60 },
        method: methodHttp,
        headers,
    };

    if (isBody) {
        options.body = JSON.stringify(bodyJson);
    }

    return options;
};

/**
 * @abstract Obtiene la URL del API a consultar.
 * @param queryString
 * @param path
 * @returns
 */
export const getUrl = (queryString: string, path: string) => {
    return `/api${path}${queryString ? `?${queryString}` : ""}`;
};

/**
 * Genera un query string a partir de un objeto de parámetros.
 * @param queryParams
 * @returns
 */
export const getQueryString = (queryParams?: Record<string, string>) => {
    if (queryParams && Object.keys(queryParams).length == 0) {
        return qs.stringify(queryParams, { encodeValuesOnly: true });
    }

    return qs.stringify(undefined, { encodeValuesOnly: true });
};

/**
 * Realiza la peticion, valida errores funcionales y técnicos manejados en el backend.
 * @param requestUrl
 * @param mergedOptions
 * @returns
 */
export const getFetch = async (
    requestUrl: string,
    mergedOptions: RequestInit & { next?: { revalidate: number } }
) => {
    try {
        const res = await fetch(requestUrl, mergedOptions);

        if (res.status === 404 || res.status === 500) {
            const errorBackend = await res.json();
            throw {
                code: errorBackend.code,
                message: errorBackend.error,
            };
        }

        if (res.status === 204 || res.status === 201) {
            return true;
        }

        return await res.json();
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Genera un token asociado al email del usuario.
 * @returns
 */
export const fetchTokenApi = async (correo: string) => {
    const path = "/verification/token/send";
    try {
        const queryString = getQueryString(undefined);
        const mergedOptions = getMergedOptions("POST", undefined, {
            email: correo,
        });

        const requestUrl = `${getTokenUrl(getUrl(queryString, path))}`;

        return await getFetch(requestUrl, mergedOptions);
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};

/**
 * Valida un token del usuario
 * @param tokenCode
 */
export const fetchValidateTokenApi = async (
    tokenCode: string,
    email: string
) => {
    try {
        const path = "/verification/token/validate/" + tokenCode;
        const mergedOptions = getMergedOptions("POST", undefined, {
            email: email,
        });
        const queryString = getQueryString(undefined);
        const requestUrl = `${getTokenUrl(getUrl(queryString, path))}`;
        const data = await getFetch(requestUrl, mergedOptions);
        return data;
    } catch (error: unknown) {
        throw error as BackendErrorResponse;
    }
};

/**
 * Utilidad para realizar el consumo de API´s expuestas remotamente.
 * @param path recurso rest expuesto.
 * @param urlParamObjects parámetros (query´s filter) en la url (endpoint) para el recurso rest expuesto.
 * @param tokenJwt token jwt
 * @param bodyJson  body json de la solicitud
 * @param methodHttp  metodo HTTP
 * @returns
 */
export const fetchJwtBaseApi = async (
    path: string,
    urlParamObjects?: Record<string, string>,
    tokenJwt = "",
    bodyJson?: {},
    methodHttp = ""
) => {
    console.log();

    try {
        const mergedOptions = getMergedOptions(methodHttp, tokenJwt, bodyJson);
        const queryString = getQueryString(urlParamObjects);
        const requestUrl = `${getBaseUrl(getUrl(queryString, path))}`;

        const data = await getFetch(requestUrl, mergedOptions);
        return data;
    } catch (error: unknown) {
        throw error as BackendErrorResponse;
    }
};
