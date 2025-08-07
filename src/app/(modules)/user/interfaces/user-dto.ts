/**
 * Representa los datos personales básicos asociados a un usuario.
 */
export interface Person {
    id: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    middleLastName?: string;
    dateOfBirth?: string; // ISO format (from LocalDateTime)
    address?: string;
    creationDate?: string;
    modificationDate?: string;
    userCreation?: string;
    userModification?: string;
}

/**
 * Enum que define los posibles estados de un usuario dentro del sistema.
 */
export enum UserStateEnum {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED",
    INCOMPLETE_PERFIL = "INCOMPLETE_PERFIL",
}

/**
 * Define la estructura del objeto de transferencia de datos (DTO) para un usuario del sistema.
 */
export interface UserDTO {
    id: number;
    idPerson?: number;
    username: string;
    password?: string;
    email: string;
    state?: UserStateEnum;
    person?: Person;
}
