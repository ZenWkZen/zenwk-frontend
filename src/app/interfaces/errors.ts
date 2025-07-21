import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

/**
 * Interface  que representa el error generado desde el backend
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
