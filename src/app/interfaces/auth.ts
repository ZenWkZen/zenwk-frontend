import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

/**
 * Interface que representa los campos usados para la pagina set-password.
 */
export interface SetPassword {
    password: string;
    repassword: string;
}

/**
 * Interface que representa los campos usados para el login.
 */
export interface LoginForm {
    email: string;
    password: string;
}

/**
 * Interface  que representa el error generado desde el backend.
 */
export interface BackendErrorResponse {
    code: string;
    error: string;
    timestamp: Timestamp;
}

/**
 *  Interface que representa una versión del error del backend compatible con el frontend.
 */
export interface ClientErrorMessage {
    code: string;
    message: string;
}
