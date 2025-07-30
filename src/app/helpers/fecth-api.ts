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

        if (res.status === 400) {
            throw "400 (Bad request)";
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
 * @param code
 * @param email
 * @param uuid
 */
export const fetchValidateTokenApi = async (
    code: string,
    email: string,
    uuid: string
) => {
    try {
        const path = "/verification/token/validate";
        const mergedOptions = getMergedOptions("POST", undefined, {
            code,
            email,
            uuid,
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
 * Utilidad para realizar el consumo de API´s expuestas en el stack security-zenwk.
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
/**
  * Utilidad para realizar el consumo de API´s expuestas en el stack verification-zenwk.

 * @param path 
 * @param urlParamObjects 
 * @param bodyJson 
 * @param methodHttp 
 * @returns 
 */
export const fethStackVerifcation = async (
    path: string,
    urlParamObjects?: Record<string, string>,
    bodyJson?: {},
    methodHttp = ""
) => {
    try {
        const mergedOptions = getMergedOptions(methodHttp, undefined, bodyJson);
        const queryString = getQueryString(urlParamObjects);
        const requestUrl = `${getTokenUrl(getUrl(queryString, path))}`;

        const data = await getFetch(requestUrl, mergedOptions);
        return data;
    } catch (error: unknown) {
        throw error as BackendErrorResponse;
    }
};

/**
 * Consume el api que valida si un email ya se encuentra registrado.
 * @param email
 * @returns
 */
export const fecthValidateRegisterEmail = async (email: string) => {
    try {
        const path = "/users/email/" + email;
        // si el usuario no esta registrado retorna false por defecto
        return await fetchJwtBaseApi(
            path,
            undefined,
            undefined,
            undefined,
            "GET"
        );
    } catch (error: unknown) {
        if (isBackendErrorResponse(error)) {
            // Si se genera un error es por que el usuario ya esta registrado.
            return true;
        }
        console.log("Error no registrado por el backend: ", error);
    }
};

/**
 * Valida que el error tengo el formato de los errores reportados por el backend.
 * @param error
 * @returns
 */
function isBackendErrorResponse(error: unknown): error is BackendErrorResponse {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        "message" in error
    );
}

/**
 * Obtiene la URL base del sitio, adaptándose automáticamente
 * al entorno (cliente o servidor).
 *
 * - En el cliente: usa `window.location`.
 * - En el servidor: usa la variable de entorno `NEXT_PUBLIC_BASE_URL`.
 *
 * @returns {string} La URL base, incluyendo protocolo y host (ej. https://zenwk.com).
 */
export const getUrlServer = (): string => {
    // Si estamos en el navegador
    if (typeof window !== "undefined") {
        return `${window.location.protocol}//${window.location.host}`;
    }

    // Si estamos en el servidor (ej. SSR o API)
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};
