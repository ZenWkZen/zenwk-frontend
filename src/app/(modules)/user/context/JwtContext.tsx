"use client";

import {
    createContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
} from "react";

/**
 * Interface que determina los datos del usuario autenticado
 */
export interface User {
    jwt: string;
    userId: number;
}

/**
 * Interface que representa los datos del contexto
 */
interface JwtContextType {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

// Registro del contexto
export const JwtContext = createContext<JwtContextType | undefined>(undefined);

/**
 *  Crea el contexto para la sesión del usuario.
 * @param children
 * @returns
 */
const JwtContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({ jwt: "", userId: 0 });

    return (
        <JwtContext.Provider value={{ user, setUser }}>
            {children}
        </JwtContext.Provider>
    );
};

export default JwtContextProvider;
