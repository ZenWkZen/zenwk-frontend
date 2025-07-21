/**
 * @abstract Conctena path para la generación de un Token de autenticación a la URL public si existe una variable de entorno en caso contrario fija la que esta quemada.
 * @param path
 * @returns
 */
export const getTokenUrl = (path = "") => {
  return `${
    process.env.API_AUTH_TOKEN_DEV_PUBLIC_URL || "https://localhost:6601"
  }${path}`;
};

/**
 * @abstract Conctena path a la base URL public dels sistema, si existe una variable de entorno en caso contrario fija la que esta quemada.
 * @param path
 * @returns
 */
export const getBaseUrl = (path = "") => {
  return `${
    process.env.API_BASE_DEV_PUBLIC_URL || "http://localhost:6600"
  }${path}`;
};
